import React from 'react';

// Look of the infrabau Gesprächsgrundlage (PowerPoint, Calibri): white ground, black boxes,
// uhl box top right. Carlito is the metric-compatible open replacement for Calibri.
export const C = {
  black: '#111111',
  text: '#1A1A1A',
  muted: '#6B6B6B',
  line: '#D9D9D9',
  light: '#F3F3F3',
  blue: '#8FAED6',
  yellow: '#F2C230',
  tan: '#C9A27E',
  green: '#96C49B',
};

export const font: React.CSSProperties = {
  fontFamily: 'var(--font-carlito), Carlito, Calibri, sans-serif',
};

export const UhlBox: React.FC<{ onDark?: boolean }> = ({ onDark }) => (
  <img
    src="/Uhl-Logo.svg"
    alt="uhl"
    style={{
      width: 92,
      height: 92,
      filter: onDark ? 'none' : 'invert(1)',
    }}
  />
);

interface FrameProps {
  title: string;
  section?: string;
  children: React.ReactNode;
}

// Standard slide: section label + title top left, uhl box top right, content below
export const Frame: React.FC<FrameProps> = ({ title, section, children }) => (
  <div
    style={{
      ...font,
      width: 1920,
      height: 1080,
      padding: '72px 80px 80px',
      background: '#FFFFFF',
      color: C.text,
      display: 'flex',
      flexDirection: 'column',
      gap: 64,
    }}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 18, paddingTop: 14 }}>
        {section && (
          <div style={{ fontSize: 22, color: C.muted, letterSpacing: '0.04em' }}>{section}</div>
        )}
        <h1 style={{ margin: 0, fontSize: 56, fontWeight: 700, lineHeight: 1.05 }}>{title}</h1>
      </div>
      <UhlBox />
    </div>
    <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>{children}</div>
  </div>
);

export const Box: React.FC<{
  children: React.ReactNode;
  dark?: boolean;
  style?: React.CSSProperties;
}> = ({ children, dark, style }) => (
  <div
    style={{
      border: `3px solid ${C.black}`,
      background: dark ? C.black : '#FFFFFF',
      color: dark ? '#FFFFFF' : C.text,
      padding: '32px 32px',
      display: 'flex',
      flexDirection: 'column',
      gap: 18,
      ...style,
    }}
  >
    {children}
  </div>
);

export const Chip: React.FC<{ children: React.ReactNode; filled?: boolean; light?: boolean }> = ({
  children,
  filled,
  light,
}) => (
  <span
    style={{
      display: 'inline-block',
      minWidth: 150,
      textAlign: 'center',
      fontSize: 20,
      fontWeight: 700,
      padding: '8px 14px',
      border: `2px solid ${light ? C.line : C.black}`,
      background: filled ? C.black : light ? C.light : '#FFFFFF',
      color: filled ? '#FFFFFF' : C.text,
    }}
  >
    {children}
  </span>
);

export const Dash: React.FC<{ items: React.ReactNode[]; size?: number; gap?: number; color?: string }> = ({
  items,
  size = 28,
  gap = 16,
  color,
}) => (
  <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap }}>
    {items.map((it, i) => (
      <li key={i} style={{ display: 'flex', gap: 14, fontSize: size, lineHeight: 1.3, color }}>
        <span aria-hidden>-</span>
        <span>{it}</span>
      </li>
    ))}
  </ul>
);

export const Small: React.FC<{ children: React.ReactNode; style?: React.CSSProperties }> = ({ children, style }) => (
  <div style={{ fontSize: 20, color: C.muted, ...style }}>{children}</div>
);
