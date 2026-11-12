// Smoke test of every layout with stress content (src/deck/probe.ts) in light and dark.
// Fails on what breaks a slide or its typesetting:
//   FEHLER        page does not render
//   UEBERLAUF     text leaves the slide or is clipped by its card / picture frame
//   UEBERLAPPUNG  two text blocks overlap
//   WAISE         last line of a multi-line text is one short word (widow word)
//   ZEILENANFANG  a line starts with a unit, sign or dash that belongs to the line before ("38 / %")
//   TRENNUNG      a hyphenated break leaves fewer than 3 letters on one side
//   KARTE         a card's visible inset differs between top, left and bottom by more than 6 px
// usage: node scripts/smoke.mjs [--port 3417] [--ids titel/links,team] [--probe max|min|beide|keine] [--out dir]
import puppeteer from 'puppeteer';
import { mkdirSync } from 'node:fs';

const arg = (k, d) => { const i = process.argv.indexOf(k); return i > 0 ? process.argv[i + 1] : d; };
const port = arg('--port', '3417');
const probeArg = arg('--probe', 'beide');
const out = arg('--out', '');
let ids = arg('--ids', '');
if (out) mkdirSync(out, { recursive: true });

const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width: 1920, height: 1080 });
if (!ids) {
  await page.goto(`http://localhost:${port}/vorlagen`, { waitUntil: 'networkidle0' });
  ids = (await page.$$eval('.reihe', (r) => r.map((x) => x.dataset.pfad))).join(',');
}
const probes = { beide: ['max', 'min'], keine: [''] }[probeArg] ?? [probeArg];

