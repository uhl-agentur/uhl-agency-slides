import React, { useState } from 'react';
import { Badge, TextArea } from '../../components/ui';
import { useKickoffStore } from '../../state/kickoffStore';
import { Check } from 'lucide-react';

/**
 * Slide 17: Content
 * Based on Figma node: 343:23806
 * Checkbox grid for content availability
 */
export const ContentSlide: React.FC = () => {
  const { content, updateContent } = useKickoffStore();

  // Track checked state for each category option
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const toggleCheck = (key: string) => {
    setCheckedItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Content categories per Figma design
  const contentCategories = [
    {
      name: 'Texte',
      options: ['Vorhanden', 'Texter beauftragen', 'Copywriting'],
    },
    {
      name: 'Bilder',
      options: ['Vorhanden', 'Stockfotos', 'Fotoshooting'],
    },
    {
      name: 'Videos',
      options: ['Vorhanden', 'Stockvideos', 'Videoproduktion'],
    },
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
          Content
        </h1>
        <p className="font-jakarta text-black" style={{ fontSize: '32px', lineHeight: '40px' }}>
          Welche Inhalte sind bereits vorhanden? Was muss noch erstellt werden?
        </p>
      </div>

      {/* Content Cards - 3 columns per Figma */}
      <div className="flex-1 flex" style={{ gap: '80px' }}>
        {contentCategories.map((category) => (
          <div key={category.name} className="flex-1 flex flex-col relative" style={{ paddingBottom: '56px' }}>
            <div style={{ position: 'absolute', top: '-50px', left: '24px', zIndex: 2 }}>
              <Badge variant="primary" size="md">
                {category.name}
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
                gap: '32px',
              }}
            >
              {category.options.map((option, index) => {
                const key = `${category.name}-${option}`;
                const isChecked = checkedItems[key] || false;
                return (
                  <React.Fragment key={option}>
                    <button
                      onClick={() => toggleCheck(key)}
                      className="flex items-center cursor-pointer"
                      style={{ gap: '12px' }}
                    >
                      <div
                        className="flex items-center justify-center"
                        style={{
                          width: '24px',
                          height: '24px',
                          border: '2px solid black',
                          backgroundColor: isChecked ? 'black' : 'transparent',
                          flexShrink: 0,
                        }}
                      >
                        {isChecked && <Check size={16} strokeWidth={3} color="white" />}
                      </div>
                      <p className="font-jakarta text-black" style={{ fontSize: '24px' }}>
                        {option}
                      </p>
                    </button>
                    {index < category.options.length - 1 && <div className="line-separator" />}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        ))}
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
        <TextArea
          value={content.notizen}
          onChange={(v) => updateContent({ notizen: v })}
          placeholder="Notizen"
          variant="notes"
          className="font-jakarta text-black w-full h-full"
        />
      </div>
    </div>
  );
};

export default ContentSlide;
