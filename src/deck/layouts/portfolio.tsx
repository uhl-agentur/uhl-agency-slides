import React from 'react';
import { Bild, BildDaten, Folie, T } from '../system';
import type { LayoutDef } from '../typen';

/* Portfolio group: the quiet compositions of the photographer template
   (referenz/portfolio) that Akoya does not cover. Small numbers, centred
   headings, lots of air; structure comes from spacing, not hairlines
   (feedback F1: "weniger trennlinien"), hairlines only between real list rows. Same chrome as every other layout. */

const nr = (i: number) => String(i + 1).padStart(2, '0');
const mitte: React.CSSProperties = { display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' };

/* ------------------------------------------------------- kapitel-trenner --- */
interface KapitelTrenner {
  label?: string;
  nummer?: string;
  titel: string;
  text?: string;
  ausrichtung?: 'links' | 'mitte';
}

const KapitelTrennerFolie: React.FC<KapitelTrenner> = (p) => {
  const zentriert = p.ausrichtung === 'mitte';
  return (
    <Folie label={p.label}>
      <div className="inhalt" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: zentriert ? 'center' : 'flex-start' }}>
        <div className="stapel" style={{ ...(zentriert ? mitte : {}), maxWidth: 1100 }}>
          <T stil="meta" leise max={4}>
            {p.nummer}
          </T>
          <T stil="aussage" as="h2" max={40}>
            {p.titel}
          </T>
          <T stil="lead" leise max={110} style={{ marginTop: 'var(--s3)' }}>
            {p.text}
          </T>
        </div>
      </div>
    </Folie>
  );
};

const kapitelTrenner: KapitelTrenner = {
  label: 'Leistungen',
  nummer: '01',
  titel: 'Websites, die Anfragen bringen',
  text: 'Von der Struktur bis zum Launch: schnelle Seiten, klare Wege, messbare Ergebnisse.',
  ausrichtung: 'links',
};
const kapitelLimits = { label: 24, nummer: 4, titel: 40, text: 110 };

/* ---------------------------------------------------------- kapitel-bild --- */
interface KapitelBild {
  label?: string;
  nummer?: string;
  titel: string;
  text?: string;
  bilder?: BildDaten[];
}

const KapitelBildFolie: React.FC<KapitelBild> = (p) => {
  const b = p.bilder ?? [];
  return (
    <Folie label={p.label}>
      <div className="inhalt" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--s4)' }}>
        <div className="stapel" style={{ alignSelf: 'center' }}>
          <T stil="meta" leise max={4}>
            {p.nummer}
          </T>
          <T stil="titel" as="h2" max={36}>
            {p.titel}
          </T>
          <T stil="body" leise max={110}>
            {p.text}
          </T>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: '1fr 1fr', gap: 'var(--gap)' }}>
          <Bild bild={b[0]} platzhalter="Projektbild" style={{ gridColumn: '1 / 3' }} />
          <Bild bild={b[1]} platzhalter="Detail" />
          <Bild bild={b[2]} platzhalter="Detail" />
        </div>
      </div>
    </Folie>
  );
};

const kapitelBild: KapitelBild = {
  label: 'Leistungen',
  titel: 'Suchmaschinenoptimierung',
  text: 'Wir bringen Ihre Seiten dorthin, wo Ihre Kunden suchen: technisch sauber und messbar.',
};

/* ---------------------------------------------------------------- ansatz --- */
interface Ansatz {
  label?: string;
  titel: string;
  text: string;
}

const AnsatzFolie: React.FC<Ansatz> = (p) => (
  <Folie label={p.label}>
    <div className="inhalt" style={{ ...mitte, justifyContent: 'center' }}>
      <T stil="karte" as="h2" max={32}>
        {p.titel}
      </T>
      <T stil="lead" max={150}>
        {p.text}
      </T>
    </div>
  </Folie>
);

const ansatz: Ansatz = {
  label: 'Haltung',
  titel: 'Unser Ansatz',
  text: 'Wir fangen nicht beim Design an, sondern bei Ihren Kunden: Was suchen sie, und was überzeugt sie?',
};

/* ---------------------------------------------------------- rahmen-bild --- */
interface RahmenBild {
  label?: string;
  aussage: string;
  bilder?: BildDaten[];
}

