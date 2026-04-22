import React, { useState } from 'react';
import { Badge } from '../../components/ui';
import { Check } from 'lucide-react';

/**
 * Slide 16: Features
 * Based on Figma node: 343:23756
 * Checkbox grid for required features
 */
export const FeaturesSlide: React.FC = () => {
  // Track checked state for each feature
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({});

  const toggleCheck = (key: string) => {
    setCheckedItems(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // Feature categories per Figma design
  const featureCategories = [
    {
      name: 'Funktionen',
      features: ['Online Shop', 'Buchungssystem', 'Kundenportal', 'Mehrsprachigkeit', 'Suche'],
    },
    {
      name: 'Integrationen',
      features: ['Newsletter', 'Social Media', 'CRM', 'Zahlungsanbieter', 'Analytics'],
    },
    {
      name: 'Content',
      features: ['Blog', 'News', 'FAQ', 'Testimonials', 'Portfolio'],
    },
    {
      name: 'Weitere',
      features: ['Kontaktformular', 'Live Chat', 'Karriereseite', 'Downloads', 'Kalender'],
    },
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
          Features
        </h1>
        <p className="font-jakarta text-black" style={{ fontSize: '32px', lineHeight: '40px' }}>
          Welche Funktionen soll die Website haben?
        </p>
      </div>

      {/* Features Grid - 4 columns per Figma */}
      <div className="flex" style={{ gap: '32px' }}>
        {featureCategories.map((category) => (
          <div key={category.name} className="flex-1 flex flex-col relative" style={{ paddingBottom: '56px' }}>
            <div style={{ position: 'absolute', top: '-50px', left: '24px', zIndex: 2 }}>
              <Badge variant="primary" size="md">
                {category.name}
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
              {category.features.map((feature, index) => {
                const key = `${category.name}-${feature}`;
                const isChecked = checkedItems[key] || false;
                return (
                  <React.Fragment key={feature}>
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
                          borderRadius: '4px',
                          backgroundColor: isChecked ? 'black' : 'transparent',
                          flexShrink: 0,
                        }}
                      >
                        {isChecked && <Check size={16} strokeWidth={3} color="white" />}
                      </div>
                      <p className="font-jakarta text-black" style={{ fontSize: '24px' }}>
                        {feature}
                      </p>
                    </button>
                    {index < category.features.length - 1 && <div className="line-separator" />}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesSlide;
