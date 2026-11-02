import React from 'react';
import { C, font, UhlBox } from './ui';

export const TitleSlide: React.FC = () => (
  <div
    style={{
      ...font,
      width: 1920,
      height: 1080,
      background: C.black,
      color: '#FFFFFF',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 56,
    }}
  >
    <div style={{ position: 'absolute', top: 72, right: 80 }}>
      <UhlBox onDark />
    </div>
    <img src="/infrabau/logo.png" alt="infrabau" style={{ width: 520, height: 'auto' }} />
    <div style={{ fontSize: 34, letterSpacing: '0.06em', color: '#BDBDBD' }}>Neuauftritt · Stand und Richtung</div>
  </div>
);
