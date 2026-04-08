import React from 'react';
import { useKickoffStore } from '../../state/kickoffStore';
import { Badge, TextArea } from '../../components/ui';

/**
 * Slide 25: Offene Fragen
 * Based on Figma design
 * Large area for open questions with notes placeholder
 */
export const OffeneFragenSlide: React.FC = () => {
  const { offeneFragen, updateOffeneFragen } = useKickoffStore();

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
          Offene Fragen
        </h1>
        <p className="font-jakarta text-black" style={{ fontSize: '32px', lineHeight: '40px' }}>
          Gibt es noch Fragen, die wir klären sollten?
        </p>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col relative" style={{ paddingBottom: '56px' }}>
        <div style={{ position: 'absolute', top: '-50px', left: '24px', zIndex: 2 }}>
          <Badge variant="primary" size="md">
            Noch zu klären
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
          <div className="w-full flex-1 overflow-hidden">
            <TextArea
              value={offeneFragen.fragen}
              onChange={(v) => updateOffeneFragen({ fragen: v })}
              placeholder="Notizen"
              className="font-jakarta text-black w-full h-full placeholder:opacity-20 text-2xl"
              variant="notes"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OffeneFragenSlide;