const RahmenBildFolie: React.FC<RahmenBild> = (p) => {
  const b = p.bilder ?? [];
  return (
    <Folie label={p.label}>
      <div className="inhalt" style={{ ...mitte, justifyContent: 'center', gap: 'var(--s3)' }}>
        <div style={{ width: 1120, height: 480, display: 'grid', gridTemplateColumns: b.length > 1 ? '1fr 1fr' : '1fr', gap: 'var(--gap)' }}>
          <Bild bild={b[0]} platzhalter="Vorher" unterschrift={false} style={{ height: '100%' }} />
          {b.length > 1 && <Bild bild={b[1]} platzhalter="Nachher" unterschrift={false} style={{ height: '100%' }} />}
        </div>
        <T stil="aussage" as="h2" max={70}>
          {p.aussage}
        </T>
      </div>
    </Folie>
  );
};

const rahmenBild: RahmenBild = {
  label: 'Relaunch',
  aussage: 'Websites, die ruhig wirken, schnell laden und klar führen.',
  bilder: [{ alt: 'Alte Website' }, { alt: 'Neue Website' }],
};

/* ------------------------------------------- leistungen-spalten / prozess --- */
interface Spalten {
  label?: string;
  titel: string;
  spalten: { titel: string; text?: string }[];
  /** 01, 02 … above each column: only for a real order (process steps), never for a set of services (F3i) */
  nummeriert?: boolean;
}

const SpaltenFolie: React.FC<Spalten> = (p) => (
  <Folie label={p.label}>
    <div className="inhalt" style={{ ...mitte, justifyContent: 'center', gap: 'var(--s3)' }}>
      <T stil="titel" as="h2" max={36}>
        {p.titel}
      </T>
      <ol style={{ alignSelf: 'stretch', display: 'grid', gridTemplateColumns: `repeat(${p.spalten.length}, 1fr)`, gap: 'var(--gap)', textAlign: 'left' }}>
        {p.spalten.map((s, i) => (
          <li key={i} className="stapel-s">
            {p.nummeriert && (
              <div className="t-meta leise" style={{ fontVariantNumeric: 'tabular-nums' }}>
                {nr(i)}
              </div>
            )}
            <T stil="karte" as="h3" max={24}>
              {s.titel}
            </T>
            <T stil="body" leise max={66}>
              {s.text}
            </T>
          </li>
        ))}
      </ol>
    </div>
  </Folie>
);

const leistungen: Spalten = {
  label: 'Leistungen',
  titel: 'Was wir für Sie tun',
  spalten: [
    { titel: 'Websites', text: 'Schnelle, klare Seiten, die Besucher zu Anfragen führen.' },
    { titel: 'SEO', text: 'Gefunden werden, wenn Kunden in Ihrer Region suchen.' },
    { titel: 'Google Ads', text: 'Anzeigen mit festem Budget und messbaren Anfragen.' },
    { titel: 'Social Media', text: 'Beiträge und Kampagnen, die Ihre Marke greifbar machen.' },
  ],
};
const prozess: Spalten = {
  label: 'Ablauf',
  titel: 'Vom Briefing bis zum Launch',
  nummeriert: true,
  spalten: [
    { titel: 'Briefing', text: 'Ziele, Zielgruppen und Budget in einem Workshop klären.' },
    { titel: 'Konzept', text: 'Struktur, Inhalte und Design als klickbarer Entwurf.' },
    { titel: 'Umsetzung', text: 'Entwicklung, Texte und Tracking, Woche für Woche sichtbar.' },
    { titel: 'Launch', text: 'Live gehen, messen und gezielt nachschärfen.' },
  ],
};
const spaltenLimits = { label: 24, titel: 36, 'spalten[].titel': 24, 'spalten[].text': 66 };

/* ----------------------------------------------------- leistungen-treppe --- */
interface Treppe {
  label?: string;
  titel: string;
  text?: string;
  stufen: { titel: string; text?: string; bild?: BildDaten }[];
  /** big 01–04 above each step: only when the steps build on each other (F3i) */
  nummeriert?: boolean;
}

