import React from 'react';
import { useKickoffStore } from '../../state/kickoffStore';
import { Badge } from '../../components/ui';

/**
 * Slide 9: Aktuelles Design Slide
 * Based on Figma node: 343:23476 "aktuelles Design"
 * Questions about existing branding + logo display area
 */
export const AktuellesDesignSlide: React.FC = () => {
  const { aktuellesDesign, updateAktuellesDesign } = useKickoffStore();

  const questions = [
    'Gibt es ein existierendes Brandbook, Styleguide, Flyer,\nLogo-Dateien oder Slogans, die wir nutzen müssen?',
    'Welche Farben dominieren Ihr Unternehmen?',
    'Gibt es Farben, die Sie absolut ausschließen?',
  ];

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        updateAktuellesDesign({ logoUpload: event.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className="bg-white flex flex-col"
      style={{ width: '1920px', height: '1080px', padding: '80px', gap: '80px' }}
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
          Aktuelles Design
        </h1>
        <p className="font-jakarta text-black" style={{ fontSize: '32px', lineHeight: '40px', width: '674px' }}>
          <span className="block">Zeigen Sie uns, was bereits existiert.</span>
          <span className="block">Logo, Farben, Schriften, Materialien.</span>
        </p>
      </div>

      {/* Two columns, equal height, no gap */}
      <div className="flex-1 flex items-stretch" style={{ gap: '32px' }}>
        {/* Left: Leitfragen */}
        <div className="flex-1 flex flex-col relative" style={{ backgroundColor: '#F7F7F7' }}>
          <div style={{ position: 'absolute', top: '-50px', left: '24px', zIndex: 2 }}>
            <Badge variant="primary" size="md">
              Leitfragen
            </Badge>
          </div>

          <div
            className="flex flex-col justify-center flex-1"
            style={{ padding: '56px', paddingTop: '80px', gap: '32px' }}
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

        {/* Right: Aktuelles Logo */}
        <div className="flex-1 flex flex-col relative" style={{ backgroundColor: '#F7F7F7' }}>
          <div style={{ position: 'absolute', top: '-50px', left: '24px', zIndex: 2 }}>
            <Badge variant="primary" size="md">
              Aktuelles Logo
            </Badge>
          </div>

          <div
            className="flex flex-col items-center justify-center flex-1"
            style={{ padding: '56px', paddingTop: '80px' }}
          >
            {aktuellesDesign.logoUpload ? (
              <div className="relative">
                <img
                  src={aktuellesDesign.logoUpload}
                  alt="Uploaded Logo"
                  className="max-w-full object-contain"
                  style={{ mixBlendMode: 'darken' }}
                />
                <button
                  onClick={() => updateAktuellesDesign({ logoUpload: null })}
                  className="absolute -top-2 -right-2 w-8 h-8 bg-black text-white rounded-full flex items-center justify-center hover:bg-gray-800"
                >
                  ✕
                </button>
              </div>
            ) : (
              <label className="cursor-pointer flex flex-col items-center gap-4 p-12 border-2 rounded-lg transition-colors" style={{ borderColor: 'rgba(0, 0, 0, 0.08)' }}>
                <span className="font-jakarta text-gray-500 text-center" style={{ fontSize: '24px' }}>
                  Logo hier hochladen
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AktuellesDesignSlide;
