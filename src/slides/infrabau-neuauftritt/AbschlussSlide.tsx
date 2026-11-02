import React from 'react';
import { C, font, UhlBox } from './ui';

export const AbschlussSlide: React.FC = () => (
  <div
    style={{
      ...font,
      width: 1920,
      height: 1080,
      background: C.black,
      color: '#FFFFFF',
      padding: 80,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
    }}
  >
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <UhlBox onDark />
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
      <span style={{ fontSize: 96, fontWeight: 700 }}>Danke.</span>
      <span style={{ fontSize: 34, color: '#BDBDBD' }}>Nächster Schritt: Phase 1 starten und die offenen Fragen klären.</span>
    </div>
    <img src="/infrabau/logo.png" alt="infrabau" style={{ width: 220, height: 'auto' }} />
  </div>
);
