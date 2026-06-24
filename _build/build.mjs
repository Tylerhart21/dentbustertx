import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';
import * as Babel from '@babel/standalone';

// Rebuild the deployable static site from the editable JSX in _build/src.
// The HTML shell, images, fonts, and React libs come from the standalone bundle;
// the app code comes from _build/src/* so it can be hand-edited.
const HERE = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(HERE, '..');
const STANDALONE = process.argv[2] || path.join(HERE, 'source-standalone.html');
const SRC_DIR = process.argv[3] || path.join(HERE, 'src');
const OUT_DIR = process.argv[4] || REPO;
const ASSET_DIR = path.join(OUT_DIR, 'assets');

const html = fs.readFileSync(STANDALONE, 'utf8');
function extract(type) {
  const tag = '<script type="' + type + '">';
  const start = html.indexOf(tag);
  const open = html.indexOf('>', start) + 1;
  const end = html.indexOf('</script>', open);
  return html.slice(open, end).trim();
}

const manifest = JSON.parse(extract('__bundler/manifest'));
const extResources = JSON.parse(extract('__bundler/ext_resources'));
let template = JSON.parse(extract('__bundler/template'));

const EXT = {
  'image/png': 'png', 'image/jpeg': 'jpg', 'image/webp': 'webp', 'image/svg+xml': 'svg',
  'image/gif': 'gif', 'font/woff2': 'woff2', 'font/woff': 'woff',
  'text/javascript': 'js', 'application/javascript': 'js', 'text/jsx': 'js', 'text/css': 'css',
};

const appUuids = [...template.matchAll(/<script[^>]*type="text\/(?:babel|jsx)"[^>]*src="([^"]+)"/gi)].map(m => m[1]);
const libUuids = new Set([...template.matchAll(/<script\s+src="([^"]+)"\s+integrity=/gi)].map(m => m[1]));

// Load editable app source, mapped by leading index to appUuids order.
const srcFiles = fs.readdirSync(SRC_DIR).filter(f => /^\d+__/.test(f)).sort();
const srcByIndex = {};
for (const f of srcFiles) srcByIndex[parseInt(f, 10)] = fs.readFileSync(path.join(SRC_DIR, f), 'utf8');
if (Object.keys(srcByIndex).length !== appUuids.length) {
  throw new Error(`src file count (${Object.keys(srcByIndex).length}) != app script count (${appUuids.length})`);
}
const uuidToIndex = {};
appUuids.forEach((u, i) => { uuidToIndex[u] = i; });

fs.rmSync(ASSET_DIR, { recursive: true, force: true });
fs.mkdirSync(ASSET_DIR, { recursive: true });
const bytesOf = e => { const b = Buffer.from(e.data, 'base64'); return e.compressed ? zlib.gunzipSync(b) : b; };

let babelUuid = null;
for (const [uuid, entry] of Object.entries(manifest)) {
  const ext = EXT[entry.mime] || 'bin';
  if (uuid in uuidToIndex) {
    const code = srcByIndex[uuidToIndex[uuid]];          // edited JSX
    const presets = [['react', { runtime: 'classic' }]];
    let out;
    try { out = Babel.transform(code, { presets, sourceType: 'script', filename: uuid + '.jsx' }).code; }
    catch { out = Babel.transform(code, { presets, sourceType: 'module', filename: uuid + '.jsx' }).code; }
    fs.writeFileSync(path.join(ASSET_DIR, uuid + '.js'), out);
    continue;
  }
  if (libUuids.has(uuid)) {
    const bytes = bytesOf(entry);
    if (/transformScriptTags|@babel\/standalone/.test(bytes.toString('utf8'))) { babelUuid = uuid; continue; }
    fs.writeFileSync(path.join(ASSET_DIR, uuid + '.js'), bytes);
    continue;
  }
  fs.writeFileSync(path.join(ASSET_DIR, uuid + '.' + ext), bytesOf(entry));
}

for (const [uuid, entry] of Object.entries(manifest)) {
  if (uuid === babelUuid) continue;
  const ext = EXT[entry.mime] || 'bin';
  const finalExt = (uuid in uuidToIndex || libUuids.has(uuid)) ? 'js' : ext;
  template = template.split(uuid).join('assets/' + uuid + '.' + finalExt);
}
if (babelUuid) template = template.replace(new RegExp('<script[^>]*' + babelUuid + '[^>]*>\\s*</script>', 'i'), '');

template = template
  .replace(/\s+integrity="[^"]*"/gi, '')
  .replace(/\s+crossorigin="[^"]*"/gi, '')
  .split('type="text/babel" ').join('')
  .split('type="text/jsx" ').join('')
  .replace(/<script\s+src="assets\//gi, '<script defer src="assets/');

const resourceMap = {};
for (const r of extResources) {
  const ext = EXT[manifest[r.uuid].mime] || 'bin';
  resourceMap[r.id] = 'assets/' + r.uuid + '.' + ext;
}
template = template.replace(/<head[^>]*>/i, m => m + '\n<script>window.__resources = ' + JSON.stringify(resourceMap) + ';</script>');

fs.writeFileSync(path.join(OUT_DIR, 'index.html'), template);
console.log('Built index.html (' + fs.statSync(path.join(OUT_DIR, 'index.html')).size + ' bytes) +',
  fs.readdirSync(ASSET_DIR).length, 'assets. Babel dropped:', babelUuid || '(none)');
