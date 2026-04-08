import React from 'react';
import { useKickoffStore } from '../../state/kickoffStore';
import { Badge, TextArea } from '../../components/ui';

/**
 * Slide 7: Ist & Soll (Current vs Target State) Slide
 * Based on Figma node: 343:23439 "Ist & Soll"
 * Dual layout with IST (current) on left and SOLL (target) on right
 */
export const IstSollSlide: React.FC = () => {
  const { istSoll, updateIstSoll } = useKickoffStore();

  const istQuestions = [
    'Was läuft aktuell nicht optimal?',
    'Wo verlieren Sie Kunden?',
    'Was frustriert Sie am meisten?',
  ];

  const sollQuestions = [
    'Wo sehen Sie Ihr Unternehmen?',
    'Welche Ziele möchten Sie erreichen?',
    'Wie soll Ihre Marke wahrgenommen werden?',
  ];

  return (
    <div
      className="bg-white flex flex-col items-start justify-between"
      style={{ width: '1920px', height: '1080px', padding: '80px' }}
    >
      {/* Header - 32px gap between title and subtitle per Figma */}
      <div className="flex flex-col" style={{ gap: '32px' }}>
        <h1
          className="font-humane text-black uppercase"
          style={{
            fontSize: '128px',
            lineHeight: '0.75em',
            letterSpacing: '2.56px',
          }}
        >
          Ist & Soll
        </h1>
        <p className="font-jakarta text-black" style={{ fontSize: '32px', lineHeight: '40px' }}>
          <span className="block">Was ist das primäre Ziel der neuen Website?</span>
          <span className="block">(z. B. Mehr Leads, Mitarbeitergewinnung, Imageverbesserung)</span>
        </p>
      </div>

      {/* Dual Cards */}
      <div className="flex justify-center" style={{ gap: '80px', width: '100%' }}>
        {/* IST Column */}
        <div className="flex-1 flex flex-col relative" style={{ paddingBottom: '56px' }}>
          <div style={{ position: 'absolute', top: '-50px', left: '24px', zIndex: 2 }}>
            <Badge variant="primary" size="md">
              Ist
            </Badge>
          </div>

          <div
            className="flex flex-col"
            style={{
              backgroundColor: '#F7F7F7',
              padding: '56px',
              paddingTop: '120px',
              marginBottom: '-56px',
              zIndex: 1,
              gap: '32px',
            }}
          >
            {istQuestions.map((q, index) => (
              <React.Fragment key={index}>
                <p className="font-jakarta text-black" style={{ fontSize: '24px' }}>{q}</p>
                {index < istQuestions.length - 1 && <div className="line-separator" />}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* SOLL Column */}
        <div className="flex-1 flex flex-col relative" style={{ paddingBottom: '56px' }}>
          <div style={{ position: 'absolute', top: '-50px', left: '24px', zIndex: 2 }}>
            <Badge variant="primary" size="md">
              Soll
            </Badge>
          </div>

          <div
            className="flex flex-col"
            style={{
              backgroundColor: '#F7F7F7',
              padding: '56px',
              paddingTop: '120px',
              marginBottom: '-56px',
              zIndex: 1,
              gap: '32px',
            }}
          >
            {sollQuestions.map((q, index) => (
              <React.Fragment key={index}>
                <p className="font-jakarta text-black" style={{ fontSize: '24px' }}>{q}</p>
                {index < sollQuestions.length - 1 && <div className="line-separator" />}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* Notes Field - per Figma: border 2px black, padding 24px, height 104px */}
      <div
        className="w-full"
        style={{
          border: '2px solid black',
          padding: '24px',
          height: '104px',
        }}
      >
        <div className="w-full h-full overflow-hidden">
          <TextArea
            value={istSoll.notizen}
            onChange={(v) => updateIstSoll({ notizen: v })}
            placeholder="Notizen"
            className="font-jakarta text-black w-full h-full placeholder:opacity-20 text-lg"
            variant="notes"
          />
        </div>
      </div>
    </div>
  );
};

export default IstSollSlide;
