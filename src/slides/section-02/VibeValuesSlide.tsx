import React from 'react';
import { useKickoffStore } from '../../state/kickoffStore';
import { Badge, TextArea } from '../../components/ui';

/**
 * Slide 10: Vibe & Values Slide
 * Based on Figma node: 343:23498 "Vibe & Values"
 * Multi-select tags for brand vibe + toggle switches for values
 */
export const VibeValuesSlide: React.FC = () => {
  const { vibeValues, toggleVibeTag, updateVibeValues } = useKickoffStore();

  // Vibe tags per Figma design
  const vibeTags = [
    'Modern', 'Traditionell', 'Innovativ', 'Zuverlässig', 'Kreativ',
    'Professionell', 'Freundlich', 'Premium', 'Zugänglich', 'Mutig',
    'Seriös', 'Verspielt', 'Luxuriös', 'Natürlich'
  ];

  const handleToggleChange = (
    key: 'formality' | 'emotion' | 'intensity',
    value: 'left' | 'right'
  ) => {
    updateVibeValues({
      toggles: {
        ...vibeValues.toggles,
        [key]: value,
      },
    });
  };

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
          Vibe & Values
        </h1>
        <p className="font-jakarta text-black" style={{ fontSize: '32px', lineHeight: '40px' }}>
          <span className="block">„Duzen oder Siezen Sie Ihre Kunden? Wie soll die Marke klingen?</span>
          <span className="block">Gibt es Begriffe oder Formulierungen, die auf keinen Fall vorkommen dürfen?"</span>
        </p>
      </div>

      {/* Content - 80px gap per Figma */}
      <div className="flex" style={{ gap: '80px', height: '407px' }}>
        {/* Left: Vibe Tags */}
        <div className="flex-1 flex flex-col relative h-full" style={{ paddingBottom: '56px' }}>
          <div style={{ position: 'absolute', top: '-50px', left: '24px', zIndex: 2 }}>
            <Badge variant="primary" size="md">
              Vibe
            </Badge>
          </div>

          <div
            className="flex flex-wrap content-center items-center flex-1"
            style={{
              backgroundColor: '#F7F7F7',
              padding: '56px',
              paddingTop: '120px',
              marginBottom: '-56px',
              zIndex: 1,
              gap: '32px',
            }}
          >
            {vibeTags.map((tag) => {
              const isSelected = vibeValues.selectedTags.includes(tag);
              return (
                <button
                  key={tag}
                  onClick={() => toggleVibeTag(tag)}
                  className="font-jakarta font-bold text-black"
                  style={{
                    fontSize: '24px',
                    padding: '16px',
                    border: '2px solid black',
                    backgroundColor: 'transparent',
                    opacity: isSelected ? 1 : 0.2,
                    cursor: 'pointer',
                  }}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Values Toggles */}
        <div className="flex flex-col relative h-full" style={{ paddingBottom: '56px' }}>
          <div style={{ position: 'absolute', top: '-50px', left: '24px', zIndex: 2 }}>
            <Badge variant="primary" size="md">
              Values
            </Badge>
          </div>

          <div
            className="flex flex-col justify-center"
            style={{
              backgroundColor: '#F7F7F7',
              padding: '56px',
              paddingTop: '120px',
              marginBottom: '-56px',
              zIndex: 1,
              gap: '32px',
            }}
          >
            {/* Toggle: Förmlich / Locker */}
            <button
              onClick={() => handleToggleChange('formality', vibeValues.toggles.formality === 'left' ? 'right' : 'left')}
              className="flex items-center justify-between"
              style={{ border: '2px solid black', height: '50px', width: '314px', padding: '8px' }}
            >
              <div
                className="flex items-center h-full font-jakarta font-bold"
                style={{
                  fontSize: '24px',
                  padding: '12px',
                  backgroundColor: vibeValues.toggles.formality === 'left' ? 'black' : 'transparent',
                  color: vibeValues.toggles.formality === 'left' ? 'white' : 'black',
                }}
              >
                Förmlich
              </div>
              <div
                className="flex items-center h-full font-jakarta font-bold"
                style={{
                  fontSize: '24px',
                  padding: '12px',
                  backgroundColor: vibeValues.toggles.formality === 'right' ? 'black' : 'transparent',
                  color: vibeValues.toggles.formality === 'right' ? 'white' : 'black',
                }}
              >
                Locker
              </div>
            </button>

            {/* Toggle: Sachlich / Emotional */}
            <button
              onClick={() => handleToggleChange('emotion', vibeValues.toggles.emotion === 'left' ? 'right' : 'left')}
              className="flex items-center justify-between"
              style={{ border: '2px solid black', height: '50px', width: '314px', padding: '8px' }}
            >
              <div
                className="flex items-center h-full font-jakarta font-bold"
                style={{
                  fontSize: '24px',
                  padding: '12px',
                  backgroundColor: vibeValues.toggles.emotion === 'left' ? 'black' : 'transparent',
                  color: vibeValues.toggles.emotion === 'left' ? 'white' : 'black',
                }}
              >
                Sachlich
              </div>
              <div
                className="flex items-center h-full font-jakarta font-bold"
                style={{
                  fontSize: '24px',
                  padding: '12px',
                  backgroundColor: vibeValues.toggles.emotion === 'right' ? 'black' : 'transparent',
                  color: vibeValues.toggles.emotion === 'right' ? 'white' : 'black',
                }}
              >
                Emotional
              </div>
            </button>

            {/* Toggle: Dezent / Auffällig */}
            <button
              onClick={() => handleToggleChange('intensity', vibeValues.toggles.intensity === 'left' ? 'right' : 'left')}
              className="flex items-center justify-between"
              style={{ border: '2px solid black', height: '50px', width: '314px', padding: '8px' }}
            >
              <div
                className="flex items-center h-full font-jakarta font-bold"
                style={{
                  fontSize: '24px',
                  padding: '12px',
                  backgroundColor: vibeValues.toggles.intensity === 'left' ? 'black' : 'transparent',
                  color: vibeValues.toggles.intensity === 'left' ? 'white' : 'black',
                }}
              >
                Dezent
              </div>
              <div
                className="flex items-center h-full font-jakarta font-bold"
                style={{
                  fontSize: '24px',
                  padding: '12px',
                  backgroundColor: vibeValues.toggles.intensity === 'right' ? 'black' : 'transparent',
                  color: vibeValues.toggles.intensity === 'right' ? 'white' : 'black',
                }}
              >
                Auffällig
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Notes - per Figma: 2px black border, 24px padding, 104px height */}
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
            value={vibeValues.notizen}
            onChange={(v) => updateVibeValues({ notizen: v })}
            placeholder="Notizen"
            className="font-jakarta text-black w-full h-full placeholder:opacity-20 text-lg"
            variant="notes"
          />
        </div>
      </div>
    </div>
  );
};

export default VibeValuesSlide;
