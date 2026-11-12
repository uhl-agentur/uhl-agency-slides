import React from 'react';
import { Bild, BildDaten, Folie, Liste, T } from '../system';
import type { LayoutDef } from '../typen';

/* Group: introduction, team and problem (akoya 07-17).
   Agency take on the reference: same compositions, more air, our type scale. */

const mitte: React.CSSProperties = { display: 'flex', flexDirection: 'column', justifyContent: 'center' };

/* --------------------------------------------------------- einstieg-text --- */
interface EinstiegText {
  label?: string;
  titel: string;
  text?: string;
}

const EinstiegTextFolie: React.FC<EinstiegText> = (p) => (
  <Folie label={p.label}>
    <div className="inhalt" style={mitte}>
      <div className="stapel-l" style={{ maxWidth: 1100 }}>
        <T stil="titel" as="h2" max={64}>
          {p.titel}
        </T>
        <T stil="lead" leise max={170}>
          {p.text}
        </T>
      </div>
    </div>
  </Folie>
);

/* --------------------------------------------------------- einstieg-bild --- */
interface AussageBild {
  label?: string;
  aussage: string;
  bild?: BildDaten;
}

const EinstiegBild: React.FC<AussageBild> = (p) => (
  <Folie label={p.label}>
    {/* full veil of the slide ground: statement in role colours, centred, light and dark */}
    <Bild bild={p.bild} eckig schleier="voll" platzhalter="" unterschrift={false} className="voll" />
    <div className="inhalt" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <T stil="aussage" as="h2" max={84}>
        {p.aussage}
      </T>
    </div>
  </Folie>
);

/* ---------------------------------------------------- einstieg-bild-hoch --- */
interface TextBildHoch {
  label?: string;
  text: string;
  fakten?: string[];
  bild?: BildDaten;
}

const EinstiegBildHoch: React.FC<TextBildHoch> = (p) => (
  <Folie label={p.label}>
    <div className="inhalt" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--s4)' }}>
      <div style={mitte}>
        <div className="stapel-l">
          <T stil="lead" as="h2" max={130}>
            {p.text}
          </T>
          <Liste punkte={p.fakten} stil="body" max={40} className="leise" />
        </div>
      </div>
      <Bild bild={p.bild} platzhalter="Bild hochkant" unterschrift={false} style={{ height: '100%' }} />
    </div>
  </Folie>
);

/* ------------------------------------------- einstieg-bild-satz / -satz-bild --- */
interface SatzBild {
  label?: string;
  satz: string;
  nachsatz?: string;
  bild?: BildDaten;
}

const Satz: React.FC<SatzBild & { rechts?: boolean }> = (p) => (
  <div style={{ textAlign: p.rechts ? 'right' : 'left', display: 'flex', flexDirection: 'column', alignItems: p.rechts ? 'flex-end' : 'flex-start' }}>
    <T stil="titel" as="h2" max={40}>
      {p.satz}
    </T>
    <T stil="titel" leise max={40}>
      {p.nachsatz}
    </T>
  </div>
);

const EinstiegBildSatz: React.FC<SatzBild> = (p) => (
  <Folie label={p.label}>
    <div className="inhalt" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--s4)', alignItems: 'stretch' }}>
      <Bild bild={p.bild} platzhalter="Bild" unterschrift={false} style={{ height: '100%' }} />
      <div style={mitte}>
        <Satz {...p} />
      </div>
    </div>
  </Folie>
);

const EinstiegSatzBild: React.FC<SatzBild> = (p) => (
  <Folie label={p.label}>
    <div className="inhalt" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--s4)', alignItems: 'center' }}>
      <Satz {...p} rechts />
      <Bild bild={p.bild} platzhalter="Bild quer" unterschrift={false} style={{ height: 544 }} />
    </div>
  </Folie>
);

/* ------------------------------------------------------------ team-reihe --- */
interface Mitglied {
  name: string;
  rolle: string;
  bild?: BildDaten;
}
interface TeamReihe {
  label?: string;
  titel: string;
  mitglieder: Mitglied[];
}

