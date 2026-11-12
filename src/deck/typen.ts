import type React from 'react';

/* ============================================================================
   Layout contract (S5 families). A family is one message ("Titel", "Aussage mit
   Bild"); its variants are different compositions of it. Every layout file
   exports LayoutDef entries, one per variant; the registry (registry.ts) orders
   them by family. The gallery (/vorlagen) renders every variant in light and
   dark with its `beispiel`; a deck (decks/<slug>.ts) is a list of
   { layout: <familie>, variante?, props } that check-deck validates.
   ============================================================================ */

/** what a variant shows mainly; drives the rhythm rule of check-abwechslung */
export type Art = 'text' | 'bild' | 'zahl' | 'diagramm' | 'liste';

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- registry holds layouts with different prop shapes
export interface LayoutDef<P = any> {
  /** family id, kebab-case, used in deck files as `layout` */
  familie: string;
  /** variant key inside the family; singletons have none */
  variante?: string;
  /** variant name in the gallery */
  name: string;
  /** one line: when to use this variant */
  zweck: string;
  art: Art;
  /**
   * Picture slots this variant renders. A deck slide needs at least this many real pictures
   * (src) in its props, or check-deck fails: grey placeholder frames never ship (F4).
   * A function when the count follows the props (one picture per team member).
   */
  bilder?: number | ((props: P) => number);
  komponente: React.FC<P>;
  beispiel: P;
  /**
   * Character limits per field. Path syntax: "titel", "punkte[]" (each item),
   * "karten[].text" (field of each item). Count excludes the ==highlight== marks.
   */
  limits: Record<string, number>;
  /** min and max items per top-level array field, e.g. { punkte: [0, 4] } */
  anzahl?: Record<string, [min: number, max: number]>;
}

export interface FolieImDeck {
  /** family id */
  layout: string;
  /** variant key; missing = the family's first variant */
  variante?: string;
  props: Record<string, unknown>;
  thema?: 'light' | 'dark';
  /** note for the speaker / leitfaden, never on the slide */
  notiz?: string;
}

export interface Deck {
  slug: string;
  titel: string;
  /** kind of deck; decks of the same kind are compared for variation (src/deck/abwechslung.ts) */
  art?: 'pitch' | 'strategie' | 'sonstige';
  thema: 'light' | 'dark';
  folien: FolieImDeck[];
}

/** Collect limit violations of one props object. */
export function pruefeLimits(props: Record<string, unknown>, def: Pick<LayoutDef, 'limits' | 'anzahl'>): string[] {
  const fehler: string[] = [];
  const len = (s: string) => s.replace(/==/g, '').length;
  for (const [pfad, max] of Object.entries(def.limits)) {
    for (const [ort, wert] of werte(props, pfad.split('.'), '')) {
      if (typeof wert === 'string' && len(wert) > max) fehler.push(`${ort}: ${len(wert)} > ${max} Zeichen`);
    }
  }
  for (const [feld, [min, max]] of Object.entries(def.anzahl ?? {})) {
    // a missing list counts as 0 items: with min > 0 the layout would crash on .map
    const n = Array.isArray(props[feld]) ? (props[feld] as unknown[]).length : 0;
    if (n < min || n > max) fehler.push(`${feld}: ${n} Einträge, erlaubt ${min}–${max}`);
  }
  return fehler;
}

function werte(obj: unknown, teile: string[], ort: string): [string, unknown][] {
  if (!teile.length) return [[ort, obj]];
  const [kopf, ...rest] = teile;
  const istListe = kopf.endsWith('[]');
  const key = istListe ? kopf.slice(0, -2) : kopf;
  if (obj === null || typeof obj !== 'object') return [];
  const v = (obj as Record<string, unknown>)[key];
  if (v === undefined) return [];
  if (istListe) {
    if (!Array.isArray(v)) return [];
    return v.flatMap((x, i) => werte(x, rest, `${ort}${key}[${i}]${rest.length ? '.' : ''}`));
  }
  return werte(v, rest, `${ort}${key}${rest.length ? '.' : ''}`);
}

/** "familie/variante" (or "familie" for a singleton): gallery anchor, /vorlagen/<pfad>, smoke ids */
export const pfadVon = (l: Pick<LayoutDef, 'familie' | 'variante'>) => (l.variante ? `${l.familie}/${l.variante}` : l.familie);

/** picture slots a slide with these props needs (LayoutDef.bilder) */
export function bilderNoetig(def: Pick<LayoutDef, 'bilder'>, props: Record<string, unknown>): number {
  return typeof def.bilder === 'function' ? def.bilder(props) : (def.bilder ?? 0);
}

/** real pictures in props: every object with a non-empty src, at any depth */
export function echteBilder(v: unknown): number {
  if (Array.isArray(v)) return v.reduce((n: number, x) => n + echteBilder(x), 0);
  if (!v || typeof v !== 'object') return 0;
  const o = v as Record<string, unknown>;
  return (typeof o.src === 'string' && o.src.trim() ? 1 : 0) + Object.entries(o).reduce((n, [k, x]) => n + (k === 'src' ? 0 : echteBilder(x)), 0);
}
