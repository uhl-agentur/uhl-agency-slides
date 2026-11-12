import { layoutNach, varianten } from './registry';
import type { Deck } from './typen';

/* ============================================================================
   Variation rules (S5, user F4 "nicht immer dieselben Slides … abwechseln").
   Warnings only: check-deck prints them, the /slides skill fixes what it can.
     1  same family + variant never twice in a row
     2  same family at most twice in a row
     3  same variant at most twice per deck
     4  at most three text slides in a row
     5  vs. the newest other deck of the same kind: more than half of the shared
        families on the same variant -> name the unused variants
   Exempt from 2 and 3: families with one variant (strategy slides, team, open
   questions: nothing to vary) and kapitel (one divider per chapter by design).
   ============================================================================ */

const MAX_TEXT_FOLGE = 3;
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
    folge = x.art === 'text' ? [...folge, x] : [];
    if (folge.length === MAX_TEXT_FOLGE + 1) w.push(`Folien ${folge[0].nr}–${x.nr}: ${folge.length} Textfolien in Folge, höchstens ${MAX_TEXT_FOLGE}; Bild, Zahl oder Diagramm dazwischen (Regel 4)`);
  }

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
