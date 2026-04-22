import React from 'react';
import { useKickoffStore } from '../../state/kickoffStore';

/**
 * Slide 24: Next Steps
 * Based on Figma design
 * Table with fixed Wer/Was, editable Bis wann
 */

const nextStepsData = [
  { wer: 'Agentur', was: 'Protokoll und Zusammenfassung zusenden' },
  { wer: 'Kunde', was: 'Bestehende Materialien und Zugänge bereitstellen' },
  { wer: 'Agentur', was: 'Konzept und Angebot erstellen' },
  { wer: 'Gemeinsam', was: 'Nächster Termin: Konzeptpräsentation' },
];

export const NextStepsSlide: React.FC = () => {
  const { nextSteps, updateNextStep } = useKickoffStore();

  return (
    <div
      className="bg-white flex flex-col justify-between"
      style={{ width: '1920px', height: '1080px', padding: '80px' }}
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
      <div className="flex flex-col">
        <div
          className="flex flex-col w-full"
          style={{
            backgroundColor: '#F7F7F7',
            padding: '56px',
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
            <span className="flex-1">Bis wann</span>
          </div>
          <div className="line-separator" />

          {/* Table Rows - fixed Wer/Was, editable date */}
          {nextStepsData.map((row, index) => {
            const storeRow = nextSteps[index];
            return (
              <React.Fragment key={index}>
                <div
                  className="flex items-center font-jakarta text-black"
                  style={{ gap: '120px', fontSize: '24px' }}
                >
                  <span className="flex-1">{row.wer}</span>
                  <span className="flex-1">{row.was}</span>
                  <div className="flex-1 overflow-hidden">
                    {storeRow && (
                      <input
                        type="date"
                        value={storeRow.naechsteAktion}
                        onChange={(e) => updateNextStep(storeRow.id, { naechsteAktion: e.target.value })}
                        className="w-full bg-transparent outline-none font-jakarta text-black"
                        style={{ fontSize: '24px' }}
                      />
                    )}
                  </div>
                </div>
                {index < nextStepsData.length - 1 && <div className="line-separator" />}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default NextStepsSlide;