const TeamReiheFolie: React.FC<TeamReihe> = (p) => (
  <Folie label={p.label}>
    <div className="inhalt" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 'var(--s3)' }}>
      <T stil="titel" as="h2" max={72} style={{ textAlign: 'center' }}>
        {p.titel}
      </T>
      <ul style={{ display: 'grid', gridTemplateColumns: `repeat(${p.mitglieder.length}, 256px)`, gap: 'var(--gap)', justifyContent: 'center', width: '100%' }}>
        {p.mitglieder.map((m, i) => (
          <li key={i}>
            <Bild bild={m.bild} platzhalter="Porträt" unterschrift={false} style={{ height: 304 }} />
            <div className="stapel-s" style={{ marginTop: 'var(--s2)' }}>
              <T stil="meta" max={28}>
                {m.name}
              </T>
              <T stil="meta" leise max={32}>
                {m.rolle}
              </T>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </Folie>
);

/* ---------------------------------------------------------- problem-text --- */
interface ProblemText {
  label?: string;
  titel: string;
  einleitung?: string;
  punkte?: string[];
}

const ProblemSpalte: React.FC<ProblemText & { titelOben?: boolean }> = (p) => (
  <div style={mitte}>
    <div className="stapel">
      {p.titelOben && (
        <T stil="titel" as="h2" max={36} style={{ marginBottom: 'var(--s3)' }}>
          {p.titel}
        </T>
      )}
      <T stil="body" max={60}>
        {p.einleitung}
      </T>
      <Liste punkte={p.punkte} stil="body" max={40} />
    </div>
  </div>
);

const ProblemTextFolie: React.FC<ProblemText> = (p) => (
  <Folie label={p.label}>
    <div className="inhalt" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--s4)' }}>
      <ProblemSpalte {...p} />
      <div style={mitte}>
        <T stil="titel" as="h2" max={60}>
          {p.titel}
        </T>
      </div>
    </div>
  </Folie>
);

/* ---------------------------------------------------------- problem-bild --- */
const ProblemBild: React.FC<AussageBild> = (p) => (
  <Folie label={p.label}>
    {/* full veil of the slide ground: statement in role colours, centred (feedback F1b "die aussage gerne mittig") */}
    <Bild bild={p.bild} eckig schleier="voll" platzhalter="" unterschrift={false} className="voll" />
    <div className="inhalt" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
      <T stil="aussage" as="h2" max={84}>
        {p.aussage}
      </T>
    </div>
  </Folie>
);

/* ------------------------------------------------ problem-mosaik / -raster --- */
interface ProblemBilder extends ProblemText {
  bilder?: BildDaten[];
}

const ProblemMosaik: React.FC<ProblemBilder> = (p) => {
  const b = (i: number) => <Bild bild={p.bilder?.[i]} platzhalter={`Bild ${i + 1}`} unterschrift={false} style={{ height: '100%' }} />;
  return (
    <Folie label={p.label}>
      <div className="inhalt" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--s4)' }}>
        <ProblemSpalte {...p} titelOben />
        <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: 'var(--gap)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 'var(--gap)' }}>
            {b(0)}
            {b(1)}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--gap)' }}>
            {b(2)}
            {b(3)}
          </div>
        </div>
      </div>
    </Folie>
  );
};

const ProblemRaster: React.FC<ProblemBilder> = (p) => (
  <Folie label={p.label}>
    <div className="inhalt" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--s4)' }}>
      <ProblemSpalte {...p} titelOben />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gridTemplateRows: '1fr 1fr', gap: 'var(--gap)' }}>
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <Bild key={i} bild={p.bilder?.[i]} platzhalter={`Bild ${i + 1}`} unterschrift={false} style={{ height: '100%' }} />
        ))}
      </div>
    </div>
  </Folie>
);

/* ------------------------------------------------------- problem-aussage --- */
interface ProblemAussage {
  label?: string;
  saetze: string[];
  bilder?: BildDaten[];
}

