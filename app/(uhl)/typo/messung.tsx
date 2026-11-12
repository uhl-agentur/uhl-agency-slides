'use client';

import { useEffect, useState } from 'react';

interface Gruppe {
  schluessel: string;
  groesse: number;
  gewicht: string;
  zeile: string;
  familie: string;
  klassen: Set<string>;
  layouts: Set<string>;
  anzahl: number;
  probe: string;
}

/** Measures every text element inside #typo-quelle and lists the distinct type settings, largest first. */
export function TypoMessung() {
  const [gruppen, setGruppen] = useState<Gruppe[] | null>(null);

  useEffect(() => {
    document.fonts.ready.then(() => {
      const map = new Map<string, Gruppe>();
      const quelle = document.getElementById('typo-quelle');
      if (!quelle) return;
      for (const e of quelle.querySelectorAll<HTMLElement>('section.folie *')) {
        const text = [...e.childNodes].filter((n) => n.nodeType === 3).map((n) => n.textContent ?? '').join('').trim();
        if (!text || e.closest('svg')) continue;
        const cs = getComputedStyle(e);
        const groesse = parseFloat(cs.fontSize);
        const zeile = cs.lineHeight === 'normal' ? 'normal' : (parseFloat(cs.lineHeight) / groesse).toFixed(2);
        const familie = cs.fontFamily.toLowerCase().includes('display') ? 'Display' : 'Sans';
        const schluessel = `${groesse}|${cs.fontWeight}|${zeile}|${familie}`;
        const t = e.closest<HTMLElement>('[class*="t-"]');
        const klasse = [...(t?.classList ?? [])].find((k) => k.startsWith('t-')) ?? (e.className && typeof e.className === 'string' ? e.className.split(' ')[0] : e.tagName.toLowerCase());
        const layout = e.closest<HTMLElement>('[data-layout]')?.dataset.layout ?? '?';
        const g = map.get(schluessel) ?? { schluessel, groesse, gewicht: cs.fontWeight, zeile, familie, klassen: new Set(), layouts: new Set(), anzahl: 0, probe: text };
        g.klassen.add(klasse);
        g.layouts.add(layout);
        g.anzahl++;
        if (text.length > g.probe.length && text.length < 60) g.probe = text;
        map.set(schluessel, g);
      }
      setGruppen([...map.values()].sort((a, b) => b.groesse - a.groesse || Number(b.gewicht) - Number(a.gewicht)));
    });
  }, []);

  if (!gruppen) return <p>Messe …</p>;
  const groessen = [...new Set(gruppen.map((g) => g.groesse))];
  return (
    <>
      <p style={{ fontSize: 18, margin: '0 0 24px' }}>
        <b>{groessen.length} Schriftgrößen</b> ({groessen.join(' · ')} px) in <b>{gruppen.length} Kombinationen</b> aus Größe, Gewicht, Zeilenhöhe, Familie.
      </p>
      <div style={{ display: 'grid', gap: 16 }}>
        {gruppen.map((g) => (
          <div key={g.schluessel} style={{ background: '#fff', borderRadius: 8, padding: 24, display: 'grid', gridTemplateColumns: '280px 1fr', gap: 24 }}>
            <div style={{ fontSize: 14, color: '#333', lineHeight: 1.5 }}>
              <div style={{ fontSize: 20, fontWeight: 600 }}>{g.groesse} px</div>
              <div>
                {g.familie} · {g.gewicht} · Zeile {g.zeile}
              </div>
              <div>Klasse: {[...g.klassen].join(', ')}</div>
              <div>
                {g.anzahl} Textstellen in {g.layouts.size} Layouts
              </div>
              <details style={{ marginTop: 8, color: '#666' }}>
                <summary>Layouts</summary>
                {[...g.layouts].join(', ')}
              </details>
            </div>
            <div
              style={{
                fontSize: g.groesse,
                fontWeight: Number(g.gewicht),
                lineHeight: g.zeile,
                fontFamily: g.familie === 'Display' ? 'var(--font-funnel-display)' : 'var(--font-funnel-sans)',
                letterSpacing: g.groesse >= 56 ? '-0.03em' : undefined,
                color: '#111',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
              }}
            >
              {g.probe}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
