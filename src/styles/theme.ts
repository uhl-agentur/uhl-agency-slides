// UHL Werbeagentur Design System
// Based on Figma design: ASgyHO4AUbDmALcCRoghgy

export const theme = {
  colors: {
    primary: '#ADF803',           // Neongrün accent
    primaryDark: '#000000',       // Black
    background: '#FFFFFF',        // White
    gray100: '#F7F7F7',           // Card background
    gray200: '#E5E5E5',           // Borders
    gray600: '#666666',           // Secondary text
    gray900: '#333333',           // Primary text
    white: '#FFFFFF',
    black: '#000000',
  },

  typography: {
    displayFont: '"Humane", sans-serif',
    textFont: '"Plus Jakarta Sans", sans-serif',

    // Display sizes (Humane) - 0.75em line-height for tight spacing
    h1: {
      fontSize: '270px',
      fontWeight: 800,
      lineHeight: '0.75em',
      letterSpacing: '5.4px',
    },
    h2: {
      fontSize: '128px',
      fontWeight: 700,
      lineHeight: '0.75em',
      letterSpacing: '2.56px',
    },
    h3: {
      fontSize: '72px',
      fontWeight: 700,
      lineHeight: '0.75em',
      letterSpacing: '0.72px',
    },

    // Body sizes (Plus Jakarta Sans) - auto line-height
    bodyLarge: {
      fontSize: '32px',
      fontWeight: 400,
      lineHeight: '40px',
    },
    bodyLargeBold: {
      fontSize: '32px',
      fontWeight: 700,
      lineHeight: '40px',
    },
    body: {
      fontSize: '24px',
      fontWeight: 400,
      lineHeight: 'normal',
    },
    bodyBold: {
      fontSize: '24px',
      fontWeight: 700,
      lineHeight: 'normal',
    },
    bodySmall: {
      fontSize: '18px',
      fontWeight: 400,
      lineHeight: 'normal',
    },
    bodySmallBold: {
      fontSize: '18px',
      fontWeight: 700,
      lineHeight: 'normal',
    },

    // Label/Badge
    label: {
      fontSize: '24px',
      fontWeight: 800,
      textTransform: 'uppercase' as const,
    },
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    '2xl': 48,
    '3xl': 56,
    '4xl': 64,
    '5xl': 80,
    slide: 80,                   // Standard slide padding
  },

  borderRadius: {
    none: 0,
    sm: 4,
    md: 8,
    lg: 16,
    full: 9999,
  },

  // Slide dimensions
  slide: {
    width: 1920,
    height: 1080,
    aspectRatio: 16 / 9,
  },

  // Badge rotation
  badge: {
    rotation: -3,               // degrees
  },

  // Transitions
  transitions: {
    fast: '0.15s ease',
    normal: '0.2s ease',
    slow: '0.3s ease',
  },

  // Z-index layers
  zIndex: {
    base: 0,
    overlay: 10,
    modal: 100,
    tooltip: 200,
    settings: 300,
    fullscreen: 1000,
  },
} as const;

export type Theme = typeof theme;

// Helper function to get CSS variables
export const cssVar = (name: keyof typeof theme.colors): string => {
  return `var(--color-${name.replace(/([A-Z])/g, '-$1').toLowerCase()})`;
};