function pruefe() {
  const funde = [];
  const folie = document.querySelector('section.folie');
  const S = folie.getBoundingClientRect();
  const name = (e) => (e.textContent || '').trim().slice(0, 40);
  // inline boxes report their font's content area, taller than the line; measure the block that holds them
  const blockVon = (e) => {
    while (e.parentElement && getComputedStyle(e).display.startsWith('inline')) e = e.parentElement;
    return e;
  };
  const kartenSel = '.kachel, .kachel-akzent';
  // text blocks = elements that hold text directly
  const bloecke = [...folie.querySelectorAll('*')].filter(
    (e) => [...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim()) && e.getClientRects().length && !e.closest('svg, .bild-leer, .chrome-label'),
  );
  const zeilenVon = (e) => {
    // one entry per rendered word: text, rect(s); a word with two rects was hyphenated
    const woerter = [];
    const walker = document.createTreeWalker(e, NodeFilter.SHOW_TEXT);
    for (let n = walker.nextNode(); n; n = walker.nextNode()) {
      const re = /[^\s ]+(?: [^\s ]+)*/g;
      let m;
      while ((m = re.exec(n.textContent))) {
        const r = document.createRange();
        r.setStart(n, m.index);
        r.setEnd(n, m.index + m[0].length);
        // layout may split one word into several boxes on the same line; keep one rect per line
        const rects = [...r.getClientRects()].filter((x) => x.width > 0).filter((x, i, a) => !a.slice(0, i).some((y) => Math.abs(y.top - x.top) < x.height / 2));
        if (rects.length) woerter.push({ t: m[0], rects });
      }
    }
    const zeilen = [];
    for (const w of woerter) {
      for (const [i, rc] of w.rects.entries()) {
        let z = zeilen.find((z) => Math.abs(z.y - rc.top) < rc.height / 2);
        if (!z) zeilen.push((z = { y: rc.top, teile: [] }));
        z.teile.push({ t: w.t, teil: w.rects.length > 1 ? i : -1, x: rc.left, n: w.rects.length });
      }
    }
    zeilen.sort((a, b) => a.y - b.y);
    zeilen.forEach((z) => z.teile.sort((a, b) => a.x - b.x));
    return { woerter, zeilen };
  };
  for (const e of bloecke) {
    const r = e.getBoundingClientRect();
    if (r.right > S.right + 1 || r.bottom > S.bottom + 1 || r.left < S.left - 1 || r.top < S.top - 1) funde.push(`UEBERLAUF Folie: "${name(e)}"`);
    const rahmen = e.parentElement.closest(`${kartenSel}, .bild`);
    if (rahmen) {
      const R = rahmen.getBoundingClientRect();
      if (r.right > R.right + 1 || r.bottom > R.bottom + 1 || r.left < R.left - 1 || r.top < R.top - 1) funde.push(`UEBERLAUF Karte: "${name(e)}"`);
    }
    if (e.scrollWidth > e.clientWidth + 2 && getComputedStyle(e).overflowX !== 'visible') funde.push(`UEBERLAUF abgeschnitten: "${name(e)}"`);
    const { zeilen } = zeilenVon(e);
    if (zeilen.length >= 2) {
      const letzte = zeilen[zeilen.length - 1].teile;
      if (letzte.length === 1 && letzte[0].teil <= 0 && !letzte[0].t.includes('\u00a0') && letzte[0].t.replace(/[^\p{L}\p{N}]/gu, '').length <= 7) funde.push(`WAISE "${letzte[0].t}" in "${name(e)}"`);
    }
    for (const z of zeilen.slice(1)) {
      const erstes = z.teile[0];
      if (erstes && erstes.teil <= 0 && /^[%€×‰–—]/.test(erstes.t)) funde.push(`ZEILENANFANG "${erstes.t}" in "${name(e)}"`);
    }
  }
  // hyphenation fragments
  for (const e of bloecke) {
    for (const w of zeilenVon(e).woerter) {
      if (w.rects.length < 2 || w.t.includes('-')) continue;
      // estimate the split by the width share of the first fragment
      const a = w.rects[0].width, b = w.rects.slice(1).reduce((s, x) => s + x.width, 0);
      const vorne = Math.round((w.t.length * a) / (a + b));
      if (vorne < 3 || w.t.length - vorne < 3) funde.push(`TRENNUNG "${w.t}"`);
    }
  }
  // overlapping text blocks (leaf blocks only, nested ones are allowed to overlap their parent)
  const blaetter = [...new Set(bloecke.map(blockVon))].filter((e, _, alle) => !alle.some((x) => x !== e && e.contains(x)));
  for (let i = 0; i < blaetter.length; i++) {
    for (let j = i + 1; j < blaetter.length; j++) {
      const a = blaetter[i], b = blaetter[j];
      // identical items (stress lists repeat their sample items) sit on the same spot on purpose
      if (a.contains(b) || b.contains(a) || a.textContent === b.textContent) continue;
      for (const ra of a.getClientRects()) for (const rb of b.getClientRects()) {
        const x = Math.min(ra.right, rb.right) - Math.max(ra.left, rb.left);
        const y = Math.min(ra.bottom, rb.bottom) - Math.max(ra.top, rb.top);
        if (x > 4 && y > 4) { funde.push(`UEBERLAPPUNG "${name(a)}" / "${name(b)}"`); break; }
      }
    }
  }
  // card insets: ink of the content (text line boxes, icons, pictures) against the card edge
  for (const k of folie.querySelectorAll(kartenSel)) {
    const K = k.getBoundingClientRect();
    let top = Infinity, left = Infinity, bottom = -Infinity;
    for (const e of bloecke.filter((e) => k.contains(e) && e !== k)) {
      // left edge from the text itself, top and bottom from its block (trimmed line boxes)
      const b = blockVon(e).getBoundingClientRect();
      const r = document.createRange();
      r.selectNodeContents(e);
      const x = r.getBoundingClientRect();
      top = Math.min(top, b.top); bottom = Math.max(bottom, b.bottom); left = Math.min(left, x.left);
    }
    // nested surfaces (bars, icon boxes, pictures) count as content with their own edge
    const flaechen = [...k.querySelectorAll('*')].filter((x) => getComputedStyle(x).backgroundColor !== 'rgba(0, 0, 0, 0)' || x.matches('svg, img'));
    for (const x of flaechen) {
      const r = x.getBoundingClientRect();
      if (r.width) { top = Math.min(top, r.top); left = Math.min(left, r.left); bottom = Math.max(bottom, r.bottom); }
    }
    if (top === Infinity) continue;
    const ein = { oben: Math.round(top - K.top), links: Math.round(left - K.left), unten: Math.round(K.bottom - bottom) };
    const zentriert = getComputedStyle(k).textAlign === 'center' || getComputedStyle(k).justifyContent === 'center';
    const werte = zentriert ? [ein.oben, ein.unten] : [ein.oben, ein.links, ein.unten];
    // content shorter than the card (fixed card height) leaves room at the bottom on purpose
    const kurz = !zentriert && ein.unten > ein.oben + 6 && getComputedStyle(k).justifyContent !== 'space-between';
    if (!kurz && Math.max(...werte) - Math.min(...werte) > 6) funde.push(`KARTE oben ${ein.oben} links ${ein.links} unten ${ein.unten}: "${name(k)}"`);
  }
  return [...new Set(funde)];
}

let summe = 0;
const proTyp = {};
for (const id of ids.split(',').filter(Boolean)) {
  for (const probe of probes) {
    for (const t of ['light', 'dark']) {
      const res = await page.goto(`http://localhost:${port}/vorlagen/${id}?thema=${t}${probe ? `&probe=${probe}` : ''}`, { waitUntil: 'networkidle0' });
      const ort = `${id}${probe ? `/${probe}` : ''}/${t}`;
      if (!res.ok() || !(await page.$('section.folie'))) {
        console.log(`✗ ${ort}: FEHLER HTTP ${res.status()}`);
        summe++;
        continue;
      }
      await page.evaluate(() => document.fonts.ready);
      const funde = await page.evaluate(pruefe);
      if (out) await (await page.$('section.folie')).screenshot({ path: `${out}/${id.replace("/", "-")}-${probe || 'beispiel'}-${t}.png` });
      for (const f of funde) {
        console.log(`✗ ${ort}: ${f}`);
        proTyp[f.split(' ')[0]] = (proTyp[f.split(' ')[0]] ?? 0) + 1;
      }
      summe += funde.length;
    }
  }
}
await browser.close();
console.log(`\n${summe} Befunde ${JSON.stringify(proTyp)}`);
process.exit(summe ? 1 : 0);