const TreppeFolie: React.FC<Treppe> = (p) => {
  const hoehen = [140, 240, 340, 440];
  return (
    <Folie label={p.label}>
      <div className="inhalt" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--s4)' }}>
        <div className="stapel" style={{ alignSelf: 'center' }}>
          <T stil="titel" as="h2" max={24}>
            {p.titel}
          </T>
          <T stil="body" leise max={90}>
            {p.text}
          </T>
        </div>
        <ol style={{ display: 'grid', gridTemplateColumns: `repeat(${p.stufen.length}, 1fr)`, gap: 'var(--s2)', alignItems: 'end' }}>
          {p.stufen.map((s, i) => (
            <li key={i} style={{ display: 'flex', flexDirection: 'column' }}>
              {p.nummeriert && (
                <div className="t-titel leise" style={{ fontVariantNumeric: 'tabular-nums', marginBottom: 'var(--s2)' }}>
                  {nr(i)}
                </div>
              )}
              <T stil="karte" as="h3" max={11}>
                {s.titel}
              </T>
              <T stil="meta" leise max={40} style={{ marginTop: 'var(--s1)' }}>
                {s.text}
              </T>
              <Bild bild={s.bild} platzhalter="" unterschrift={false} style={{ height: hoehen[i] ?? 440, marginTop: 'var(--s2)' }} />
            </li>
          ))}
        </ol>
      </div>
    </Folie>
  );
};

const treppe: Treppe = {
  label: 'Schwerpunkte',
  titel: 'Unsere Schwerpunkte',
  text: 'Vier Disziplinen, ein Team, damit aus Sichtbarkeit Anfragen werden.',
  stufen: [
    { titel: 'Marke', text: 'Logo, Farben und Ton.' },
    { titel: 'Website', text: 'Aus Besuchern werden Kunden.' },
    { titel: 'Reichweite', text: 'SEO und Ads für Ihre Region.' },
    { titel: 'Wachstum', text: 'Messen und nachschärfen.' },
  ],
};

/* -------------------------------------------------------- arbeiten-reihe --- */
interface ArbeitenReihe {
  label?: string;
  titel: string;
  bilder?: BildDaten[];
}

const ArbeitenReiheFolie: React.FC<ArbeitenReihe> = (p) => {
  const masse: [number, number][] = [
    [220, 260],
    [320, 380],
    [460, 540],
    [320, 380],
    [220, 260],
  ];
  return (
    <Folie label={p.label}>
      <div className="inhalt" style={{ ...mitte, justifyContent: 'center', gap: 'var(--s3)' }}>
        <T stil="titel" as="h2" max={36}>
          {p.titel}
        </T>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--gap)' }}>
          {masse.map(([w, h], i) => (
            <Bild key={i} bild={p.bilder?.[i]} platzhalter="Projekt" style={{ width: w, height: h, textAlign: 'left' }} />
          ))}
        </div>
      </div>
    </Folie>
  );
};

const arbeitenReihe: ArbeitenReihe = {
  label: 'Referenzen',
  titel: 'Ausgewählte Arbeiten',
};

/* ------------------------------------------------------ arbeiten-projekt --- */
interface ArbeitenProjekt {
  label?: string;
  titel: string;
  bilder?: BildDaten[];
}

const ArbeitenProjektFolie: React.FC<ArbeitenProjekt> = (p) => {
  const b = p.bilder ?? [];
  return (
    <Folie label={p.label}>
      <div className="inhalt" style={{ ...mitte, justifyContent: 'center', gap: 'var(--s3)' }}>
        <T stil="titel" as="h2" max={36}>
          {p.titel}
        </T>
        <div style={{ flex: 1, width: 1280, display: 'grid', gridTemplateColumns: '1.7fr 1fr', gridTemplateRows: '1fr 1fr', gap: 'var(--gap)', textAlign: 'left', minHeight: 0 }}>
          <Bild bild={b[0]} platzhalter="Hauptbild" style={{ gridRow: '1 / 3' }} />
          <Bild bild={b[1]} platzhalter="Detail" />
          <Bild bild={b[2]} platzhalter="Detail" />
        </div>
      </div>
    </Folie>
  );
};

const arbeitenProjekt: ArbeitenProjekt = {
  label: 'Referenz',
  titel: 'Relaunch Schreinerei Huber',
  bilder: [{ text: 'Startseite' }, { text: 'Leistungsseite mobil' }, { text: 'Anfrageformular' }],
};
const bildTextLimits = { 'bilder[].text': 48 };

/* ----------------------------------------------------------- zitat-bilder --- */
interface ZitatBilder {
  label?: string;
  zitat: string;
  bilder?: BildDaten[];
}

