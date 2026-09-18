import fs from 'node:fs';
import { execFileSync } from 'node:child_process';

import path from 'node:path';

const HERE = import.meta.dirname;      // marketing/flyers/src
const DIR  = path.join(HERE, '.work'); // fonts + qr intermediates
const OUT  = path.dirname(HERE);       // marketing/flyers — the shippable PDFs
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

fs.mkdirSync(OUT, { recursive: true });

const tpl   = fs.readFileSync(`${HERE}/flyer.template.html`, 'utf8');
const fonts = fs.readFileSync(`${DIR}/fonts-inline.css`, 'utf8');
const qr    = fs.readFileSync(`${DIR}/qr.svg`, 'utf8');

const VARIANTS = [
  { slug: 'seva-flyer-testcenter',           cls: '',          label: 'full-color (cream bleed)' },
  { slug: 'seva-flyer-testcenter-ink-light', cls: 'ink-light', label: 'ink-saver (white field)' },
];

for (const v of VARIANTS) {
  const html = tpl
    .replace('__FONTS__', fonts)
    .replace('__QR__', qr)
    .replace('__VARIANT__', v.cls);

  const htmlPath = `${DIR}/${v.slug}.html`;
  fs.writeFileSync(htmlPath, html);

  // Isolated profile: sharing the default one with the user's running Chrome
  // makes headless block on the singleton lock instead of exiting.
  // Old --headless exits once the PDF is flushed; --headless=new lingers and
  // has to be timed out, so the exit code is not a reliable success signal.
  // Delete first, then assert the file came back: that IS the check.
  const pdfPath = `${OUT}/${v.slug}.pdf`;
  fs.rmSync(pdfPath, { force: true });
  fs.rmSync(`${DIR}/chrome-profile-${v.slug}`, { recursive: true, force: true });
  try {
    execFileSync(CHROME, [
      '--headless', '--disable-gpu', '--no-first-run',
      `--user-data-dir=${DIR}/chrome-profile-${v.slug}`,
      '--no-pdf-header-footer', '--virtual-time-budget=8000',
      `--print-to-pdf=${pdfPath}`,
      `file://${htmlPath}`,
    ], { stdio: 'pipe', timeout: 60_000 });
  } catch (err) {
    if (err.code !== 'ETIMEDOUT') throw err;
  }
  if (!fs.existsSync(pdfPath) || fs.statSync(pdfPath).size < 20_000) {
    throw new Error(`${v.slug}: chrome produced no usable PDF`);
  }

  // Proof at 150 DPI comes from the PDF itself, not a browser screenshot — the
  // PDF is what goes to the printer, so that is what gets inspected.
  execFileSync('sips', ['-s', 'format', 'png', '--resampleWidth', '1275',
    pdfPath, '--out', `${DIR}/proof-${v.slug}.png`], { stdio: 'pipe' });

  // Rasterize the finished PDF at 200 DPI so `npm run verify` decodes what a
  // student's camera will actually see, not the SVG we started from. The whole
  // page goes to the decoder — jsQR finds the code by its finder patterns, so
  // moving the scan block around the layout can never break the check.
  // 200 DPI, not 300: jsQR's locator fails on a 2550px-wide page (measured),
  // while 1700px decodes reliably and is still far above print resolution.
  if (v.cls === '') {
    execFileSync('sips', ['-s', 'format', 'png', '--resampleWidth', '1700',
      pdfPath, '--out', `${DIR}/page-200dpi.png`], { stdio: 'pipe' });
  }

  const kb = (fs.statSync(pdfPath).size / 1024).toFixed(0);
  console.log(`${v.slug}.pdf  ${kb}KB  — ${v.label}`);
}

fs.copyFileSync(`${DIR}/qr.png`, `${OUT}/seva-qr-testcenter.png`);
fs.copyFileSync(`${DIR}/qr.svg`, `${OUT}/seva-qr-testcenter.svg`);
console.log('\nwrote to', OUT, '\n' + fs.readdirSync(OUT).join('\n'));
