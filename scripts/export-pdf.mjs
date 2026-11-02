// Export a deck route (16:9, one page per slide) or a leitfaden route (A4) to PDF.
// usage: node scripts/export-pdf.mjs --route /donauries-social [--a4] --output out.pdf [--port 3417]
import puppeteer from 'puppeteer';

const arg = (k, d) => { const i = process.argv.indexOf(k); return i > 0 ? process.argv[i + 1] : d; };
const route = arg('--route');
const output = arg('--output');
const port = arg('--port', '3417');
const a4 = process.argv.includes('--a4');
if (!route || !output) { console.error('usage: --route <path> --output <file> [--a4] [--port]'); process.exit(1); }

const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1920, height: 1080 });
await page.goto(`http://localhost:${port}${route}`, { waitUntil: 'networkidle0' });
await page.evaluate(() => document.fonts.ready);
await page.pdf(
  a4
    ? { path: output, format: 'A4', printBackground: true, margin: { top: '14mm', bottom: '14mm', left: '0', right: '0' } }
    : { path: output, width: '1920px', height: '1080px', printBackground: true, preferCSSPageSize: true },
);
await browser.close();
console.log(`PDF saved to ${output}`);
