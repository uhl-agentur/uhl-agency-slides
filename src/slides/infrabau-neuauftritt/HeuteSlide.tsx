import React from 'react';
import { C, Frame } from './ui';

const fields = [
  { t: 'Neubau Wohnen', d: 'Fokus 1: Einheiten schneller verkaufen', bg: C.blue },
  { t: 'Grundstücksankauf', d: 'Fokus 2: ohne Grundstücke keine Projekte', bg: C.yellow },
  { t: 'Gewerbe & Nahversorgung', d: 'Große Tickets, läuft über Netzwerk', bg: C.tan },
  { t: 'Bestandsimmobilien', d: 'Zusatzgeschäft, Bewertung als Türöffner', bg: C.green },
];

const facts = [
  ['1994', 'gegründet'],
  ['17', 'Mitarbeiter'],
  ['82', 'realisierte Projekte'],
  ['1.703', 'Einheiten'],
];

export const HeuteSlide: React.FC = () => (
  <Frame title="infrabau heute" section="01 Ausgangslage">
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32 }}>
      {fields.map((f) => (
        <div
          key={f.t}
          style={{ background: f.bg, height: 300, padding: 32, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
        >
          <div style={{ fontSize: 32, fontWeight: 700 }}>{f.t}</div>
          <div style={{ fontSize: 24, lineHeight: 1.3 }}>{f.d}</div>
        </div>
      ))}
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32, marginTop: 72 }}>
      {facts.map(([n, l]) => (
        <div key={l} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <span style={{ fontSize: 72, fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{n}</span>
          <span style={{ fontSize: 24, color: C.muted }}>{l}</span>
        </div>
      ))}
    </div>
  </Frame>
);
