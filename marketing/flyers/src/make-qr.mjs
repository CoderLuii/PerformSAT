import QRCode from 'qrcode';
import fs from 'node:fs';
import path from 'node:path';

const WORK = path.join(import.meta.dirname, '.work');
fs.mkdirSync(WORK, { recursive: true });

const URL = 'https://sevaprep.com/?utm_source=flyer&utm_medium=print&utm_campaign=testcenter';

// errorCorrectionLevel 'Q' = 25% recoverable. A flyer gets folded, shoved in a
// pocket, and scanned at an angle in a parking lot; the extra redundancy is
// worth the denser grid at this URL length.
const opts = { errorCorrectionLevel: 'Q', margin: 0, type: 'svg', color: { dark: '#15171C', light: '#0000' } };

const svg = await QRCode.toString(URL, opts);
fs.writeFileSync(path.join(WORK, 'qr.svg'), svg);

// A high-res PNG too, for verification and for any printer that wants a raster.
await QRCode.toFile(path.join(WORK, 'qr.png'), URL, {
  errorCorrectionLevel: 'Q', margin: 2, width: 2000,
  color: { dark: '#15171C', light: '#FFFFFF' },
});

const modules = QRCode.create(URL, { errorCorrectionLevel: 'Q' }).modules;
console.log('url        :', URL, `(${URL.length} chars)`);
console.log('qr version :', modules.size, 'x', modules.size, 'modules');
console.log('svg bytes  :', svg.length);
