import React from 'react';
import { useVariables } from '../../hooks/useVariables';
import { Badge } from '../../components/ui';

/**
 * Slide 4: Unternehmen/Company Slide
 * Based on Figma node: 343:23346 "Kunde xyz"
 * 5 guided questions about the client's company
 */
export const UnternehmenSlide: React.FC = () => {
  const { kundenname } = useVariables();

  const questions = [
    'Ihr Unternehmen in zwei Sätzen? (Elevator Pitch)',
    'Was machen Sie besser als der Wettbewerb und warum kaufen Kunden bei Ihnen?',
    'Agieren Sie lokal, national oder international?',
    'Was ist Ihr „Bestseller" und was soll der Fokus der neuen Website sein?',
    'Wer gibt Freigaben, wer ist Ansprechpartner und wer Kontaktperson auf der Website?',
  ];

  return (
    <div
      className="bg-white flex flex-col justify-between"
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
          {kundenname}
        </h1>
        <p
          className="font-jakarta text-black"
          style={{ fontSize: '32px', lineHeight: '40px', width: '674px' }}
        >
          Wir möchten Sie und Ihr Geschäft verstehen, um die beste Lösung zu entwickeln.
        </p>
      </div>

      {/* Questions Card with Badge */}
      <div className="flex flex-col relative" style={{ paddingBottom: '56px', marginTop: '40px' }}>
        {/* Badge - positioned above card */}
        <div style={{ position: 'absolute', top: '-50px', left: '24px', zIndex: 2 }}>
          <Badge variant="primary" size="md">
            Leitfragen
          </Badge>
        </div>

        {/* Card with questions */}
        <div
          style={{
            backgroundColor: '#F7F7F7',
            padding: '56px',
            paddingTop: '120px',
            marginBottom: '-56px',
            zIndex: 1,
          }}
        >
          <div className="flex flex-col" style={{ gap: '32px' }}>
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
    </div>
  );
};

export default UnternehmenSlide;
