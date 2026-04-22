import React from 'react';
import { Badge } from '../../components/ui';

/**
 * Slide 21: Kommunikation
 * Based on Figma node: 343:23928
 * Communication and contact information
 */
export const KommunikationSlide: React.FC = () => {
  const questions = [
    'Wer ist Ihr Hauptansprechpartner für dieses Projekt?',
    'Über welchen Kanal möchten Sie am liebsten kommunizieren?',
    'Wie schnell können Sie auf Anfragen reagieren?',
    'Gibt es regelmäßige Termine, die wir berücksichtigen sollten?',
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
          Kommunikation
        </h1>
        <p className="font-jakarta text-black" style={{ fontSize: '32px', lineHeight: '40px' }}>
          Wie bleiben wir während des Projekts in Kontakt?
        </p>
      </div>

      {/* Leitfragen Card */}
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

export default KommunikationSlide;
