import { layoutNach, varianten } from './registry';
import type { Deck } from './typen';

/* ============================================================================
   Variation rules (S5, user F4 "nicht immer dieselben Slides … abwechseln").
   Warnings only: check-deck prints them, the /slides skill fixes what it can.
     1  same family + variant never twice in a row
     2  same family at most twice in a row
     3  same variant at most twice per deck
     4  at most three slides of the same art in a row (pattern interrupt, S6)
     5  vs. the newest other deck of the same kind: more than half of the shared
        families on the same variant -> name the unused variants
     6  show, do not list (S6): from 6 content slides on, at least a third are
        bild / zahl / diagramm
     7  strong end (S6, peak-end rule): a deck of 6+ slides ends on kontakt,
        ablauf or offene-fragen, a next step instead of a summary
   Exempt from 2 and 3: families with one variant (strategy slides, team, open
   questions: nothing to vary) and kapitel (one divider per chapter by design).
   ============================================================================ */

const MAX_FOLGE = 3;
/** frame slides: not counted as content for rule 6 */
const RAHMEN = new Set(['titel', 'inhalt', 'kapitel', 'kontakt', 'offene-fragen']);
const SCHLUSS = new Set(['kontakt', 'ablauf', 'offene-fragen']);
const SICHTBAR = new Set(['bild', 'zahl', 'diagramm']);
const frei = (familie: string) => familie === 'kapitel' || varianten(familie).length < 2;

interface Stelle {
  nr: number;
  familie: string;
  variante: string;
  art?: string;
}

function stellen(deck: Deck): Stelle[] {
  return deck.folien.map((f, i) => {
    const l = layoutNach(f.layout, f.variante);
    return { nr: i + 1, familie: f.layout, variante: l?.variante ?? f.variante ?? '', art: l?.art };
  });
}

const name = (s: Stelle) => (s.variante ? `${s.familie}/${s.variante}` : s.familie);

/** Warnings for one deck; `alle` = every registered deck, in registration order (later = newer). */
export function pruefeAbwechslung(deck: Deck, alle: Deck[] = []): string[] {
  const w: string[] = [];
  const s = stellen(deck);

  s.forEach((x, i) => {
    const v = s[i - 1];
    if (v && name(v) === name(x) && x.variante) w.push(`Folie ${x.nr}: ${name(x)} direkt nach Folie ${v.nr} wiederholt (Regel 1)`);
    const vv = s[i - 2];
    if (v && vv && !frei(x.familie) && v.familie === x.familie && vv.familie === x.familie) w.push(`Folie ${x.nr}: Familie ${x.familie} dreimal in Folge (Regel 2)`);
  });

  const zaehler = new Map<string, number[]>();
  for (const x of s) if (x.variante && !frei(x.familie)) zaehler.set(name(x), [...(zaehler.get(name(x)) ?? []), x.nr]);
  for (const [n, nrs] of zaehler) if (nrs.length > 2) w.push(`${n} ${nrs.length}× im Deck (Folien ${nrs.join(', ')}), höchstens 2 (Regel 3)`);

  let folge: Stelle[] = [];
  for (const x of s) {
    folge = folge.length && folge[0].art === x.art ? [...folge, x] : [x];
    if (folge.length === MAX_FOLGE + 1) w.push(`Folien ${folge[0].nr}–${x.nr}: ${folge.length}× art ${x.art} in Folge, höchstens ${MAX_FOLGE}; eine andere Darstellung dazwischen (Regel 4)`);
  }

  const inhalt = s.filter((x) => !RAHMEN.has(x.familie));
  const sichtbar = inhalt.filter((x) => SICHTBAR.has(x.art ?? ''));
  if (inhalt.length >= 6 && sichtbar.length * 3 < inhalt.length)
    w.push(`nur ${sichtbar.length} von ${inhalt.length} Inhaltsfolien zeigen Bild, Zahl oder Diagramm, mindestens ein Drittel; Struktur visualisieren: mindmap, trichter, kreislauf, vergleich, pyramide, anteile (Regel 6)`);

  const ende = s[s.length - 1];
  if (s.length >= 6 && !SCHLUSS.has(ende.familie)) w.push(`Folie ${ende.nr}: Deck endet auf ${name(ende)}; letzte Folie = nächster Schritt (kontakt, ablauf oder offene-fragen) (Regel 7)`);

  // rule 5: the newest other deck of the same kind
  const andere = deck.art ? alle.filter((d) => d.slug !== deck.slug && d.art === deck.art) : [];
  const letztes = andere[andere.length - 1];
  if (letztes) {
    const dort = new Map(stellen(letztes).filter((x) => !frei(x.familie)).map((x) => [x.familie, x.variante]));
    const geteilt = [...new Set(s.filter((x) => dort.has(x.familie) && !frei(x.familie)).map((x) => x.familie))];
    const gleich = geteilt.filter((f) => s.some((x) => x.familie === f && x.variante === dort.get(f)));
    if (geteilt.length && gleich.length * 2 > geteilt.length) {
      const tipps = gleich.map((f) => {
        const rest = varianten(f).map((l) => l.variante).filter((v) => v && v !== dort.get(f));
        return `${f}: statt ${dort.get(f)} z. B. ${rest.join(' / ')}`;
      });
      w.push(`${gleich.length} von ${geteilt.length} Familien wie im letzten ${deck.art}-Deck "${letztes.slug}" (Regel 5); ${tipps.join('; ')}`);
    }
  }
  return w;
}
