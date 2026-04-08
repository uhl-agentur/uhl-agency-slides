import React from 'react';
import { Badge } from '../../components/ui';
import { useKickoffStore } from '../../state/kickoffStore';

/**
 * Slide 24: Next Steps
 * Based on Figma design
 * Table with action items - Wer, Was, Nächste Aktion
 */
export const NextStepsSlide: React.FC = () => {
  const { nextSteps, updateNextStep } = useKickoffStore();

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
          Next Steps
        </h1>
        <p className="font-jakarta text-black" style={{ fontSize: '32px', lineHeight: '40px' }}>
          Konkrete nächste Schritte und Verantwortlichkeiten.
        </p>
      </div>

      {/* Table Card */}
      <div className="flex-1 flex flex-col relative" style={{ paddingBottom: '56px' }}>
        <div style={{ position: 'absolute', top: '-50px', left: '24px', zIndex: 2 }}>
          <Badge variant="primary" size="md">
            Aktionspunkte
          </Badge>
        </div>

        <div
          className="flex flex-col flex-1 w-full"
          style={{
            backgroundColor: '#F7F7F7',
            padding: '56px',
            paddingTop: '120px',
            marginBottom: '-56px',
            zIndex: 1,
            gap: '32px',
          }}
        >
          {/* Table Header */}
          <div
            className="flex items-center font-jakarta font-extrabold text-black"
            style={{ gap: '120px', fontSize: '32px' }}
          >
            <span className="flex-1">Wer</span>
            <span className="flex-1">Was</span>
            <span className="flex-1">Nächste Aktion</span>
          </div>
          <div className="line-separator" />

          {/* Table Rows - editable inputs */}
          {nextSteps.map((row) => (
            <div
              key={row.id}
              className="flex items-center font-jakarta text-black"
              style={{ gap: '120px', fontSize: '24px' }}
            >
              <div className="flex-1 overflow-hidden">
                <input
                  type="text"
                  value={row.wer}
                  onChange={(e) => updateNextStep(row.id, { wer: e.target.value })}
                  placeholder="Kunde / UHL"
                  className="w-full bg-transparent outline-none font-jakarta text-black placeholder:opacity-20"
                  style={{ fontSize: '24px' }}
                />
              </div>
              <div className="flex-1 overflow-hidden">
                <input
                  type="text"
                  value={row.was}
                  onChange={(e) => updateNextStep(row.id, { was: e.target.value })}
                  placeholder="Lorem ipsum dolor sit amet"
                  className="w-full bg-transparent outline-none font-jakarta text-black placeholder:opacity-20"
                  style={{ fontSize: '24px' }}
                />
              </div>
              <div className="flex-1 overflow-hidden">
                <input
                  type="text"
                  value={row.naechsteAktion}
                  onChange={(e) => updateNextStep(row.id, { naechsteAktion: e.target.value })}
                  placeholder="Lorem ipsum dolor sit amet"
                  className="w-full bg-transparent outline-none font-jakarta text-black placeholder:opacity-20"
                  style={{ fontSize: '24px' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NextStepsSlide;
