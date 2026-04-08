import React from 'react';
import { useKickoffStore } from '../../state/kickoffStore';
import { Badge } from '../../components/ui';

/**
 * Slide 22: Zusammenfassung
 * Based on Figma node: 343:23977
 * Summary of key project points - three columns with notes
 */
export const ZusammenfassungSlide: React.FC = () => {
  const { zusammenfassung, updateZusammenfassung } = useKickoffStore();

  const columns = [
    { title: 'Projektziele', key: 'projektziele' as const },
    { title: 'Marken-Kernaussagen', key: 'markenKernaussagen' as const },
    { title: 'Wichtige Anforderungen', key: 'wichtigeAnforderungen' as const },
  ];

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
          Zusammenfassung
        </h1>
        <p className="font-jakarta text-black" style={{ fontSize: '32px', lineHeight: '40px' }}>
          Die wichtigsten Punkte aus unserem Gespräch.
        </p>
      </div>

      {/* Three Column Cards */}
      <div className="flex-1 flex" style={{ gap: '32px' }}>
        {columns.map((col) => (
          <div key={col.key} className="flex-1 flex flex-col relative" style={{ paddingBottom: '56px' }}>
            <div style={{ position: 'absolute', top: '-50px', left: '24px', zIndex: 2 }}>
              <Badge variant="primary" size="md">
                {col.title}
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
              }}
            >
              <textarea
                value={zusammenfassung[col.key]}
                onChange={(e) => updateZusammenfassung({ [col.key]: e.target.value })}
                placeholder="Notizen"
                className="w-full h-full font-jakarta text-black bg-transparent resize-none outline-none placeholder:opacity-20"
                style={{ fontSize: '24px', border: 'none' }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ZusammenfassungSlide;
