import React from 'react';
import { Badge } from '../../components/ui';

/**
 * Slide 5: Zielgruppe (Target Audience) Slide
 * Based on Figma design
 * Leitfragen for target audience
 */
export const ZielgruppeSlide: React.FC = () => {
  const questions = [
    'Sind Sie im B2B- oder B2C-Bereich tätig?',
    'Beschreiben Sie Ihren idealen Kunden\n(Branche, Alter, Position, etc.).',
    'Welches konkrete Problem lösen Sie für Ihre Kunden?\n(Was lässt Ihren Kunden nachts nicht schlafen?)',
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
          Zielgruppe
        </h1>
        <p className="font-jakarta text-black" style={{ fontSize: '32px', lineHeight: '40px' }}>
          <span className="block">Wen möchten Sie erreichen?</span>
          <span className="block">Wer sind Ihre Wunschkunden?</span>
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
                {q.split('\n').map((line, i) => (
                  <span key={i} className="block">{line}</span>
                ))}
              </p>
              {index < questions.length - 1 && <div className="line-separator" />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ZielgruppeSlide;
