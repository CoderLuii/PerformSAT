import fs from 'node:fs';
import path from 'node:path';

const HERE = import.meta.dirname;
const WORK = path.join(HERE, '.work');
fs.mkdirSync(WORK, { recursive: true });

// Ask Google for the CSS as a modern browser, or it serves legacy TTF instead
// of the woff2 we want to embed.
const GF = 'https://fonts.googleapis.com/css2?family=Baloo+2:wght@800'
  + '&family=Bricolage+Grotesque:opsz,wght@12..96,400..800'
  + '&family=Hanken+Grotesk:wght@400..800&display=swap';
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
  + ' (KHTML, like Gecko) Chrome/126.0 Safari/537.36';

const cssRes = await fetch(GF, { headers: { 'User-Agent': UA } });
if (!cssRes.ok) throw new Error(`google fonts css: ${cssRes.status}`);
const css = await cssRes.text();

// Google's CSS emits one @font-face per subset, each preceded by a /* subset */
// comment. The flyer is English-only, so keep latin + latin-ext and drop the
// rest — that's the difference between a 40KB and a 400KB embedded payload.
const KEEP = new Set(['latin', 'latin-ext']);
const blocks = [...css.matchAll(/\/\*\s*([a-z-]+)\s*\*\/\s*(@font-face\s*\{[^}]*\})/g)];

let out = '';
let kept = 0;
for (const [, subset, block] of blocks) {
  if (!KEEP.has(subset)) continue;
  const url = block.match(/url\((https:\/\/fonts\.gstatic\.com\/[^)]+)\)/)?.[1];
  if (!url) continue;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`fetch ${url}: ${res.status}`);
  const b64 = Buffer.from(await res.arrayBuffer()).toString('base64');
  out += block.replace(/url\(https:\/\/[^)]+\)/, `url(data:font/woff2;base64,${b64})`) + '\n';
  kept++;
}

fs.writeFileSync(path.join(WORK, 'fonts-inline.css'), out);
console.log(`inlined ${kept} @font-face blocks -> ${(out.length / 1024).toFixed(0)}KB`);
console.log('families:', [...new Set([...out.matchAll(/font-family:\s*'([^']+)'/g)].map(m => m[1]))].join(', '));