const ProblemAussageFolie: React.FC<ProblemAussage> = (p) => (
  <Folie label={p.label}>
    <div className="inhalt" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--s4)', alignItems: 'center' }}>
      <div className="stapel-l">
        {p.saetze.map((s, i) => (
          <T key={i} stil="titel" as={i === 0 ? 'h2' : 'p'} leise={i > 0} max={56}>
            {s}
          </T>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--gap)', height: 480 }}>
        <Bild bild={p.bilder?.[0]} platzhalter="Bild 1" unterschrift={false} style={{ height: '100%' }} />
        <Bild bild={p.bilder?.[1]} platzhalter="Bild 2" unterschrift={false} style={{ height: '100%' }} />
      </div>
    </div>
  </Folie>
);

/* ---------------------------------------------------------- sample data --- */
const einstiegText: EinstiegText = {
  label: 'Über uns',
  titel: 'Wir machen Unternehmen aus der Region sichtbar.',
  text: 'Die Uhl Werbeagentur aus Augsburg entwickelt Strategie, Website und Kampagnen für Mittelständler, die mehr Anfragen und bessere Bewerbungen wollen.',
};

const einstiegBild: AussageBild = {
  label: 'Über uns',
  aussage: 'Wir verbinden Strategie, Design und Technik zu Marketing, das ==messbar== wirkt.',
};

const einstiegBildHoch: TextBildHoch = {
  label: 'Über uns',
  text: 'Unser Ziel: Mittelständler gewinnen planbar Kunden und Fachkräfte, weil ihre Marke online so gut ist wie ihre Arbeit.',
  fakten: ['Agentur mit Sitz in Augsburg', 'Strategie, Design und Technik im Haus', 'Ein fester Ansprechpartner pro Kunde'],
};

const satzBild: SatzBild = {
  label: 'Über uns',
  satz: 'Marketing aus einer Hand,',
  nachsatz: 'von der Idee bis zur Anfrage.',
};

const teamReihe: TeamReihe = {
  label: 'Team',
  titel: 'Die Menschen, die Ihr Projekt vom ersten Workshop an begleiten.',
  mitglieder: [
    { name: 'Julia Berger', rolle: 'Projektleitung' },
    { name: 'Thomas Kraus', rolle: 'Strategie und Beratung' },
    { name: 'Sarah Lechner', rolle: 'Art Direction' },
    { name: 'Markus Huber', rolle: 'Webentwicklung' },
    { name: 'Lena Fischer', rolle: 'Content und SEO' },
    { name: 'David Wagner', rolle: 'Performance Marketing' },
  ],
};

const problemText: ProblemText = {
  label: 'Ausgangslage',
  titel: 'Gute Arbeit allein bringt keine Anfragen mehr.',
  einleitung: 'Neue Kunden kommen fast nur über Empfehlungen.',
  punkte: ['Website seit Jahren nicht gepflegt', 'Kaum Bewertungen bei Google', 'Kein klarer Weg zur Anfrage', 'Stellenanzeigen ohne Rücklauf'],
};

const problemTextKurz: ProblemText = {
  ...problemText,
  titel: 'Sichtbar ist, wer gefunden wird.',
  punkte: ['Website seit Jahren nicht gepflegt', 'Kaum Bewertungen bei Google', 'Kein klarer Weg zur Anfrage'],
};

const problemBild: AussageBild = {
  label: 'Ausgangslage',
  aussage: 'Wer online nicht auffällt, wird von Kunden und Bewerbern ==übersehen==.',
};

const problemAussage: ProblemAussage = {
  label: 'Ausgangslage',
  saetze: ['Kunden suchen heute zuerst bei Google.', 'Wer dort fehlt, verliert Anfragen und Bewerber.'],
};

/* einleitung + list is the one supporting block (feedback F1: no double paragraphs) */
const problemLimits = { label: 24, titel: 60, einleitung: 60, 'punkte[]': 40 };

export const einstiegLayouts: LayoutDef[] = [
  { id: 'einstieg-text', name: 'Einstieg, Text', gruppe: 'Einstieg', quelle: 'akoya-07', zweck: 'Positionierung in einem Satz plus kurzer Absatz, wer wir sind.', komponente: EinstiegTextFolie, beispiel: einstiegText, limits: { label: 24, titel: 64, text: 170 } },
  { id: 'einstieg-bild', name: 'Aussage auf Vollbild', gruppe: 'Einstieg', quelle: 'akoya-08', zweck: 'Eine Kernaussage über einem großen Stimmungsbild.', komponente: EinstiegBild, beispiel: einstiegBild, limits: { label: 24, aussage: 84 } },
  { id: 'einstieg-bild-hoch', name: 'Text mit Hochkantbild', gruppe: 'Einstieg', quelle: 'akoya-09', zweck: 'Ziel oder Mission links, dazu bis zu drei Eckdaten und ein hohes Bild.', komponente: EinstiegBildHoch, beispiel: einstiegBildHoch, limits: { label: 24, text: 130, 'fakten[]': 40 }, anzahl: { fakten: [0, 3] } },
  { id: 'einstieg-bild-satz', name: 'Bild, Satz rechts', gruppe: 'Einstieg', quelle: 'akoya-10', zweck: 'Ein quadratisches Bild und ein kurzer Satz in zwei Tönen.', komponente: EinstiegBildSatz, beispiel: satzBild, limits: { label: 24, satz: 40, nachsatz: 40 } },
  { id: 'einstieg-satz-bild', name: 'Satz links, Bild', gruppe: 'Einstieg', quelle: 'akoya-11', zweck: 'Kurzer Satz rechtsbündig neben einem Querformatbild.', komponente: EinstiegSatzBild, beispiel: satzBild, limits: { label: 24, satz: 40, nachsatz: 40 } },
  { id: 'team-reihe', name: 'Team in einer Reihe', gruppe: 'Team', quelle: 'akoya-12', zweck: 'Projektteam mit Überschrift und bis zu sechs Porträts mit Rolle.', komponente: TeamReiheFolie, beispiel: teamReihe, limits: { label: 24, titel: 72, 'mitglieder[].name': 28, 'mitglieder[].rolle': 32 }, anzahl: { mitglieder: [2, 6] } },
  { id: 'problem-text', name: 'Problem, Text und Headline', gruppe: 'Problem', quelle: 'akoya-13', zweck: 'Ausgangslage als Textspalte, das Problem als Headline daneben.', komponente: ProblemTextFolie, beispiel: problemText, limits: problemLimits, anzahl: { punkte: [0, 4] } },
  { id: 'problem-bild', name: 'Problem auf Vollbild', gruppe: 'Problem', quelle: 'akoya-14', zweck: 'Das Problem als ein Satz mittig auf einem großen Bild.', komponente: ProblemBild, beispiel: problemBild, limits: { label: 24, aussage: 84 } },
  { id: 'problem-mosaik', name: 'Problem mit Bildmosaik', gruppe: 'Problem', quelle: 'akoya-15', zweck: 'Ausgangslage als Text, belegt mit vier Bildern (z. B. Screenshots, Situation vor Ort).', komponente: ProblemMosaik, beispiel: problemTextKurz, limits: { ...problemLimits, titel: 36 }, anzahl: { punkte: [0, 3], bilder: [0, 4] } },
  { id: 'problem-raster', name: 'Problem mit Bildraster', gruppe: 'Problem', quelle: 'akoya-16', zweck: 'Ausgangslage als Text neben sechs gleich großen Belegbildern.', komponente: ProblemRaster, beispiel: problemTextKurz, limits: { ...problemLimits, titel: 36 }, anzahl: { punkte: [0, 3], bilder: [0, 6] } },
  { id: 'problem-aussage', name: 'Problem als große Aussage', gruppe: 'Problem', quelle: 'akoya-17', zweck: 'Situation, Folge und Wirkung in zwei bis drei großen Sätzen, dazu zwei Bilder.', komponente: ProblemAussageFolie, beispiel: problemAussage, limits: { label: 24, 'saetze[]': 56 }, anzahl: { saetze: [2, 3], bilder: [0, 2] } },
];
