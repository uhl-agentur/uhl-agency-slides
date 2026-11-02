import React from 'react';
import { Box, C, Dash, Frame } from './ui';
import { fazits } from './data';

export const FazitUebersichtSlide: React.FC = () => (
  <Frame title="Was wir aus der Recherche ziehen" section="02 Fazit">
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28, flex: 1 }}>
      {fazits.map((f, i) => (
        <Box key={f.short} dark={i < 3} style={{ justifyContent: 'space-between', padding: '26px 30px' }}>
          <span style={{ fontSize: 24, color: i < 3 ? '#BDBDBD' : C.muted }}>{String(i + 1).padStart(2, '0')}</span>
          <span style={{ fontSize: 34, fontWeight: 700, lineHeight: 1.15 }}>{f.short}</span>
        </Box>
      ))}
    </div>
  </Frame>
);

export const createFazitSlide = (i: number): React.FC => {
  const f = fazits[i];
  const Slide: React.FC = () => (
    <Frame title={f.title} section={`02 Fazit · ${i + 1} von ${fazits.length}`}>
      <Box dark style={{ padding: '36px 44px', gap: 14 }}>
        <span style={{ fontSize: 24, color: '#BDBDBD' }}>Daher</span>
        <span style={{ fontSize: 38, fontWeight: 700, lineHeight: 1.25 }}>{f.daher}</span>
      </Box>
      <div style={{ marginTop: 64, display: 'flex', flexDirection: 'column', gap: 22 }}>
        <span style={{ fontSize: 24, color: C.muted }}>Warum</span>
        <Dash items={f.belege} size={30} gap={18} />
      </div>
    </Frame>
  );
  Slide.displayName = `FazitSlide${i + 1}`;
  return Slide;
};