const ZitatBilderFolie: React.FC<ZitatBilder> = (p) => {
  const b = p.bilder ?? [];
  return (
    <Folie label={p.label}>
      <div className="inhalt" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 'var(--s4)', alignItems: 'center' }}>
        <Bild bild={b[0]} platzhalter="Kampagne" style={{ height: '100%' }} />
        <div style={{ ...mitte, gap: 'var(--s3)' }}>
          <T stil="lead" max={84}>
            {p.zitat}
          </T>
          <Bild bild={b[1]} platzhalter="Detail" style={{ width: 280, height: 320, textAlign: 'left' }} />
        </div>
        <Bild bild={b[2]} platzhalter="Umsetzung" style={{ height: 520 }} />
      </div>
    </Folie>
  );
};

const zitatBilder: ZitatBilder = {
  label: 'Kampagne',
  zitat: 'Jede Kampagne beginnt mit einer Frage: Was soll der Kunde danach tun?',
  bilder: [{ text: 'Frühjahrskampagne 2026' }, { text: 'Social-Media-Formate' }, { text: 'Plakat Innenstadt' }],
};

/* ---------------------------------------------------------- kunden-logos --- */
interface KundenLogos {
  label?: string;
  titel: string;
  text?: string;
  logos: { name: string; src?: string }[];
}

