import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';

const SRC = process.argv[2];
const OUT = process.argv[3];
const html = fs.readFileSync(SRC, 'utf8');

function extract(type) {
  const tag = '<script type="' + type + '">';
  const start = html.indexOf(tag);
  const open = html.indexOf('>', start) + 1;
  const end = html.indexOf('</script>', open);
  return html.slice(open, end).trim();
}

const manifest = JSON.parse(extract('__bundler/manifest'));
const template = JSON.parse(extract('__bundler/template'));
const appUuids = [...template.matchAll(/<script[^>]*type="text\/(?:babel|jsx)"[^>]*src="([^"]+)"/gi)].map(m => m[1]);

fs.mkdirSync(OUT, { recursive: true });
let i = 0;
const index = [];
for (const uuid of appUuids) {
  const e = manifest[uuid];
  const buf = Buffer.from(e.data, 'base64');
  const code = (e.compressed ? zlib.gunzipSync(buf) : buf).toString('utf8');
  // first-line filename comment, if any
  const m = code.match(/^\s*\/\/\s*([\w.-]+\.jsx?)/);
  const nameHint = m ? m[1] : ('script' + i);
  const fname = String(i).padStart(2, '0') + '__' + nameHint.replace(/[^\w.-]/g, '_');
  fs.writeFileSync(path.join(OUT, fname), code);
  index.push({ i, uuid, name: nameHint, bytes: code.length });
  i++;
}
console.log(JSON.stringify(index, null, 2));
