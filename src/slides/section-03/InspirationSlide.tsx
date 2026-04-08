import React from 'react';
import { Badge } from '../../components/ui';
import { useKickoffStore } from '../../state/kickoffStore';

/**
 * Slide 15: Inspiration
 * Based on Figma node: 343:23621
 * Table of inspiring websites with URL + Was gefällt columns
 */
export const InspirationSlide: React.FC = () => {
  const { inspiration, updateInspiration } = useKickoffStore();

  return (
    <div
      className="bg-white flex flex-col"
      style={{ width: '1920px', height: '1080px', padding: '80px', gap: '80px' }}
    >
      {/* Header - 32px gap per Figma */}
      <div className="flex flex-col" style={{ gap: '32px' }}>
        <h1
          className="font-humane text-black uppercase"
          style={{
            fontSize: '128px',
            lineHeight: '0.75em',
            letterSpacing: '2.56px',
          }}
        >
          Inspiration
        </h1>
        <p className="font-jakarta text-black" style={{ fontSize: '32px', lineHeight: '40px' }}>
          Welche Websites gefallen Ihnen? Was gefällt Ihnen daran?
        </p>
      </div>

      {/* Content Card */}
      <div className="flex-1 flex flex-col relative" style={{ paddingBottom: '56px' }}>
        <div style={{ position: 'absolute', top: '-50px', left: '24px', zIndex: 2 }}>
          <Badge variant="primary" size="md">
            Inspirierende Websites
          </Badge>
        </div>

        <div
          className="flex flex-col flex-1"
          style={{
            backgroundColor: '#F7F7F7',
            padding: '56px',
            paddingTop: '120px',
            marginBottom: '-56px',
            zIndex: 1,
            gap: '32px',
          }}
        >
          {inspiration.map((row, index) => (
            <React.Fragment key={row.id}>
              <div className="flex w-full overflow-hidden" style={{ gap: '32px' }}>
                {/* URL Column */}
                <div className="flex flex-1 min-w-0 items-start" style={{ gap: '32px' }}>
                  <p className="font-jakarta font-bold text-black flex-shrink-0" style={{ fontSize: '24px' }}>
                    URL:
                  </p>
                  <div className="flex-1 min-w-0 overflow-hidden">
                    <input
                      type="text"
                      value={row.url}
                      onChange={(e) => updateInspiration(row.id, { url: e.target.value })}
                      placeholder="www.webseite.de"
                      className="w-full bg-transparent outline-none font-jakarta text-black placeholder:opacity-20"
                      style={{ fontSize: '24px' }}
                    />
                  </div>
                </div>
                {/* Description Column */}
                <div className="flex flex-1 min-w-0 items-start" style={{ gap: '32px' }}>
                  <p className="font-jakarta font-bold text-black flex-shrink-0" style={{ fontSize: '24px' }}>
                    Was gefällt:
                  </p>
                  <div className="flex-1 min-w-0 overflow-hidden">
                    <input
                      type="text"
                      value={row.description}
                      onChange={(e) => updateInspiration(row.id, { description: e.target.value })}
                      placeholder="Lorem ipsum dolor sit amet, consetetur sadipscing elitr..."
                      className="w-full bg-transparent outline-none font-jakarta text-black placeholder:opacity-20"
                      style={{ fontSize: '24px' }}
                    />
                  </div>
                </div>
              </div>
              {index < inspiration.length - 1 && <div className="line-separator" />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default InspirationSlide;