const KundenLogosFolie: React.FC<KundenLogos> = (p) => (
  <Folie label={p.label}>
    <div className="inhalt" style={{ ...mitte, justifyContent: 'center' }}>
      <T stil="titel" as="h2" max={36}>
        {p.titel}
      </T>
      <T stil="body" leise max={80} style={{ marginTop: 'var(--s2)' }}>
        {p.text}
      </T>
      <ul style={{ marginTop: 'var(--s3)', width: 1440, display: 'grid', gridTemplateColumns: `repeat(${Math.min(6, p.logos.length)}, 1fr)`, gap: 'var(--gap)' }}>
        {p.logos.map((l, i) => (
          <li key={i} className="bild" style={{ height: 136 }}>
            {l.src ? (
              <img src={l.src} alt={l.name} style={{ objectFit: 'contain', padding: 'var(--s2)' }} />
            ) : (
              <div className="bild-leer" style={{ padding: '0 var(--s1)' }}>
                <span className={l.name.length > 22 ? 'zu-lang' : undefined}>{l.name}</span>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  </Folie>
);

const kundenLogos: KundenLogos = {
  label: 'Kunden',
  titel: 'Mit wem wir arbeiten',
  text: 'Handwerk, Mittelstand und Dienstleister aus Augsburg und ganz Bayern.',
  logos: [
    { name: 'Schreinerei Huber' },
    { name: 'Donauries Pflege' },
    { name: 'Golfschule Proske' },
    { name: 'Autohaus Lechfeld' },
    { name: 'Kanzlei Brenner' },
    { name: 'Bäckerei Wagner' },
  ],
};

/* ----------------------------------------------------------- testimonial --- */
interface Testimonial {
  label?: string;
  zitat: string;
  name: string;
  rolle?: string;
  firma?: string;
}

const TestimonialFolie: React.FC<Testimonial> = (p) => (
  <Folie label={p.label}>
    <div className="inhalt" style={{ ...mitte, justifyContent: 'center', gap: 'var(--s3)' }}>
      <T stil="aussage" as="blockquote" max={130}>
        {p.zitat}
      </T>
      <T stil="meta" leise max={100}>
        {[p.name, [p.rolle, p.firma].filter(Boolean).join(', ')].filter(Boolean).join(' · ')}
      </T>
    </div>
  </Folie>
);

const testimonial: Testimonial = {
  label: 'Stimmen',
  zitat: '„Seit dem Relaunch kommen jede Woche Anfragen über die Website. Vorher war das die Ausnahme.“',
  name: 'Thomas Huber',
  rolle: 'Geschäftsführer',
  firma: 'Schreinerei Huber',
};

/* ---------------------------------------------------------- lieferumfang --- */
interface Lieferumfang {
  label?: string;
  titel: string;
  posten: { titel: string; bild?: BildDaten }[];
  text?: string;
}

const LieferumfangFolie: React.FC<Lieferumfang> = (p) => {
  const masse: [number, number][] = [
    [280, 280],
    [210, 170],
    [210, 224],
    [266, 200],
    [400, 280],
  ];
  return (
    <Folie label={p.label}>
      <div className="inhalt" style={{ ...mitte, justifyContent: 'center', gap: 'var(--s3)' }}>
        <T stil="titel" as="h2" max={36}>
          {p.titel}
        </T>
        <ul style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', gap: 'var(--gap)', textAlign: 'left' }}>
          {p.posten.map((x, i) => {
            const [w, h] = masse[i % masse.length];
            return (
              <li key={i} style={{ width: w }}>
                <Bild bild={x.bild} platzhalter="" unterschrift={false} style={{ height: h }} />
                <T stil="meta" max={26} className="bildunterschrift">
                  {x.titel}
                </T>
              </li>
            );
          })}
        </ul>
        <T stil="body" leise max={80}>
          {p.text}
        </T>
      </div>
    </Folie>
  );
};

const lieferumfang: Lieferumfang = {
  label: 'Lieferumfang',
  titel: 'Was Sie bekommen',
  posten: [{ titel: 'Website im CMS' }, { titel: 'Texte und Bilder' }, { titel: 'SEO-Grundlagen' }, { titel: 'Tracking und Report' }, { titel: 'Schulung fürs Team' }],
  text: 'Zugänge, Dateien und Anleitung liegen am Ende bei Ihnen.',
};

/* ------------------------------------------------------------ preise-spalten --- */
interface Preise {
  label?: string;
  pakete: { name: string; preis: string; text?: string }[];
  /** index of the recommended package (lime tag) */
  empfohlen?: number;
  hinweis?: string;
}

const PreiseFolie: React.FC<Preise> = (p) => (
  <Folie label={p.label}>
    <div className="inhalt" style={{ ...mitte, justifyContent: 'center', gap: 'var(--s4)' }}>
      <ul style={{ width: 1440, display: 'grid', gridTemplateColumns: `repeat(${p.pakete.length}, 1fr)`, gap: 'var(--s4)' }}>
        {p.pakete.map((x, i) => (
          <li key={i} style={{ ...mitte, gap: 'var(--s2)' }}>
            {/* same-height slot above every package keeps names, prices and texts on one line */}
            <div style={{ height: 40 }}>{p.empfohlen === i && <span className="tag tag-akzent">Empfohlen</span>}</div>
            <T stil="meta" max={28}>
              {x.name}
            </T>
            <T stil="titel" max={14}>
              {x.preis}
            </T>
            <T stil="meta" leise max={58}>
              {x.text}
            </T>
          </li>
        ))}
      </ul>
      <T stil="meta" leise max={90} style={{ maxWidth: 'none' }}>
        {p.hinweis}
      </T>
    </div>
  </Folie>
);

const preise: Preise = {
  label: 'Investition',
  pakete: [
    { name: 'Onepager', preis: 'ab 4.900 €', text: 'Eine Seite, Texte und Bilder, fertig in vier Wochen.' },
    { name: 'Unternehmenswebsite', preis: 'ab 9.800 €', text: 'Bis zu zwölf Seiten, SEO-Grundlagen und Tracking.' },
    { name: 'Individuelles Projekt', preis: 'auf Anfrage', text: 'Shop, Funnel oder Portal, nach Umfang kalkuliert.' },
  ],
  empfohlen: 1,
  hinweis: 'Alle Preise netto zzgl. MwSt. Pflege und Hosting ab 89 € im Monat.',
};

/* ------------------------------------------------------------ liste-jahre --- */
interface ListeJahre {
  label?: string;
  titel: string;
  zeilen: { jahr: string; titel: string; detail?: string }[];
}

const ListeJahreFolie: React.FC<ListeJahre> = (p) => (
  <Folie label={p.label}>
    <div className="inhalt" style={{ ...mitte, justifyContent: 'center', gap: 'var(--s3)' }}>
      <T stil="titel" as="h2" max={36}>
        {p.titel}
      </T>
      <ul style={{ width: 1440, textAlign: 'left' }}>
        {p.zeilen.map((z, i) => (
          <li key={i} className="linie-unten" style={{ display: 'grid', gridTemplateColumns: '160px 1fr auto', gap: 'var(--gap)', alignItems: 'center', padding: 'var(--s2) 0' }}>
            <T stil="meta" leise max={9} style={{ fontVariantNumeric: 'tabular-nums' }}>
              {z.jahr}
            </T>
            <T stil="lead" max={48}>
              {z.titel}
            </T>
            <T stil="meta" leise max={36}>
              {z.detail}
            </T>
          </li>
        ))}
      </ul>
    </div>
  </Folie>
);

const listeJahre: ListeJahre = {
  label: 'Auszeichnungen',
  titel: 'Auszeichnungen und Meilensteine',
  zeilen: [
    { jahr: '2026', titel: 'Google Partner Premier', detail: 'Top 3 % der Agenturen' },
    { jahr: '2025', titel: 'German Design Award, Special Mention', detail: 'Website Golfschule Proske' },
    { jahr: '2024', titel: 'Agentur des Jahres Schwaben', detail: 'IHK Schwaben' },
    { jahr: '2022', titel: '100. Website-Launch', detail: 'Schreinerei Huber' },
    { jahr: '2009', titel: 'Gründung in Augsburg', detail: 'Uhl Werbeagentur GmbH' },
  ],
};

/* --------------------------------------------------------- kontakt-spalten --- */
interface KontaktSpalten {
  label?: string;
  titel: string;
  kanaele: { name: string; wert: string }[];
  bild?: BildDaten;
}

const KontaktSpaltenFolie: React.FC<KontaktSpalten> = (p) => (
  <Folie label={p.label}>
    <div className="inhalt" style={{ ...mitte, justifyContent: 'center', gap: 'var(--s3)' }}>
      <T stil="titel" as="h2" max={36}>
        {p.titel}
      </T>
      <ul style={{ width: 1440, display: 'grid', gridTemplateColumns: `repeat(${p.kanaele.length}, 1fr)`, gap: 'var(--s4)' }}>
        {p.kanaele.map((k, i) => (
          <li key={i} className="stapel-s">
            <T stil="meta" leise max={20}>
              {k.name}
            </T>
            <T stil="karte" max={26}>
              {k.wert}
            </T>
          </li>
        ))}
      </ul>
      <Bild bild={p.bild} platzhalter="Team oder Büro" unterschrift={false} style={{ alignSelf: 'stretch', flex: 1, marginTop: 'var(--s3)' }} />
    </div>
  </Folie>
);

const kontakt: KontaktSpalten = {
  label: 'Kontakt',
  titel: 'Sprechen wir',
  kanaele: [
    { name: 'E-Mail', wert: 'info@uhl-werbeagentur.de' },
    { name: 'Website', wert: 'uhl-werbeagentur.de' },
    { name: 'Telefon', wert: '0821 38043' },
  ],
};

/* -------------------------------------------------------------- hero-streu --- */
interface HeroStreu {
  label?: string;
  tag?: string;
  aussage: string;
  unterzeile?: string;
  bilder?: BildDaten[];
}

const HeroStreuFolie: React.FC<HeroStreu> = (p) => {
  const b = p.bilder ?? [];
  const orte: React.CSSProperties[] = [
    { left: 260, top: 120, width: 220, height: 220 },
    { right: 220, top: 170, width: 240, height: 260 },
    { left: 'var(--rand)', bottom: 200, width: 300, height: 260 },
    { right: 'var(--rand)', bottom: 230, width: 240, height: 240 },
  ];
  return (
    <Folie label={p.label}>
      {orte.map((o, i) => (
        <Bild key={i} bild={b[i]} platzhalter="" unterschrift={false} style={{ position: 'absolute', ...o }} />
      ))}
      <div className="voll" style={{ ...mitte, justifyContent: 'center', padding: '0 480px' }}>
        {p.tag && <span className="tag">{p.tag}</span>}
        <T stil="aussage" as="h1" max={64} style={{ marginTop: 'var(--s3)' }}>
          {p.aussage}
        </T>
        <T stil="body" leise max={90} style={{ marginTop: 'var(--s2)', maxWidth: 560 }}>
          {p.unterzeile}
        </T>
      </div>
    </Folie>
  );
};

const heroStreu: HeroStreu = {
  tag: 'Digitalagentur Augsburg',
  aussage: 'Websites, SEO und Ads, die aus Klicks Kunden machen.',
  unterzeile: 'Für Handwerk und Mittelstand in Augsburg und ganz Bayern.',
};

/* ----------------------------------------------------------- hero-portrait --- */
interface HeroPortrait {
  label?: string;
  titel: string;
  bild?: BildDaten;
}

const HeroPortraitFolie: React.FC<HeroPortrait> = (p) => (
  <Folie label={p.label}>
    <div className="voll" style={{ ...mitte, paddingTop: 'var(--oben)' }}>
      <T stil="display" as="h1" max={48}>
        {p.titel}
      </T>
    </div>
    <Bild bild={p.bild} platzhalter="Portrait" unterschrift={false} style={{ position: 'absolute', left: 'calc(50% - 160px)', bottom: -8, width: 320, height: 330 }} />
  </Folie>
);

const heroPortrait: HeroPortrait = {
  titel: 'Wir sind Uhl, Ihre Agentur in Augsburg.',
};

/* ----------------------------------------------------------- projekt-titel --- */
interface ProjektTitel {
  label?: string;
  projekt: string;
  kunde?: string;
}

const ProjektTitelFolie: React.FC<ProjektTitel> = (p) => (
  <Folie label={p.label}>
    <div className="inhalt" style={{ ...mitte, justifyContent: 'center' }}>
      <T stil="aussage" as="h2" max={40}>
        {p.projekt}
      </T>
      <T stil="lead" max={40}>
        {p.kunde}
      </T>
    </div>
  </Folie>
);

const projektTitel: ProjektTitel = {
  label: 'Referenz',
  projekt: 'Relaunch und Local SEO',
  kunde: 'Schreinerei Huber',
};

/* ------------------------------------------------------------------ export --- */
export const portfolioLayouts: LayoutDef[] = [
  { id: 'kapitel-trenner', name: 'Kapiteltrenner', gruppe: 'Kapitel', quelle: 'portfolio-014', zweck: 'Ruhiger Kapitelanfang mit Nummer, Titel, Strich und einem Satz; links oder zentriert.', komponente: KapitelTrennerFolie, beispiel: kapitelTrenner, limits: kapitelLimits },
  { id: 'kapitel-bild', name: 'Kapitel mit Bildcollage', gruppe: 'Kapitel', quelle: 'portfolio-017', zweck: 'Kapitelanfang mit kurzer Beschreibung und drei Bildern rechts.', komponente: KapitelBildFolie, beispiel: kapitelBild, limits: { label: 24, nummer: 4, titel: 36, text: 110 }, anzahl: { bilder: [0, 3] } },
  { id: 'ansatz', name: 'Ansatz zentriert', gruppe: 'Wert', quelle: 'portfolio-002', zweck: 'Haltung oder Arbeitsweise in einem ruhigen, zentrierten Absatz.', komponente: AnsatzFolie, beispiel: ansatz, limits: { label: 24, titel: 32, text: 150 } },
  { id: 'rahmen-bild', name: 'Bild mit Aussage', gruppe: 'Wert', quelle: 'portfolio-003', zweck: 'Ein oder zwei Bilder (z. B. vorher/nachher) und eine Aussage darunter.', komponente: RahmenBildFolie, beispiel: rahmenBild, limits: { label: 24, aussage: 70 }, anzahl: { bilder: [0, 2] } },
  { id: 'leistungen-spalten', name: 'Leistungen in Spalten', gruppe: 'Leistung', quelle: 'portfolio-004', zweck: 'Drei bis vier Leistungen mit Titel und kurzem Text, ohne Nummern (keine Reihenfolge, F3i).', komponente: SpaltenFolie, beispiel: leistungen, limits: spaltenLimits, anzahl: { spalten: [3, 4] } },
  { id: 'leistungen-treppe', name: 'Schwerpunkte als Treppe', gruppe: 'Leistung', quelle: 'portfolio-006', zweck: 'Einleitung links, vier Stufen mit steigenden Bildbalken; Nummern nur mit nummeriert: true (F3i).', komponente: TreppeFolie, beispiel: treppe, limits: { label: 24, titel: 24, text: 90, 'stufen[].titel': 11, 'stufen[].text': 40 }, anzahl: { stufen: [4, 4] } },
  { id: 'arbeiten-reihe', name: 'Arbeiten in einer Reihe', gruppe: 'Arbeiten', quelle: 'portfolio-007', zweck: 'Fünf Projektbilder unterschiedlicher Größe, zur Mitte hin wachsend.', komponente: ArbeitenReiheFolie, beispiel: arbeitenReihe, limits: { label: 24, titel: 36, ...bildTextLimits }, anzahl: { bilder: [0, 5] } },
  { id: 'arbeiten-projekt', name: 'Projekt mit drei Bildern', gruppe: 'Arbeiten', quelle: 'portfolio-008', zweck: 'Ein Projekt: großes Hauptbild und zwei Details mit Bildunterschrift.', komponente: ArbeitenProjektFolie, beispiel: arbeitenProjekt, limits: { label: 24, titel: 36, ...bildTextLimits }, anzahl: { bilder: [0, 3] } },
  { id: 'zitat-bilder', name: 'Satz zwischen Bildern', gruppe: 'Arbeiten', quelle: 'portfolio-031', zweck: 'Ein kurzer Satz zwischen drei frei gesetzten Projektbildern.', komponente: ZitatBilderFolie, beispiel: zitatBilder, limits: { label: 24, zitat: 84, 'bilder[].text': 32 }, anzahl: { bilder: [0, 3] } },
  { id: 'kunden-logos', name: 'Kundenlogos', gruppe: 'Beweis', quelle: 'portfolio-026', zweck: 'Titel, ein Satz und sechs bis zwölf Kundenlogos.', komponente: KundenLogosFolie, beispiel: kundenLogos, limits: { label: 24, titel: 36, text: 80, 'logos[].name': 22 }, anzahl: { logos: [6, 12] } },
  { id: 'testimonial', name: 'Kundenstimme zentriert', gruppe: 'Beweis', quelle: 'portfolio-027', zweck: 'Ein Kundenzitat groß in der Mitte, darunter Name, Rolle, Firma.', komponente: TestimonialFolie, beispiel: testimonial, limits: { label: 24, zitat: 130, name: 32, rolle: 32, firma: 36 } },
  { id: 'prozess-schritte', name: 'Ablauf in Schritten', gruppe: 'Ablauf', quelle: 'portfolio-028', zweck: 'Drei bis vier Projektschritte mit Nummer, Titel und Text.', komponente: SpaltenFolie, beispiel: prozess, limits: spaltenLimits, anzahl: { spalten: [3, 4] } },
  { id: 'lieferumfang', name: 'Lieferumfang mit Bildern', gruppe: 'Leistung', quelle: 'portfolio-029', zweck: 'Was der Kunde am Ende bekommt: drei bis fünf Posten mit Bild und ein Satz.', komponente: LieferumfangFolie, beispiel: lieferumfang, limits: { label: 24, titel: 36, 'posten[].titel': 26, text: 80 }, anzahl: { posten: [3, 5] } },
  { id: 'preise-spalten', name: 'Preise in Spalten', gruppe: 'Preis', quelle: 'portfolio-030', zweck: 'Zwei bis drei Pakete mit Name, Preis und Hinweis, eines optional empfohlen.', komponente: PreiseFolie, beispiel: preise, limits: { label: 24, 'pakete[].name': 28, 'pakete[].preis': 14, 'pakete[].text': 58, hinweis: 90 }, anzahl: { pakete: [2, 3] } },
  { id: 'liste-jahre', name: 'Liste mit Jahreszahlen', gruppe: 'Beweis', quelle: 'portfolio-032', zweck: 'Auszeichnungen, Referenzen oder Meilensteine als Linienzeilen mit Jahr.', komponente: ListeJahreFolie, beispiel: listeJahre, limits: { label: 24, titel: 36, 'zeilen[].jahr': 9, 'zeilen[].titel': 48, 'zeilen[].detail': 36 }, anzahl: { zeilen: [3, 6] } },
  { id: 'kontakt-spalten', name: 'Kontakt in Spalten', gruppe: 'Kontakt', quelle: 'portfolio-034', zweck: 'Abschluss: Titel, drei Kontaktwege und ein Bildband darunter.', komponente: KontaktSpaltenFolie, beispiel: kontakt, limits: { label: 24, titel: 36, 'kanaele[].name': 20, 'kanaele[].wert': 26 }, anzahl: { kanaele: [2, 3] } },
  { id: 'hero-streu', name: 'Aussage mit Streubildern', gruppe: 'Titel', quelle: 'portfolio-037', zweck: 'Positionierung groß in der Mitte, vier Bilder locker in den Ecken.', komponente: HeroStreuFolie, beispiel: heroStreu, limits: { label: 24, tag: 32, aussage: 64, unterzeile: 90 }, anzahl: { bilder: [0, 4] } },
  { id: 'hero-portrait', name: 'Aussage mit Portrait', gruppe: 'Titel', quelle: 'portfolio-036', zweck: 'Vorstellung: große Überschrift, Portrait oder Teamfoto unten mittig.', komponente: HeroPortraitFolie, beispiel: heroPortrait, limits: { label: 24, titel: 48 } },
  { id: 'projekt-titel', name: 'Projekttitel', gruppe: 'Arbeiten', quelle: 'portfolio-023', zweck: 'Trenner vor einer Fallstudie: Projekt und Kunde (keine Füllzeilen wie Ort · Jahr, F3b).', komponente: ProjektTitelFolie, beispiel: projektTitel, limits: { label: 24, projekt: 40, kunde: 40 } },
];
