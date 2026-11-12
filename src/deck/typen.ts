import type React from 'react';

/* ============================================================================
   Layout contract. Every layout file exports one or more LayoutDef. The
   registry (registry.ts) collects them; the gallery (/vorlagen) renders every
   layout in light and dark with its `beispiel`; a deck (decks/<slug>.ts) is a
   list of { layout, props } that the check script validates against `limits`.
   ============================================================================ */

export type Gruppe =
  | 'Titel'
  | 'Inhalt'
  | 'Einstieg'
  | 'Team'
  | 'Problem'
  | 'Lösung'
  | 'Leistung'
  | 'Beweis'
  | 'Wert'
  | 'Preis'
  | 'Ablauf'
  | 'Kontakt'
  | 'Kapitel'
  | 'Arbeiten'
  | 'Strategie';

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- registry holds layouts with different prop shapes
export interface LayoutDef<P = any> {
  /** stable id, kebab-case, used in deck files */
  id: string;
  name: string;
  gruppe: Gruppe;
  /** where the composition comes from: "akoya-07", "portfolio-12", "agentur" */
  quelle: string;
  /** one line: when to use this layout */
  zweck: string;
  komponente: React.FC<P>;
  beispiel: P;
  /**
   * Character limits per field. Path syntax: "titel", "punkte[]" (each item),
   * "karten[].text" (field of each item). Count excludes the ==highlight== marks.
   */
  limits: Record<string, number>;
  /** maximum items per array field, e.g. { punkte: 4 } */
  anzahl?: Record<string, [min: number, max: number]>;
}

export interface FolieImDeck {
  layout: string;
  props: Record<string, unknown>;
  thema?: 'light' | 'dark';
  /** note for the speaker / leitfaden, never on the slide */
  notiz?: string;
}

export interface Deck {
  slug: string;
  titel: string;
  /** bottom-left chrome, e.g. "Donauries · Marketingstrategie" */
  marke: string;
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
    const arr = props[feld];
    if (Array.isArray(arr) && (arr.length < min || arr.length > max)) fehler.push(`${feld}: ${arr.length} Einträge, erlaubt ${min}–${max}`);
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
