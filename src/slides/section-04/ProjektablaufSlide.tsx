import React, { useEffect, useMemo } from 'react';
import { useKickoffStore } from '../../state/kickoffStore';

/**
 * Slide 20: Projektablauf (Project Timeline)
 * Based on Figma node: 343:23891
 * Shows the project in 5 clear phases from kick-off to launch
 */

export const ProjektablaufSlide: React.FC = () => {
  const { projektablauf, updatePhaseDate, projektablaufNotizen, updateProjektablaufNotizen } = useKickoffStore();

  // Always set kickoff date to today
  const todayFormatted = useMemo(() => {
    const now = new Date();
    const dd = String(now.getDate()).padStart(2, '0');
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const yyyy = now.getFullYear();
    return `${dd}.${mm}.${yyyy}`;
  }, []);

  useEffect(() => {
    updatePhaseDate('kickoff', todayFormatted);
  }, [todayFormatted, updatePhaseDate]);

  return (
    <div
      className="bg-white flex flex-col items-start justify-between"
      style={{ width: '1920px', height: '1080px', padding: '80px' }}
    >
      {/* Header Section */}
      <div className="flex flex-col" style={{ gap: '32px' }}>
        <h1
          className="font-humane text-black uppercase"
          style={{
            fontSize: '128px',
            lineHeight: '0.75em',
            letterSpacing: '2.56px',
            fontWeight: 700,
          }}
        >
          Projektablauf
        </h1>
        <div className="font-jakarta text-black" style={{ fontSize: '32px', lineHeight: '40px' }}>
          <p style={{ margin: 0 }}>Ihr Projekt in fünf klaren Schritten.</p>
          <p style={{ margin: 0 }}>Vom Kick-off bis zum Launch.</p>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="w-full flex flex-col" style={{ gap: '32px' }}>
        {/* Phase Headers with Date Badges */}
        <div className="flex items-end justify-between" style={{ width: '1760px' }}>
          {projektablauf.map((phase) => {
            const isKickoff = phase.id === 'kickoff';
            return (
            <div
              key={phase.id}
              className="flex flex-col items-start justify-end flex-1"
              style={{ paddingBottom: '4px' }}
            >
              {/* Date Badge - Kickoff is always today, others are editable */}
              <div style={{ marginBottom: '8px', zIndex: 2 }}>
                <span
                  className="font-jakarta"
                  contentEditable={!isKickoff}
                  suppressContentEditableWarning
                  onBlur={isKickoff ? undefined : (e) => {
                    const text = e.currentTarget.textContent || '';
                    // Format as DD.MM.YYYY on blur
                    const digits = text.replace(/\D/g, '').slice(0, 8);
                    let formatted = '';
                    for (let i = 0; i < digits.length; i++) {
                      if (i === 2 || i === 4) formatted += '.';
                      formatted += digits[i];
                    }
                    updatePhaseDate(phase.id, formatted || text);
                    e.currentTarget.textContent = formatted || text;
                  }}
                  onKeyDown={isKickoff ? undefined : (e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      e.currentTarget.blur();
                    }
                  }}
                  style={{
                    display: 'inline-block',
                    transform: 'rotate(-3deg)',
                    transformOrigin: 'left center',
                    backgroundColor: '#ADF803',
                    border: '2px solid white',
                    padding: '8px',
                    fontSize: '24px',
                    fontWeight: 800,
                    color: 'black',
                    fontFeatureSettings: "'lnum', 'pnum'",
                    lineHeight: 1,
                    outline: 'none',
                    whiteSpace: 'nowrap',
                    minWidth: '20px',
                    cursor: isKickoff ? 'default' : 'text',
                  }}
                >
                  {isKickoff ? todayFormatted : (phase.date || 'XX.XX.XXXX')}
                </span>
              </div>
              {/* Phase Name */}
              <div
                className="font-humane text-black uppercase"
                style={{
                  paddingLeft: '32px',
                  fontSize: '72px',
                  lineHeight: '0.75em',
                  letterSpacing: '0.72px',
                  fontWeight: 800,
                }}
              >
                {phase.title}
              </div>
            </div>
            );
          })}
        </div>

        {/* Timeline Progress Bar */}
        <div className="flex items-center w-full" style={{ paddingLeft: '32px' }}>
          {projektablauf.map((phase, index) => (
            <React.Fragment key={phase.id}>
              {/* Black square marker */}
              <div style={{ width: '32px', height: '32px', backgroundColor: 'black', flexShrink: 0 }} />
              {/* Connecting line */}
              {index < projektablauf.length - 1 ? (
                <div style={{ width: '320px', height: '2px', backgroundColor: 'black' }} />
              ) : (
                /* Last line with fade to right */
                <div
                  className="flex-1"
                  style={{
                    height: '2px',
                    background: 'linear-gradient(to right, black, transparent)',
                  }}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Phase Descriptions */}
        <div
          className="flex items-start w-full font-jakarta text-black"
          style={{ paddingLeft: '32px', fontSize: '24px' }}
        >
          {projektablauf.map((phase, index) => (
            <div
              key={phase.id}
              className={index < projektablauf.length - 1 ? '' : 'flex-1'}
              style={{ width: index < projektablauf.length - 1 ? '352px' : undefined }}
            >
              <p style={{ margin: 0 }}>{phase.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Notes Section */}
      <div
        className="w-full font-jakarta text-black"
        style={{
          border: '2px solid black',
          padding: '24px',
          height: '104px',
          fontSize: '18px',
        }}
      >
        <textarea
          value={projektablaufNotizen}
          onChange={(e) => updateProjektablaufNotizen(e.target.value)}
          placeholder="Notizen"
          className="w-full h-full font-jakarta text-black bg-transparent resize-none outline-none placeholder:opacity-20 overflow-y-auto overflow-x-hidden"
          style={{ fontSize: '18px' }}
        />
      </div>
    </div>
  );
};

export default ProjektablaufSlide;
