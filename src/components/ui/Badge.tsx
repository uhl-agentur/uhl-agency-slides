import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'highlight';
  size?: 'sm' | 'md' | 'lg';
  rotated?: boolean;
  className?: string;
  maskBg?: string; // Background color for masking (replaces black stroke)
}

/**
 * Badge component - UHL brand label badges
 * Features the characteristic ~3deg rotation
 *
 * Based on Figma designs:
 * - Card labels use Humane Bold at 72px
 * - Section number badges use Jakarta ExtraBold at 72px
 */
export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  rotated = true,
  className = '',
  maskBg,
}) => {
  // Card labels use Humane Bold, section numbers use Jakarta ExtraBold
  const baseStyles = 'inline-flex items-center justify-center font-humane font-bold uppercase';

  // Size styles - h3 font (72px)
  const sizeStyles = {
    sm: 'text-3xl leading-none',
    md: 'text-[72px] leading-none',
    lg: 'text-[72px] leading-none',
  };

  // Padding styles - compensate for font baseline with more top padding
  const getPaddingStyles = (): React.CSSProperties => {
    const paddings = {
      sm: { top: '10px', bottom: '8px', left: '8px', right: '8px' },
      md: { top: '16px', bottom: '12px', left: '12px', right: '12px' },
      lg: { top: '20px', bottom: '16px', left: '16px', right: '16px' },
    };
    const p = paddings[size];
    return {
      paddingTop: p.top,
      paddingBottom: p.bottom,
      paddingLeft: p.left,
      paddingRight: p.right,
    };
  };

  // Typography based on Figma - Humane Bold with 0.72px letter spacing
  // text-box-trim for proper vertical alignment (cap to baseline)
  const baseInlineStyles: React.CSSProperties = {
    letterSpacing: '0.72px',
    lineHeight: 1,
    textBoxTrim: 'both',
    textBoxEdge: 'cap alphabetic',
  };

  // Variant styles based on Figma
  // When maskBg is provided, use pseudo-element masking instead of black border
  const getVariantStyles = (): React.CSSProperties => {
    const paddingStyles = getPaddingStyles();
    if (variant === 'primary') {
      return { ...baseInlineStyles, ...paddingStyles, backgroundColor: '#000000', color: '#FFFFFF' };
    }
    // Secondary/highlight - neon green badges
    if (maskBg) {
      // Use masking instead of border
      return {
        ...baseInlineStyles,
        ...paddingStyles,
        backgroundColor: '#ADF803',
        color: '#000000',
        '--mask-bg': maskBg,
      } as React.CSSProperties;
    }
    // Fallback to border if no maskBg provided
    return { ...baseInlineStyles, ...paddingStyles, backgroundColor: '#ADF803', color: '#000000', border: '8px solid #000000' };
  };

  const useMasking = maskBg && (variant === 'secondary' || variant === 'highlight');

  return (
    <div style={{ transform: rotated ? 'rotate(-3deg)' : 'none' }}>
      <div
        className={`${baseStyles} ${sizeStyles[size]} ${useMasking ? 'badge-masked' : ''} ${className}`}
        style={getVariantStyles()}
      >
        {children}
      </div>
    </div>
  );
};

export default Badge;
