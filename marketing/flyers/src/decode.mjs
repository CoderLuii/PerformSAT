import jsQR from 'jsqr';
import { PNG } from 'pngjs';
import fs from 'node:fs';
import path from 'node:path';

const HERE = import.meta.dirname;
const OUT  = path.dirname(HERE);

const EXPECTED = 'https://sevaprep.com/?utm_source=flyer&utm_medium=print&utm_campaign=testcenter';

function decode(path) {
  const png = PNG.sync.read(fs.readFileSync(path));
  const res = jsQR(new Uint8ClampedArray(png.data), png.width, png.height);
  return res ? res.data : null;
}

let bad = 0;
for (const [label, path] of [
  ['standalone PNG asset', `${OUT}/seva-qr-testcenter.png`],
  ['rendered into the flyer PDF', `${HERE}/.work/page-200dpi.png`],
]) {
  const got = decode(path);
  const ok = got === EXPECTED;
  if (!ok) bad++;
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${label}`);
  console.log(`      -> ${got === null ? '(no QR detected)' : got}`);
}
console.log(`\nexpected: ${EXPECTED}`);
process.exit(bad ? 1 : 0);
