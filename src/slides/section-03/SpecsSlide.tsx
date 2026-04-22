import React from 'react';
import { Badge } from '../../components/ui';

/**
 * Slide 18: Specs
 * Based on Figma design
 * Technical specifications with leitfragen
 */
export const SpecsSlide: React.FC = () => {
  const questions = [
    'Gibt es ein bestehendes Hosting oder sollen wir eines empfehlen?',
    'Welches CMS soll verwendet werden? (WordPress, Headless, Custom)',
    'Gibt es technische Schnittstellen, die angebunden werden müssen?',
    'Wie sieht der zeitliche Rahmen für das Projekt aus?',
    'Gibt es ein festgelegtes Budget?',
  ];

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
          Technische Specs
        </h1>
        <p className="font-jakarta text-black" style={{ fontSize: '32px', lineHeight: '40px' }}>
          Technische Anforderungen und Rahmenbedingungen für das Projekt.
        </p>
      </div>

      {/* Questions Card */}
      <div className="flex flex-col relative" style={{ paddingBottom: '56px' }}>
        <div style={{ position: 'absolute', top: '-50px', left: '24px', zIndex: 2 }}>
          <Badge variant="primary" size="md">
            Leitfragen
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
          {questions.map((q, index) => (
            <React.Fragment key={index}>
              <p className="font-jakarta text-black" style={{ fontSize: '24px' }}>
                {q}
              </p>
              {index < questions.length - 1 && <div className="line-separator" />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpecsSlide;
