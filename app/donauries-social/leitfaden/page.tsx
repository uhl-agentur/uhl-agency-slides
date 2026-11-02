import React from 'react';
import { Carlito } from 'next/font/google';
import {
  auffaellig, community, controlling, formate, gemacht, goodToKnow, jahr, kanaele, kanalPlan, kpis, monatlich, warumUhl, workshop,
  hauptReferenz, prinzipien, regionFacts, team, vergleich, website, weitereReferenzen,
} from '../../../src/slides/donauries-social/data';

// Speaker guide (A4) for the DONAURIES social media pitch; same data as the slides.
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

const fragenPool: { t: string; q: string[] }[] = [
  { t: 'Ziele', q: [
    'Woran merken Sie in einem Jahr, dass der Wechsel richtig war, und was soll anders laufen als bisher?',
    'Wer kommt heute zu kurz, Tourismus oder Wirtschaft?',
    'Was ist Ihnen wichtiger: Erfahrung aus anderen Destinationen oder Nähe zur Region und eigene Drehs vor Ort?',
  ] },
  { t: 'Inhalt', q: ['Können wir vorab Insights und bisherige Reportings sehen?', 'Wie viel Content können die Vereine selbst liefern?'] },
  { t: 'Budget', q: [
    'Was hat die bisherige Agentur geliefert: Beiträge, Reels, Drehtage, Werbung?',
    'Sind die Mittel für 2027 eingeplant, teilen sich die Vereine die Kosten, und gibt es ein eigenes Mediabudget?',
    'Für diesen Umfang liegen Agenturen meist bei 4.000 bis 7.000 € im Monat. Wo ordnen Sie sich ein? (Danach schweigen. Sonst: Ab welcher Grenze geht das Angebot intern nicht mehr durch?)',
    'Wäre der Auftakt-Workshop schon im November denkbar?',
  ] },
  { t: 'Entscheidung', q: ['Wer entscheidet, und wie stark zählt der Preis?', 'Mit wie vielen Agenturen sprechen Sie, und wann fällt die Entscheidung?'] },
];

