import type { LayoutDef } from './typen';

/* ============================================================================
   Stress content for the smoke test (scripts/smoke.mjs, /vorlagen/<id>?probe=…).
   Derived from a layout's `beispiel`, so every new layout is covered without
   writing test data:
     max  every limited text filled up to its limit with real German words,
          long compounds included; every list at its maximum count
     min  every longer text cut to its first word; every list at its minimum
   Short fields (limit <= 10: numbers, prices, years) keep their sample value.
   ============================================================================ */

export type Probe = 'max' | 'min';

const WOERTER = (
  'Fachkräftegewinnung in der Region braucht Sichtbarkeit Suchmaschinenoptimierung und klare Botschaften ' +
  'Kundenzufriedenheit wächst wenn Anfragen schnell beantwortet werden Wettbewerbsanalyse zeigt die Lücke ' +
  'im Markt Pflegedienstleistungen Versicherungsvergleich Bewerbermanagement auf jeder Seite der Website'
).split(' ');

function fuelle(s: string, max: number): string {
  const woerter = s.replace(/==/g, '').replace(/\n/g, ' ').split(/\s+/).filter(Boolean);
  let i = 0;
  while (woerter.join(' ').length < max) woerter.push(WOERTER[i++ % WOERTER.length]);
  while (woerter.length > 1 && woerter.join(' ').length > max) woerter.pop();
  return woerter.join(' ');
}

/** limit that applies to a path like "karten[1].text" (limits use "karten[].text") */
function limitFuer(limits: Record<string, number>, pfad: string): number | undefined {
  return limits[pfad.replace(/\[\d+\]/g, '[]')];
}

function wandle(v: unknown, pfad: string, def: Pick<LayoutDef, 'limits' | 'anzahl'>, probe: Probe): unknown {
  if (typeof v === 'string') {
    const max = limitFuer(def.limits, pfad);
    if (max === undefined || max <= 10) return v;
    return probe === 'max' ? fuelle(v, max) : v.replace(/==/g, '').split(/\s+/)[0];
  }
  if (Array.isArray(v)) {
    const feld = pfad.replace(/\[\d+\]/g, '[]');
    const spanne = pfad.includes('.') || pfad.includes('[') ? undefined : def.anzahl?.[feld];
    let liste = v;
    if (spanne && v.length) {
      const ziel = probe === 'max' ? spanne[1] : spanne[0];
      liste = Array.from({ length: ziel }, (_, i) => v[i % v.length]);
    }
    return liste.map((x, i) => wandle(x, `${pfad}[${i}]`, def, probe));
  }
  if (v && typeof v === 'object') {
    return Object.fromEntries(Object.entries(v).map(([k, x]) => [k, wandle(x, pfad ? `${pfad}.${k}` : k, def, probe)]));
  }
  return v;
}

export function probeProps<P>(def: LayoutDef<P>, probe: Probe): P {
  return wandle(def.beispiel, '', def, probe) as P;
}
