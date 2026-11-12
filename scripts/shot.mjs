// Screenshot layouts of the deck system at 1920 x 1080.
// usage: node scripts/shot.mjs --out <dir> [--port 3417] [--ids a,b,c] [--thema light|dark|beide]
import puppeteer from 'puppeteer';
import { mkdirSync } from 'node:fs';

const arg = (k, d) => { const i = process.argv.indexOf(k); return i > 0 ? process.argv[i + 1] : d; };
const out = arg('--out', 'output/shots');
const port = arg('--port', '3417');
const thema = arg('--thema', 'beide');
let ids = arg('--ids', '');
mkdirSync(out, { recursive: true });

const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1920, height: 1080 });
if (!ids) {
  await page.goto(`http://localhost:${port}/vorlagen`, { waitUntil: 'networkidle0' });
  ids = (await page.$$eval('.reihe', (r) => r.map((x) => x.id))).join(',');
}
const themen = thema === 'beide' ? ['light', 'dark'] : [thema];
for (const id of ids.split(',').filter(Boolean)) {
  for (const t of themen) {
    await page.goto(`http://localhost:${port}/vorlagen/${id}?thema=${t}`, { waitUntil: 'networkidle0' });
    await page.evaluate(() => document.fonts.ready);
    const el = await page.$('section.folie');
    const zuLang = await page.$$eval('.zu-lang', (e) => e.length);
    const ueber = await page.evaluate(() => {
      // text that leaves the slide or its own box (overflow check)
      const s = document.querySelector('section.folie').getBoundingClientRect();
      return [...document.querySelectorAll('section.folie *')].filter((e) => {
        const r = e.getBoundingClientRect();
        return r.width > 0 && (r.right > s.right + 1 || r.bottom > s.bottom + 1 || r.left < s.left - 1) && getComputedStyle(e).position !== 'absolute' && e.textContent.trim();
      }).length;
    });
    await el.screenshot({ path: `${out}/${id}-${t}.png` });
    console.log(`${id}-${t}${zuLang ? ` ZU-LANG:${zuLang}` : ''}${ueber ? ` UEBERLAUF:${ueber}` : ''}`);
  }
}
await browser.close();
