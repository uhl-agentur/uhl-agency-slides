import React from 'react';
import { Box, C, Frame, Small } from './ui';

const terms = [
  ['3.050', 'Bauträger', 'Eigennutzer'],
  ['2.650', 'Immobilie bewerten', 'Eigentümer'],
  ['1.500', 'Grundstück verkaufen', 'Eigentümer'],
  ['450', 'Eigentumswohnung Augsburg', 'Eigennutzer'],
];

export const SuchpotenzialSlide: React.FC = () => (
  <Frame title="Wonach gesucht wird" section="01 Ausgangslage">
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 32 }}>
      {terms.map(([n, t, p]) => (
        <div key={t} style={{ borderTop: `6px solid ${C.black}`, paddingTop: 28, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <span style={{ fontSize: 80, fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{n}</span>
          <span style={{ fontSize: 30, fontWeight: 700 }}>{t}</span>
          <span style={{ fontSize: 24, color: C.muted }}>{p}</span>
        </div>
      ))}
    </div>
    <Box dark style={{ marginTop: 80, padding: '28px 36px' }}>
      <span style={{ fontSize: 32, fontWeight: 700 }}>
        Bewerten und Grundstück verkaufen werden fast so oft gesucht wie „Bauträger“.
      </span>
    </Box>
    <Small style={{ marginTop: 'auto' }}>Suchen pro Monat, deutschlandweit ohne Ortsangabe. Quelle: Sistrix.</Small>
  </Frame>
);
