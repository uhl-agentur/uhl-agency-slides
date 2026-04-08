import React from 'react';

/**
 * Slide 26: Abschluss - "Ready when you are!"
 * Based on Figma node: 343:24056
 */
export const AbschlussSlide: React.FC = () => {
  return (
    <div
      className="bg-white flex flex-col items-center justify-center"
      style={{ width: '1920px', height: '1080px', padding: '80px', gap: '80px' }}
    >
      {/* Black inner container */}
      <div
        className="bg-black flex-1 w-full flex flex-col items-center justify-between overflow-hidden relative"
        style={{ padding: '72px', borderRadius: '4px' }}
      >
        {/* Main Text - rotated -3deg */}
        <div
          className="flex items-center justify-center flex-1"
          style={{ transform: 'rotate(-3deg)' }}
        >
          <h1
            className="font-humane text-white uppercase text-center"
            style={{
              fontSize: '270px',
              lineHeight: '0.75em',
              letterSpacing: '5.4px',
            }}
          >
            <span className="block">Ready when</span>
            <span className="block">you are!</span>
          </h1>
        </div>

        {/* UHL Logo - rotated 5deg, positioned in center-right area */}
        <div
          className="absolute"
          style={{
            top: '329.67px',
            left: '749.72px',
            transform: 'rotate(5deg)',
          }}
        >
          <img
            src="/Uhl-Logo.svg"
            alt="UHL Werbeagentur"
            style={{ width: '240px', height: '240px' }}
          />
        </div>
      </div>
    </div>
  );
};

export default AbschlussSlide;
