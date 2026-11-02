import React from 'react';
import { Carlito } from 'next/font/google';
import { fazits, phases } from '../../../src/slides/infrabau-neuauftritt/data';
import { fields } from '../../../src/slides/infrabau-neuauftritt/HeuteSlide';
import { groups } from '../../../src/slides/infrabau-neuauftritt/ZielgruppenSlide';
import { istRows } from '../../../src/slides/infrabau-neuauftritt/IstStandSlide';
import { terms } from '../../../src/slides/infrabau-neuauftritt/SuchpotenzialSlide';
import { refs } from '../../../src/slides/infrabau-neuauftritt/SocialSlides';
import { quadrants } from '../../../src/slides/infrabau-neuauftritt/IdeenSlides';
import { fragen } from '../../../src/slides/infrabau-neuauftritt/FragenSlide';

// Speaker guide (A4) for the reduced presentation: one section per slide, details the slides leave out.
// Content comes from the same data as the slides, so both stay in sync.
const carlito = Carlito({ subsets: ['latin'], weight: ['400', '700'] });

const ink = '#1A1A1A';
const muted = '#6B6B6B';

const Slide: React.FC<{ n: number; title: string; kern: string; children?: React.ReactNode }> = ({ n, title, kern, children }) => (
  <section style={{ breakInside: 'avoid-page', marginBottom: 28 }}>
    <div style={{ fontSize: 11, color: muted, letterSpacing: '0.05em' }}>FOLIE {n}</div>
    <h2 style={{ fontSize: 20, margin: '2px 0 8px' }}>{title}</h2>
    <p style={{ margin: '0 0 8px', padding: '8px 12px', background: ink, color: '#FFFFFF', fontWeight: 700 }}>{kern}</p>
    {children}
  </section>
);

const List: React.FC<{ items: React.ReactNode[] }> = ({ items }) => (
  <ul style={{ margin: '4px 0 8px', paddingLeft: 18 }}>
    {items.map((it, i) => (
      <li key={i} style={{ marginBottom: 3 }}>{it}</li>
    ))}
  </ul>
);

const Sub: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 style={{ fontSize: 14, margin: '12px 0 2px' }}>{children}</h3>
);

