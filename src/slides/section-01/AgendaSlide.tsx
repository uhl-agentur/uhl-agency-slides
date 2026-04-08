import React from 'react';
import { useKickoffStore } from '../../state/kickoffStore';

/**
 * Slide 2: Agenda Slide
 * Interactive agenda with clickable sections that jump to that section
 */
export const AgendaSlide: React.FC = () => {
  const { sections, goToSlide } = useKickoffStore();

  // Calculate slide indices for each section start
  const getSectionStartIndex = (sectionIndex: number): number => {
    let index = 0;
    for (let i = 0; i < sectionIndex; i++) {
      const section = sections[i];
      if (section.enabled) {
        index += section.slides.filter(s => s.enabled).length;
      }
    }
    return index;
  };

  // Get only enabled sections
  const enabledSections = sections.filter(s => s.enabled);

  // Section durations (approximate)
  const durations = ['30 Min', '30 Min', '45 Min', '20 Min', '10 Min'];

  return (
    <div
      className="bg-white flex flex-col items-start justify-between"
      style={{ width: '1920px', height: '1080px', padding: '80px' }}
    >
      {/* Title */}
      <h1
        className="font-humane text-black uppercase"
        style={{
          fontSize: '128px',
          lineHeight: '0.75em',
          letterSpacing: '2.56px',
        }}
      >
        Agenda
      </h1>

      {/* Agenda Items Card - Figma: #F7F7F7 background, 56px padding, 32px gap */}
      <div
        className="w-full flex flex-col"
        style={{ backgroundColor: '#F7F7F7', padding: '56px', gap: '32px' }}
      >
        {enabledSections.map((section, index) => {
          const sectionStartIndex = getSectionStartIndex(
            sections.findIndex(s => s.id === section.id)
          );
          const displayNumber = String(index + 1).padStart(2, '0');

          return (
            <React.Fragment key={section.id}>
              {/* Agenda Row */}
              <button
                onClick={() => goToSlide(sectionStartIndex + 2)} // +2 to skip title and agenda
                className="flex items-center w-full text-left hover:opacity-70 transition-opacity"
                style={{ gap: '240px' }}
              >
                {/* Number */}
                <span
                  className="font-jakarta font-extrabold uppercase"
                  style={{ fontSize: '32px', width: '60px' }}
                >
                  {displayNumber}
                </span>

                {/* Title */}
                <div
                  className="flex-1 font-jakarta font-extrabold"
                  style={{ fontSize: '32px' }}
                >
                  {section.name.split(' & ').map((part, i) => (
                    <span key={i} className="block">
                      {i > 0 && '& '}
                      {part}
                    </span>
                  ))}
                </div>

                {/* Duration */}
                <span
                  className="flex-1 font-jakarta"
                  style={{ fontSize: '32px' }}
                >
                  {durations[sections.findIndex(s => s.id === section.id)] || '30 Min'}
                </span>
              </button>

              {/* Separator line (except last) */}
              {index < enabledSections.length - 1 && (
                <div className="line-separator" />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default AgendaSlide;
