import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import * as Babel from '@babel/standalone';

const SRC = process.argv[2];           // standalone html
const OUT_DIR = process.argv[3];       // output project dir (repo root)
const ASSET_DIR = path.join(OUT_DIR, 'assets');

const html = fs.readFileSync(SRC, 'utf8');

function extract(type) {
  const tag = '<script type="' + type + '">';
  const start = html.indexOf(tag);
  if (start === -1) return null;
  const open = html.indexOf('>', start) + 1;
  const end = html.indexOf('</script>', open);
  return html.slice(open, end).trim();
}

const manifest = JSON.parse(extract('__bundler/manifest'));
const extResources = JSON.parse(extract('__bundler/ext_resources'));
let template = JSON.parse(extract('__bundler/template')); // JSON-encoded HTML string

const EXT = {
  'image/png': 'png', 'image/jpeg': 'jpg', 'image/webp': 'webp', 'image/svg+xml': 'svg',
  'image/gif': 'gif', 'font/woff2': 'woff2', 'font/woff': 'woff',
  'text/javascript': 'js', 'application/javascript': 'js', 'text/jsx': 'js',
  'text/css': 'css',
};

// Which uuids are app code (loaded as text/babel|jsx) — these get JSX-compiled.
const appUuids = new Set(
  [...template.matchAll(/<script[^>]*type="text\/(?:babel|jsx)"[^>]*src="([^"]+)"/gi)].map(m => m[1])
);
// Plain <script src> with integrity = React / ReactDOM / Babel-standalone.
const libUuids = new Set(
  [...template.matchAll(/<script\s+src="([^"]+)"\s+integrity=/gi)].map(m => m[1])
);

fs.rmSync(ASSET_DIR, { recursive: true, force: true });
fs.mkdirSync(ASSET_DIR, { recursive: true });

function bytesOf(entry) {
  const buf = Buffer.from(entry.data, 'base64');
  return entry.compressed ? zlib.gunzipSync(buf) : buf;
}

let babelUuid = null;
const written = [];

for (const [uuid, entry] of Object.entries(manifest)) {
  const ext = EXT[entry.mime] || 'bin';
  const bytes = bytesOf(entry);

  if (appUuids.has(uuid)) {
    // App JSX -> plain JS (classic React runtime, so it uses the global React).
    let code = bytes.toString('utf8');
    const presets = [['react', { runtime: 'classic' }]]; // classic -> global React.createElement, no require()
    let out;
    try {
      out = Babel.transform(code, { presets, sourceType: 'script', filename: uuid + '.jsx' }).code;
    } catch {
      out = Babel.transform(code, { presets, sourceType: 'module', filename: uuid + '.jsx' }).code;
    }
    fs.writeFileSync(path.join(ASSET_DIR, uuid + '.js'), out);
    written.push(uuid + '.js (app, compiled)');
    continue;
  }

  if (libUuids.has(uuid)) {
    const text = bytes.toString('utf8');
    if (/transformScriptTags|@babel\/standalone/.test(text)) {
      babelUuid = uuid;                 // Drop Babel — not needed after precompile.
      written.push(uuid + ' (Babel — DROPPED)');
      continue;
    }
    fs.writeFileSync(path.join(ASSET_DIR, uuid + '.js'), bytes); // React / ReactDOM
    written.push(uuid + '.js (lib)');
    continue;
  }

  // images, fonts, css, other
  fs.writeFileSync(path.join(ASSET_DIR, uuid + '.' + ext), bytes);
}

// Point every uuid reference in the template at its real /assets file.
for (const [uuid, entry] of Object.entries(manifest)) {
  if (uuid === babelUuid) continue;
  const ext = EXT[entry.mime] || 'bin';
  const finalExt = (appUuids.has(uuid) || libUuids.has(uuid)) ? 'js' : ext;
  template = template.split(uuid).join('assets/' + uuid + '.' + finalExt);
}

// Remove the Babel <script> tag entirely.
if (babelUuid) {
  template = template.replace(
    new RegExp('<script[^>]*' + babelUuid + '[^>]*>\\s*</script>', 'i'), ''
  );
}

// Strip SRI/crossorigin (we self-host now), drop text/babel typing, add defer so
// every script runs in order after the DOM is parsed (preserves mount timing).
template = template
  .replace(/\s+integrity="[^"]*"/gi, '')
  .replace(/\s+crossorigin="[^"]*"/gi, '')
  .split('type="text/babel" ').join('')
  .split('type="text/jsx" ').join('')
  .replace(/<script\s+src="assets\//gi, '<script defer src="assets/');

// Expose the named images (logo/heroTruck/team) the app reads from window.__resources.
const resourceMap = {};
for (const r of extResources) {
  const entry = manifest[r.uuid];
  const ext = EXT[entry.mime] || 'bin';
  resourceMap[r.id] = 'assets/' + r.uuid + '.' + ext;
}
const inject = '<script>window.__resources = ' + JSON.stringify(resourceMap) + ';</script>';
template = template.replace(/<head[^>]*>/i, m => m + '\n' + inject);

fs.writeFileSync(path.join(OUT_DIR, 'index.html'), template);

console.log('Assets written:', written.length, 'special +', Object.keys(manifest).length - written.length, 'media');
written.forEach(w => console.log('  ', w));
console.log('Babel dropped:', babelUuid || '(none found!)');
console.log('index.html bytes:', fs.statSync(path.join(OUT_DIR, 'index.html')).size);
