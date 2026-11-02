import React from 'react';
import { C, Frame, Small } from './ui';

const cols = ['Layer', 'KLAUS', 'tfm', 'asset', 'GEBA', 'AW', 'infrabau geplant'];
// 1 = vorhanden, 0 = nicht gefunden
const rows: [string, number[], boolean?][] = [
  ['Wohnungsliste mit Preis', [0, 1, 1, 0, 0, 0, 1]],
  ['Exposé gegen Kontaktdaten', [0, 1, 1, 1, 0, 0, 1]],
  ['Interessentenliste', [1, 1, 0, 0, 0, 0, 1]],
  ['Finanzierungs- oder Förderrechner', [1, 0, 0, 0, 0, 0, 1]],
  ['Sicher kaufen erklärt', [0, 0, 0, 0, 0, 0, 1], true],
  ['Online-Terminbuchung', [0, 0, 0, 0, 0, 0, 1], true],
  ['Wohnungsauswahl am Gebäude', [0, 0, 0, 0, 0, 0, 1], true],
  ['Baustellen-Tagebuch', [0, 0, 0, 0, 0, 0, 1], true],
];

const cell: React.CSSProperties = { padding: '16px 12px', textAlign: 'center', fontSize: 26 };

export const WettbewerbSlide: React.FC = () => (
  <Frame title="Wettbewerb im Vergleich" section="01 Ausgangslage">
    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead>
        <tr style={{ background: C.black, color: '#FFFFFF' }}>
          <th style={{ ...cell, textAlign: 'left', fontSize: 22 }}>Funktion auf der Website</th>
          {cols.map((c) => (
            <th key={c} style={{ ...cell, fontSize: 22, width: 150 }}>{c}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map(([label, v, only]) => (
          <tr key={label} style={{ borderBottom: `1px solid ${C.line}`, background: only ? C.light : undefined }}>
            <td style={{ ...cell, textAlign: 'left', fontWeight: only ? 700 : 400 }}>{label}</td>
            {v.map((x, i) => (
              <td key={i} style={{ ...cell, fontWeight: 700, color: x ? C.text : C.line }}>{x ? '●' : '·'}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
    <Small style={{ marginTop: 'auto' }}>Grau hinterlegt: hat in der Region noch kein Bauträger.</Small>
  </Frame>
);
