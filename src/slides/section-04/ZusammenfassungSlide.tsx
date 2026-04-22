import React, { useMemo } from 'react';
import { useKickoffStore } from '../../state/kickoffStore';
import { Badge } from '../../components/ui';

/** Build a labeled section — returns empty string if content is blank */
const section = (label: string, text: string): string =>
  text.trim() ? `${label}:\n${text.trim()}` : '';

/**
 * Slide 22: Zusammenfassung
 * Auto-fills from ALL relevant structured data + notes across previous slides
 */
export const ZusammenfassungSlide: React.FC = () => {
  // Read-only — no store writes needed
  const istSoll = useKickoffStore((s) => s.istSoll);
  const vibeValues = useKickoffStore((s) => s.vibeValues);
  const websiteZiele = useKickoffStore((s) => s.websiteZiele);
  const content = useKickoffStore((s) => s.content);
  const projektablaufNotizen = useKickoffStore((s) => s.projektablaufNotizen);
  const aktuellesDesign = useKickoffStore((s) => s.aktuellesDesign);
  const likeDislike = useKickoffStore((s) => s.likeDislike);
  const features = useKickoffStore((s) => s.features);
  const istStatus = useKickoffStore((s) => s.istStatus);
  const specs = useKickoffStore((s) => s.specs);

  // ── Spalte 1: Projektziele ──
  const autoFillProjektziele = useMemo(() => {
    const prioritized = websiteZiele.goals
      .filter((g) => g.priority !== null)
      .sort((a, b) => a.priority! - b.priority!)
      .map((g) => `${g.priority}. ${g.label}`)
      .join('\n');

    return [
      section('Prioritäten', prioritized),
      section('Ziele', istSoll.sollZiele),
      section('Erwartungen', istSoll.sollErwartungen),
      section('Notizen', [websiteZiele.notizen, istSoll.notizen].filter(Boolean).join('\n')),
    ]
      .filter(Boolean)
      .join('\n\n');
  }, [websiteZiele.goals, websiteZiele.notizen, istSoll.sollZiele, istSoll.sollErwartungen, istSoll.notizen]);

  // ── Spalte 2: Marken-Kernaussagen ──
  const autoFillMarken = useMemo(() => {
    const tags = vibeValues.selectedTags.join(', ');

    const toggleLabels: Record<string, { left: string; right: string }> = {
      formality: { left: 'Förmlich', right: 'Locker' },
      emotion: { left: 'Sachlich', right: 'Emotional' },
      intensity: { left: 'Dezent', right: 'Auffällig' },
    };
    const stil = Object.entries(vibeValues.toggles)
      .map(([key, val]) => toggleLabels[key]?.[val] ?? '')
      .filter(Boolean)
      .join(', ');

    return [
      section('Vibe', tags),
      section('Stil', stil),
      section('Farben', aktuellesDesign.markenfarben),
      section('Gefällt', likeDislike.likes),
      section('Gefällt nicht', likeDislike.dislikes),
      section('Notizen', [vibeValues.notizen, aktuellesDesign.designNotizen].filter(Boolean).join('\n')),
    ]
      .filter(Boolean)
      .join('\n\n');
  }, [
    vibeValues.selectedTags, vibeValues.toggles, vibeValues.notizen,
    aktuellesDesign.markenfarben, aktuellesDesign.designNotizen,
    likeDislike.likes, likeDislike.dislikes,
  ]);

  // ── Spalte 3: Wichtige Anforderungen ──
  const autoFillAnforderungen = useMemo(() => {
    const checkedFeatures = features
      .flatMap((cat) => cat.features.filter((f) => f.checked).map((f) => f.label))
      .join(', ');

    const painPointLabels: Record<string, string> = {
      designVeraltet: 'Design veraltet',
      schwerZuPflegen: 'Schwer zu pflegen',
      nichtMobilOptimiert: 'Nicht mobil-optimiert',
      langsam: 'Schlechte Performance',
      keineAnalytics: 'Keine Anfragen',
    };
    const painPoints = Object.entries(istStatus.painPoints)
      .filter(([, v]) => v)
      .map(([k]) => painPointLabels[k] ?? k)
      .join(', ');

    return [
      section('Features', checkedFeatures),
      section('Pain Points', painPoints),
      section('Budget', specs.budget),
      section('Timeline', specs.timeline),
      section('CMS', specs.cms),
      section('Notizen', [content.notizen, projektablaufNotizen].filter(Boolean).join('\n')),
    ]
      .filter(Boolean)
      .join('\n\n');
  }, [features, istStatus.painPoints, specs.budget, specs.timeline, specs.cms, content.notizen, projektablaufNotizen]);

  /** Pick font size based on content length so text never overflows */
  const fontSize = (text: string): number => {
    const len = text.length;
    if (len > 1000) return 16;
    if (len > 700) return 18;
    if (len > 400) return 20;
    return 24;
  };

  const columns = [
    { title: 'Projektziele', content: autoFillProjektziele },
    { title: 'Marken-Kernaussagen', content: autoFillMarken },
    { title: 'Wichtige Anforderungen', content: autoFillAnforderungen },
  ];

  return (
    <div
      className="bg-white flex flex-col"
      style={{ width: '1920px', height: '1080px', padding: '80px', gap: '80px' }}
    >
      {/* Header */}
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
          <div key={col.title} className="flex-1 flex flex-col relative">
            <div style={{ position: 'absolute', top: '-50px', left: '24px', zIndex: 2 }}>
              <Badge variant="primary" size="md">
                {col.title}
              </Badge>
            </div>

            <div
              className="flex flex-col flex-1 overflow-hidden"
              style={{
                backgroundColor: '#F7F7F7',
                padding: '56px',
                paddingTop: '100px',
              }}
            >
              <p
                className="font-jakarta text-black whitespace-pre-wrap"
                style={{
                  fontSize: `${fontSize(col.content)}px`,
                  lineHeight: 1.4,
                  opacity: col.content ? 1 : 0.2,
                }}
              >
                {col.content || 'Keine Daten vorhanden'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ZusammenfassungSlide;
