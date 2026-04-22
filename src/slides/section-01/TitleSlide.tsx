import React from 'react';
import { useVariables } from '../../hooks/useVariables';

/**
 * Slide 1: Title Slide
 * Displays: "PROJEKT KICK-OFF" with {{kundenname}} badge and UHL logo
 * Figma node: 343:23296
 */
export const TitleSlide: React.FC = () => {
  const { kundenname } = useVariables();

  return (
    <div
      className="bg-white flex"
      style={{ width: '1920px', height: '1080px', padding: '80px', gap: '24px' }}
    >
      {/* Black inner container */}
      <div
        className="bg-black flex-1 h-full flex flex-col justify-between overflow-hidden"
        style={{ padding: '72px' }}
      >
        {/* UHL Logo in top right */}
        <div className="flex justify-end">
          <img
            src="/Uhl-Logo.svg"
            alt="UHL Werbeagentur"
            style={{ width: '160px', height: '160px' }}
          />
        </div>

        {/* Title and Customer Badge */}
        <div className="flex flex-col items-start" style={{ paddingBottom: '24px' }}>
          {/* Main Title */}
          <h1
            className="font-humane text-white uppercase"
            style={{
              fontSize: '270px',
              lineHeight: '0.75em',
              letterSpacing: '5.4px',
              marginBottom: '-24px',
            }}
          >
            <span className="block">Projekt</span>
            <span className="block">Kick-Off</span>
          </h1>

          {/* Customer Name Badge - rotated -3deg, using mask instead of black stroke */}
          <div style={{ marginBottom: '-24px' }}>
            <div style={{ transform: 'rotate(-3deg)' }}>
              <div
                className="font-jakarta font-extrabold uppercase badge-masked"
                style={{
                  backgroundColor: '#ADF803',
                  color: '#000000',
                  padding: '16px',
                  fontSize: '40px',
                  lineHeight: 1,
                  '--mask-bg': '#000000',
                  textBoxTrim: 'both' as unknown as React.CSSProperties['textBoxTrim'],
                  textBoxEdge: 'cap alphabetic' as unknown as React.CSSProperties['textBoxEdge'],
                } as React.CSSProperties}
              >
                {kundenname}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TitleSlide;
