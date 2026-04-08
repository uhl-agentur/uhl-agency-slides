import React from 'react';

interface SectionDividerProps {
  sectionNumber: string;
  title: string;
  subtitle?: string;
}

/**
 * Section divider slide component
 * Full-screen black background with section number and title
 * Based on Figma design (e.g., 343:23339 for Section 01)
 */
export const SectionDivider: React.FC<SectionDividerProps> = ({
  sectionNumber,
  title,
  subtitle,
}) => {
  return (
    <div
      className="bg-white flex"
      style={{ width: '1920px', height: '1080px', padding: '80px', gap: '24px' }}
    >
      {/* Black inner container */}
      <div
        className="bg-black flex-1 h-full flex items-end overflow-hidden"
        style={{ padding: '72px' }}
      >
        <div className="flex flex-col items-start relative" style={{ paddingBottom: '24px' }}>
          {/* Section number badge - rotated -3deg, positioned above title */}
          <div style={{ marginBottom: '-24px', zIndex: 2 }}>
            <div style={{ transform: 'rotate(-3deg)' }}>
              <div
                className="font-jakarta font-extrabold uppercase text-center badge-masked flex items-center justify-center"
                style={{
                  backgroundColor: '#ADF803',
                  color: '#000000',
                  paddingTop: '16px',
                  paddingBottom: '12px',
                  paddingLeft: '12px',
                  paddingRight: '12px',
                  fontSize: '72px',
                  lineHeight: 1,
                  minWidth: '120px',
                  '--mask-bg': '#000000',
                } as React.CSSProperties}
              >
                {sectionNumber}
              </div>
            </div>
          </div>

          {/* Title */}
          <h1
            className="font-humane text-white uppercase"
            style={{
              fontSize: '270px',
              lineHeight: '0.75em',
              letterSpacing: '5.4px',
              marginBottom: '-24px',
              zIndex: 1,
            }}
          >
            {title.split('\n').map((line, i) => (
              <span key={i} className="block">
                {line}
              </span>
            ))}
          </h1>

          {subtitle && (
            <p className="font-jakarta text-white text-body-lg mt-4 opacity-70">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default SectionDivider;