export default function LeitfadenPage() {
  return (
    <main
      className={carlito.className}
      style={{ maxWidth: 760, margin: '0 auto', padding: '40px 32px', fontSize: 13, lineHeight: 1.45, color: ink, background: '#FFFFFF' }}
    >
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 28, margin: 0 }}>infrabau Neuauftritt</h1>
          <div style={{ color: muted, marginTop: 4 }}>Leitfaden zur Präsentation · nur für uns</div>
        </div>
        <img src="/Uhl-Logo.svg" alt="uhl" style={{ width: 44, height: 44, filter: 'invert(1)' }} />
      </header>

      <Slide n={1} title="Titel" kern="Heute ist ein erster Einstieg: Stand und Richtung, kein fertiges Konzept." />

      <Slide n={2} title="Agenda" kern="Erst wo infrabau steht, dann was das für die Website heißt, dann der Weg dorthin.">
        <List items={['Ausgangslage', 'Fazit', 'Roadmap', 'Social Media (optional)', 'Ideen', 'Offene Fragen']} />
      </Slide>

      <Slide n={3} title="infrabau heute" kern="Das Geld kommt aus dem Neubau, der Engpass sind Grundstücke.">
        <List items={fields.map((f) => <><b>{f.t}:</b> {f.d}</>)} />
        <p style={{ margin: 0 }}>Kennzahlen: gegründet 1994, 17 Mitarbeiter, 82 Projekte, 1.703 Einheiten. Gewerbe und Bestand laufen über das Netzwerk, wenig digital.</p>
      </Slide>

      <Slide n={4} title="Zielgruppen" kern="Die alte Website hat jede Zielgruppe nur teilweise erreicht, Kapitalanleger gar nicht.">
        <List items={groups.map((g) => <><b>{g.t}</b> ({g.w}): sucht {g.s.toLowerCase()}. Website heute: {g.heute}.</>)} />
        <p style={{ margin: 0 }}>Pain Point Bewerber: passende Bewerber sind schwer zu finden, aktuell zum Beispiel Architekten.</p>
      </Slide>

      <Slide n={5} title="Ist-Stand je Kanal" kern="Die Website ist der Anlass für Umzug und Neuaufbau. Der Rest ist Baustelle, aber lösbar.">
        <List items={istRows.map(([k, s, , d]) => <><b>{k}</b> ({s}): {d}</>)} />
        <Sub>Details zu den Firmendaten</Sub>
        <List
          items={[
            'Richtig: Daimlerstraße 19, 86368 Gersthofen, 0821 4554560 (Google-Profil).',
            'Alt: Dieselstraße 25 und Hirtenmahdweg auf Gelbe Seiten, 11880 und Yelp. Gelbe Seiten doppelt.',
            '11880 mit falscher Nummer, Trustlocal führt infrabau als Immobilienmakler.',
          ]}
        />
      </Slide>

      <Slide n={6} title="Wonach gesucht wird" kern="Eigentümer suchen öfter als Käufer: Bewerten und Grundstück verkaufen zusammen 4.150-mal im Monat, Bauträger 3.050-mal.">
        <List items={[...terms.map(([n, t, p]) => <>„{t}“: {n} Suchen pro Monat ({p})</>), '„Neubauwohnungen“: 100, „Bauträger Augsburg“: 70']} />
        <p style={{ margin: 0, color: muted }}>Deutschlandweit, ohne Ortsangabe, Durchschnitt pro Monat. Quelle: Sistrix.</p>
      </Slide>

      <Slide n={7} title="Wettbewerb im Vergleich" kern="Sicher kaufen erklärt, Online-Termin und Wohnungsauswahl am Gebäude hat in der Region noch kein Bauträger.">
        <List
          items={[
            'KLAUS und tfm: Wohnungsliste mit Preis und Exposé gegen Kontaktdaten.',
            'Layer: Interessentenliste, Finanzierungsrechner, Festpreisgarantie. Tritt eher wie ein Makler auf.',
            'THASOS: nur Interessentenliste über einen Newsletter.',
            'Kolper: nur Baustellen-Updates.',
            'asset, GEBA, AW: kleine Auftritte ohne Wohnungsliste.',
          ]}
        />
      </Slide>

      <Slide n={8} title="Was das für die neue Website heißt" kern="Zehn Schlüsse aus der Recherche. Auf der Folie nur die Überschriften, hier die Begründung.">
        {fazits.map((f, i) => (
          <div key={f.short} style={{ breakInside: 'avoid', marginTop: 10 }}>
            <Sub>{i + 1}. {f.title}</Sub>
            <p style={{ margin: '2px 0' }}><b>Daher:</b> {f.daher}</p>
            <List items={f.belege} />
          </div>
        ))}
      </Slide>

      <Slide n={9} title="Roadmap" kern="Kein Rundumschlag: erst Konzept und sauberes Fundament, dann Hauptseite, dann Projektseiten, dann Ausbau.">
        {phases.map((p) => (
          <div key={p.n} style={{ breakInside: 'avoid', marginTop: 10 }}>
            <Sub>Phase {p.n}: {p.title}</Sub>
            <p style={{ margin: '2px 0' }}>{p.ziel}</p>
            <p style={{ margin: '4px 0 0' }}><b>Pflicht</b></p>
            <List items={p.pflicht} />
            {p.optional.length > 0 && (
              <>
                <p style={{ margin: 0 }}><b>Optional</b></p>
                <List items={p.optional} />
              </>
            )}
          </div>
        ))}
        <p style={{ margin: '8px 0 0' }}><b>Alles aus einer Hand:</b> Grafik und Print, Web, SEO und Google Ads über einen Ansprechpartner, ohne Abstimmung zwischen Agenturen.</p>
      </Slide>

      <Slide n={10} title="Social Media (optional)" kern="Ganz oder gar nicht. Erst klären, wie es mit der bestehenden Agentur steht.">
        <List
          items={[
            'Instagram ist die Hauptplattform (80 %): Wohnen ist Lifestyle. Wohnung in 60 Sekunden, Rundgänge, Baustellen-Tagebuch, Grundstock an Videos vor dem Start.',
            'LinkedIn (20 %): 70 % über die Profile der Mitarbeiter (News, kurz, weniger ausgearbeitet), 30 % über den Firmenaccount (Meilensteine, wichtige Infos).',
            'Heute: infrabau zeigt auf Instagram schon Wohnbauten, aber weniger ausführlich und professionell als KLAUS. LinkedIn meist nur geteilte Inhalte.',
          ]}
        />
        <Sub>Vorbilder</Sub>
        <List items={refs.map((r) => <><b>{r.t}:</b> {r.d}</>)} />
      </Slide>

      <Slide n={11} title="Ideen nach Nutzen und Aufwand" kern="Zusätzliche Werkzeuge, die Mehrwert bringen. Einordnung ist unsere Einschätzung.">
        {quadrants.map((q) => (
          <div key={q.t}>
            <Sub>{q.t} ({q.s})</Sub>
            <List items={q.items} />
          </div>
        ))}
        <Sub>Online-Immobilienbewertung</Sub>
        <p style={{ margin: '2px 0' }}>
          2.650 Suchen pro Monat nach „Immobilie bewerten“. Eigentümer geben Lage, Größe und Zustand ein und bekommen eine erste Wertspanne, danach das Angebot einer persönlichen Bewertung. Türöffner für Bestand und Ankauf.
        </p>
        <Sub>Ads zum Verkaufsstart</Sub>
        <p style={{ margin: '2px 0' }}>
          Je Projekt eine Kampagne auf die Projektseite: Google Ads auf Suchen wie „Eigentumswohnung Augsburg“, Meta Ads in der Region, „Grundstück verkaufen“ dauerhaft mit Ads und SEO. Jede Anfrage landet in OnOffice und ist messbar.
        </p>
      </Slide>

      <Slide n={12} title="Was wir mit euch klären wollen" kern="Antworten notieren, sie bestimmen Umfang und Angebot.">
        {fragen.map((c) => (
          <div key={c.t}>
            <Sub>{c.t}</Sub>
            <List items={c.q} />
          </div>
        ))}
        <p style={{ margin: '6px 0 0', color: muted }}>Schon bekannt: Technik und Updates betreut heute niemand, Backups und Wartungsvertrag gibt es bisher nicht.</p>
      </Slide>
    </main>
  );
}