export default function DonauriesLeitfadenPage() {
  return (
    <main className={carlito.className} style={{ maxWidth: 760, margin: '0 auto', padding: '40px 32px', fontSize: 13, lineHeight: 1.45, color: ink, background: '#FFFFFF' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 28, margin: 0 }}>DONAURIES: Social Media ab 2027</h1>
          <div style={{ color: muted, marginTop: 4 }}>Leitfaden zur Präsentation · nur für uns · Stand 02.11.2026</div>
        </div>
        <img src="/Uhl-Logo.svg" alt="uhl" style={{ width: 44, height: 44, filter: 'invert(1)' }} />
      </header>

      <Slide n={1} title="Titel" kern="Pitch für Ferienland DONAURIES e. V. und Wirtschaftsförderverband DONAURIES e. V., über das Landratsamt Donau-Ries.">
        <P muted>Abgabe bis 13.11.2026, Start ab Januar 2027. Ansprechpartnerinnen: Lea Sophie Bosch (+49 906 74 6869) und Louisa Hahn. Anrede: Sie.</P>
      </Slide>

      <Slide n={2} title="Agenda" kern="Ausgangslage, Ansatz, erste Ideen, Zusammenarbeit, offene Fragen.">
        <P muted>Prioritäten: strategischer Ansatz, Ideen zur Verbindung der Themen, Ablauf. Leistungen und Kosten stehen im Angebot.</P>
      </Slide>

      <Slide n={3} title="Die Region" kern="Wir kennen die Region: 44 Kommunen von Oettingen bis Rain, mit Krater, Donau und starker Wirtschaft.">
        <List items={regionFacts.map(([n, l]) => <>{n}: {l}</>)} />
        <P muted>Einwohner 135.262 (31.12.2025). Arbeitslosenquote Landkreis 2,9 % (September 2026); der Agenturbezirk Donauwörth hat zum 35. Mal in Folge die niedrigste Quote Deutschlands. UNESCO Global Geopark seit 2022, erster in Bayern.</P>
      </Slide>

      <Slide n={4} title="Die Kanäle heute" kern="Rund 9.300 Follower je Kanal, kein TikTok. Vergleichbare Regionen liegen deutlich höher.">
        <List items={kanaele.map((k) => <>{k.k}: {k.n} ({k.d})</>)} />
        <List items={vergleich.map(([h, , l]) => <>{h}: {l}</>)} />
        <P muted>Komoot: Profil „Ferienland DONAURIES“ mit Touren (Ries-Panoramaweg, Sagenweg Wemding u. a.), letzte Aktivität 2.7.2023. YouTube betreibt der Wirtschaftsförderverband (97 Abos, 48 Videos, aktiv). Die Eifel erreicht mit fast gleich vielen Posts rund doppelt so viele Follower. Wertschätzend bleiben: nicht die bisherige Agentur kritisieren.</P>
      </Slide>

      <Slide n={5} title="Was uns auffällt" kern="Drei Punkte, an denen wir ansetzen.">
        <List items={auffaellig.map((a) => <><b>{a.t}:</b> {a.d}</>)} />
        <P muted>Collab-Posts: Ein Collab-Beitrag erscheint im Profil und Feed beider Accounts. Das ist die schnellste Reichweite ohne Mediabudget. Vergleich: @allgaeu hat dieselbe Doppelrolle („Urlauben, leben und arbeiten“).</P>
      </Slide>

      <Slide n={6} title="Unser Ansatz" kern="Vier Prinzipien für einen gemeinsamen Kanal von Tourismus und Wirtschaft.">
        <List items={prinzipien.map((p) => <><b>{p.t}:</b> {p.d}</>)} />
        <P muted>Content vor Community: Für eine Region ist Community kein eigenes Ziel. Wir messen Reichweite, Shares, Saves und Profilaufrufe. Einzelbilder bringen rund ein Drittel weniger Interaktion als Reels und Carousels. Über 400 Markenpartner und 43 TOP-Arbeitgeber (Wirtschaftsförderverband) sind mögliche Collab-Partner.</P>
      </Slide>

      <Slide n={7} title="Kanäle und Budget" kern="Mehr als Social Media: Instagram und Facebook als Kern, dazu TikTok, Komoot, Website, YouTube und Google.">
        <List items={kanalPlan.map((k) => <><b>{k.t} ({k.s}):</b> {k.d}</>)} />
        <P muted>TikTok: Vergleich @allgaeu 25.700 und @bayern 39.000 Follower. Nördlingen ist dort als „Shiganshina“ aus Attack on Titan bekannt. LinkedIn nicht ansprechen.</P>
      </Slide>

      <Slide n={8} title="Die Website als Zentrale" kern="Eine Website, die synchron zu allen Kanälen läuft: Blog, Eventkalender, Touren.">
        <List items={[...website.optionen.map((o) => <><b>{o.t}:</b> {o.d}</>), ...website.inhalte]} />
        <P muted>{website.warum} Welche Option, im Workshop klären.</P>
      </Slide>

      <Slide n={9} title="Sechs Formate, eine Region" kern="Jedes Format verbindet Tourismus, Lebensqualität, Wirtschaft und Arbeiten. Alles erste Ideen, nicht fix.">
        <List items={formate.map((f) => <><b>{f.t}:</b> {f.d}</>)} />
        <P muted>Gesicht der Region: Moderation mit Regionalbezug und Kameraerfahrung, keine Namen nennen. Creator vor Ort: lokale Creator und Fotograf:innen, eigener Hashtag.</P>
      </Slide>

      <Slide n={10} title="Gemacht im DONAURIES" kern="Kurzdokus machen Arbeit sehenswert und zeigen nebenbei, wie es sich hier lebt.">
        <List items={gemacht} />
        <P muted>Airbus Helicopters Donauwörth baut ab 2027 neu, rund 450 Arbeitsplätze. Firmenfreigaben über den Wirtschaftsförderverband und die TOP-Arbeitgeber. Orgelbau: G. F. Steinmeyer (Oettingen, gegründet 1847) baute bis 2001 Orgeln, weitergeführt als Orgelbau Steinmeyer GmbH; welche Werkstatt heute im Landkreis aktiv ist, vor dem Termin klären.</P>
      </Slide>

      <Slide n={11} title="Good-to-know" kern="Kurze Fakten über die Region, Hook in den ersten zwei Sekunden.">
        <List items={goodToKnow} />
      </Slide>

      <Slide n={12} title="Das Jahr 2027" kern="Events geben den Takt vor, die Landesgartenschau 2028 ist der rote Faden.">
        <List items={jahr.map((j) => <><b>{j.m}:</b> {j.e.join(', ')}</>)} />
        <P muted>Bestätigt für 2027 nur: 25. Reichsstraßenfest 21.–24.7., Wolle-Festival 24.–25.4., Ipf-Ries-Halbmarathon Anfang Mai. Alle anderen nach Vorjahresmuster (Quelle meist festivalsindeutschland.de, beim Veranstalter gegenprüfen). Inselfest ist in Donauwörth (Altstadtinsel Ried, Fischerstechen), nicht in Nördlingen. Ein jährliches Hafenfest gibt es nicht; am Alten Donauhafen Donauwörth war 2025 einmalig das CityRiver-Einweihungsfest. Fasching 2027: Faschingsdienstag 9.2. Landesgartenschau Donauwörth 2028: 27 ha, 165 Tage, rund 3.000 Veranstaltungen.</P>
      </Slide>

      <Slide n={13} title="So arbeiten wir" kern="Zum Start ein Workshop, danach ein fester Monatsablauf mit Community-Management und Online-Meeting.">
        <List items={[<><b>{workshop.t} ({workshop.s}):</b> {workshop.items.join(', ')}</>, ...monatlich.map((m) => <><b>{m.t}:</b> {m.d}</>), <><b>Laufend dazu:</b> Community-Management: Kommentare und Nachrichten beantworten wir größtenteils selbst. Konkrete Fachfragen stimmen wir mit Ihnen ab.</>]} />
        <P muted>Offene Punkte für Telefonat oder Workshop: Gewichtung Tourismus zu Wirtschaft, wie viel Content die Vereine selbst liefern.</P>
      </Slide>

      <Slide n={14} title="Erfolg messen & Community betreuen" kern="Wir messen, was zählt, werten jeden Monat aus und betreuen die Community.">
        <List items={[<><b>KPIs:</b> {kpis.join(', ')}</>, <><b>Controlling:</b> {controlling.join('; ')}</>, <><b>Community-Management:</b> {community.join('; ')}</>]} />
        <P muted>Community-Management machen wir größtenteils selbst; konkrete Fachfragen klären wir mit dem Kunden. Interaktive DMs, zum Beispiel „EVENTS“ kommentieren für die Event-Liste (Was geht im DONAURIES), „AUSBILDUNG“ für Stellen der Betriebe (Gemacht im DONAURIES), „HIN“ für Route und Infos (Good-to-know). Tool wie ManyChat nur als Idee nennen: US-Anbieter, Datenschutz beim öffentlichen Auftraggeber vorher prüfen, Kosten im Workshop klären.</P>
      </Slide>

      <Slide n={15} title="Das Team hinter Social Media" kern="Geschäftsführung, Content Creator, Social Media Managerin, Redakteur sowie Video und Fotografie.">
        <List items={team.map((t) => <><b>{t.n}:</b> {t.r}{t.d ? `, ${t.d}` : ''}</>)} />
      </Slide>

      <Slide n={16} title="Warum Uhl" kern="Nähe, ein Team für alles, drei Generationen, feste Abläufe und unser Kunden-Dashboard.">
        <List items={warumUhl.map((w) => <><b>{w.t}:</b> {w.d}</>)} />
        <P muted>Dashboard hervorheben: Freigaben, Impressionen und KPIs für den Kunden jederzeit einsehbar.</P>
      </Slide>

      <Slide n={17} title="Referenzen" kern="Regionalität und Social Media aus eigener Arbeit.">
        <List items={[<><b>{hauptReferenz.t}, {hauptReferenz.s}</b> (mit Zitat)</>, weitereReferenzen]} />
        <P muted>Zitat fehlt noch. Keine Destinations-Referenz: über Nähe, eigene Drehs und frische Formate ausgleichen.</P>
      </Slide>

      <Slide n={18} title="Was wir mit Ihnen klären wollen" kern="Auswahl aus dem Fragen-Pool, nicht alle stellen.">
        {fragenPool.map((c) => (
          <div key={c.t}>
            <P><b>{c.t}</b></P>
            <List items={c.q} />
          </div>
        ))}
      </Slide>
    </main>
  );
}
