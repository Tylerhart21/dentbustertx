import fs from 'node:fs';

const html = fs.readFileSync(process.argv[2], 'utf8');

function grab(type) {
  const re = new RegExp('<script type="' + type + '">([\\s\\S]*?)</script>', 'i');
  const m = html.exec ? null : re.exec(html);
  return m ? m[1] : null;
}

function extract(type) {
  const start = html.indexOf('<script type="' + type + '">');
  if (start === -1) return null;
  const open = html.indexOf('>', start) + 1;
  const end = html.indexOf('</script>', open);
  return html.slice(open, end).trim();
}

const templateRaw = extract('__bundler/template');
const manifestRaw = extract('__bundler/manifest');
const extRaw = extract('__bundler/ext_resources');

console.log('=== has template/manifest/ext_resources ===',
  !!templateRaw, !!manifestRaw, !!extRaw);

const manifest = JSON.parse(manifestRaw);
console.log('\n=== manifest assets ===');
for (const [uuid, e] of Object.entries(manifest)) {
  console.log(uuid, '|', e.mime, '| compressed:', e.compressed, '| b64len:', e.data.length);
}

console.log('\n=== ext_resources ===');
console.log(extRaw);

const template = JSON.parse(templateRaw); // template is a JSON-encoded string
console.log('\n=== template length ===', template.length);

// Print all <script ...> opening tags in the template
const scriptTags = template.match(/<script[^>]*>/gi) || [];
console.log('\n=== <script> tags in template ===');
scriptTags.forEach((t, i) => console.log(i, t));

// Print <link rel=stylesheet/preconnect> and font links
const links = template.match(/<link[^>]*>/gi) || [];
console.log('\n=== <link> tags in template ===');
links.forEach((t) => console.log(t));

// How many text/babel scripts and their sizes
const babelBlocks = [...template.matchAll(/<script\b[^>]*type="text\/(babel|jsx)"[^>]*>([\s\S]*?)<\/script>/gi)];
console.log('\n=== text/babel script count ===', babelBlocks.length);
babelBlocks.forEach((b, i) => console.log('babel#' + i, 'len:', b[2].length, 'hasSrc:', /src=/.test(b[0])));

// Print head section up to first body
const headEnd = template.toLowerCase().indexOf('</head>');
console.log('\n=== HEAD ===\n', template.slice(0, headEnd + 7));
