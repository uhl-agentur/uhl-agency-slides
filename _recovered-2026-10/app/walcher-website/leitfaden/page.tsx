import React from 'react';
import { Carlito } from 'next/font/google';
import { ausbau, fragen, geo, google, ki, kurz, mapping, seo, sofort } from '../../../src/slides/walcher-website/data';
import { search } from '../../../src/slides/walcher-website/search';

// Speaker guide (A4) for the Walcher SEO/GEO analysis; same data as the slides.
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
  <ul style={{ margin: '4px 0 8px', paddingLeft: 18, listStyle: 'disc' }}>
    {items.map((it, i) => (
      <li key={i} style={{ marginBottom: 3 }}>{it}</li>
    ))}
  </ul>
);

const P: React.FC<{ children: React.ReactNode; muted?: boolean }> = ({ children, muted: m }) => (
  <p style={{ margin: '4px 0 0', color: m ? muted : ink }}>{children}</p>
);

export default function WalcherLeitfadenPage() {
  return (
    <main className={carlito.className} style={{ maxWidth: 760, margin: '0 auto', padding: '40px 32px', fontSize: 13, lineHeight: 1.45, color: ink, background: '#FFFFFF' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 28, margin: 0 }}>Architekturbüro Walcher: SEO- und GEO-Analyse</h1>
          <div style={{ color: muted, marginTop: 4 }}>Leitfaden zur Präsentation · nur für uns</div>
        </div>
        <img src="/Uhl-Logo.svg" alt="uhl" style={{ width: 44, height: 44, filter: 'invert(1)' }} />
      </header>

      <Slide n={1} title="Titel" kern="Kurze Analyse der Website architekturbuero-walcher.de: wie sichtbar sie ist und was wir optimieren.">
        <P muted>Taktvoll: Die Seite wurde im Sommer 2026 neu aufgesetzt (WordPress, Elementor). Nicht die Gestaltung kritisieren, sondern zeigen, was für Google und KI fehlt.</P>
      </Slide>

      <Slide n={2} title="Das Wichtigste in Kürze" kern="Unsichtbar bei Google, bei KI falsch eingeordnet, Grundlagen fehlen. Aber schnell zu ändern.">
        <List items={kurz.map(([t, d]) => <><b>{t}:</b> {d}</>)} />
      </Slide>

      <Slide n={3} title="Sichtbarkeit und Suchbegriffe" kern={search.takeaway}>
        <P>Sichtbarkeitsindex Walcher: {search.visibility}. Wettbewerber: {search.competitors.map(([d, v]) => `${d} ${v}`).join(' · ')}.</P>
        <List items={search.terms.map(([n, t, p]) => <>„{t}“: {n} Suchen pro Monat ({p})</>)} />
        <P>Ohne messbares Volumen: „Kita Architekt“, „Architekt Sanierung Augsburg“. „Haus bauen Augsburg“: 20 pro Monat.</P>
        <P muted>{search.source}. Sistrix misst breit über viele Suchbegriffe, Folie 4 zeigt die einzelne Suche.</P>
      </Slide>

      <Slide n={4} title="Wer bei „Architekt Augsburg“ oben steht" kern="Walcher taucht weder in der Karte noch auf Seite 1 noch in der KI-Übersicht auf.">
        <List
          items={[
            <>Google-Karte: {google.karte.map(([n, x]) => `${n} (${x})`).join(', ')}.</>,
            <>Seite 1: {google.treffer.join(', ')}.</>,
            <>KI-Übersicht nennt: {google.ki.join(', ')}.</>,
            'ARCHITEKTanBORD hat „Architekt Augsburg“ im Seitentitel und 32 Bewertungen. Zeigt, was saubere Grundlagen bringen.',
            'Walcher hat 5,0 Sterne aus 20 Bewertungen, ähnlich wie Zuth (21), steht aber nicht in der Karte.',
          ]}
        />
        <P muted>Google.de, Standort Augsburg-Pfersee, 15.10.2026, von Hand geprüft.</P>
      </Slide>

      <Slide n={5} title="Was KI-Assistenten empfehlen (GEO)" kern="Wenn Walcher genannt wird, dann für Umbau und Privatkunden. Die Stärke öffentliche Bauten kennt keine KI.">
        <List items={ki.map((k) => <><b>{k.name}:</b> {k.genannt ? `genannt, ${k.wie}` : 'nicht genannt'}. Außerdem: {k.andere}.</>)} />
        <P>KI-Assistenten ziehen Bewertungen und Beschreibungen aus Google, Portalen und der Website. Klare Texte zu Schwerpunkten und Referenzen steuern, wofür Walcher empfohlen wird.</P>
        <P muted>Abgefragt am 15.10.2026, ohne Anmeldung bzw. ohne Verlauf. Antworten schwanken.</P>
      </Slide>

      <Slide n={6} title="SEO-Check der Website" kern="Die Technik läuft, aber die Grundlagen für Google fehlen fast überall.">
        <List items={seo.map(([k, s, , d]) => <><b>{k}</b> ({s}): {d}</>)} />
        <P>Weitere Funde: doppelte Titel (drei Projekte „Einfamilienwohnhaus“, zwei „Stadtteilbücherei und Bürgerbüro“), Projekte ohne Jahreszahl, Schriften laden noch von neu.architekturbuero-walcher.de, Tippfehler auf Leistungen und Büro, Impressum ohne Berufshaftpflicht, berufsrechtliche Regeln und USt-ID (rechtlich nicht geprüft).</P>
      </Slide>

      <Slide n={7} title="GEO-Check: Was KI-Assistenten lesen können" kern="KIs finden keine klare Aussage, wofür das Büro steht. Daher die falsche Einordnung.">
        <List items={geo.map(([k, s, , d]) => <><b>{k}</b> ({s}): {d}</>)} />
        <P>Eine llms.txt fehlt. Kein Muss, aber schnell gemacht.</P>
      </Slide>

      <Slide n={8} title="Welche Seite für welche Suche" kern="Jede wichtige Suche bekommt eine Seite, die genau dafür gemacht ist.">
        <List items={mapping.map(([n, t, p]) => <>„{t}“ ({n}): {p}</>)} />
        <P>„Architekt Kosten“ ist die größte Suche. Eine Seite zu Kosten und Ablauf nutzt zugleich Google und den KI-Assistenten, die genau solche Fragen beantworten.</P>
      </Slide>

      <Slide n={9} title="Was wir optimieren" kern="Erst das Sofort-Paket auf der bestehenden Seite, dann Inhalte ausbauen.">
        <p style={{ margin: '4px 0 0' }}><b>Sofort</b></p>
        <List items={sofort} />
        <p style={{ margin: 0 }}><b>Danach</b></p>
        <List items={ausbau} />
      </Slide>

      <Slide n={10} title="Was wir mit Ihnen klären wollen" kern="Antworten notieren, sie bestimmen Umfang und Angebot.">
        {fragen.map((c) => (
          <div key={c.t}>
            <p style={{ margin: '6px 0 0' }}><b>{c.t}</b></p>
            <List items={c.q} />
          </div>
        ))}
        <P muted>Bewerber und Social Media nur ansprechen, wenn Interesse besteht.</P>
      </Slide>
    </main>
  );
}
