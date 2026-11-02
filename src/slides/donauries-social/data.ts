// DONAURIES social media pitch (Nov 2026). Sources: client folder D/Donauries/00_Allgemeines/07_Briefings/01_Pitch
// (outline.md, 2026-11-02_Recherche-Region.md). Slides and Leitfaden read the same data.

export const regionFacts: [string, string][] = [
  ['44', 'Städte, Märkte und Gemeinden'],
  ['135.000', 'Einwohner'],
  ['UNESCO', 'Global Geopark Ries'],
];

export const kanaele: { k: string; n: string; d: string }[] = [
  { k: 'Instagram', n: '9.250', d: '530 Beiträge' },
  { k: 'Facebook', n: '9.287', d: 'gemeinsamer Kanal' },
  { k: 'TikTok', n: '–', d: 'kein Kanal' },
];

export const vergleich: [string, number, string][] = [
  ['@allgaeu.de', 118, '118K'],
  ['@altmuehltal', 30, '30K'],
  ['@eifeltourismus', 20, '20K'],
  ['@donauries.bayern', 9.3, '9,3K'],
];

export const auffaellig: { t: string; d: string }[] = [
  { t: 'Ein Kanal, zwei Themen', d: 'Tourismus und Wirtschaft teilen sich einen Kanal. Das braucht eine klare gemeinsame Linie.' },
  { t: 'Partner markiert, nicht Collab', d: 'Betriebe sind markiert, aber nicht als Collab-Partner angegeben. Der Beitrag erscheint nur bei DONAURIES.' },
  { t: 'Kein TikTok', d: 'Gerade für Ausflüge und Urlaub wird TikTok wie eine Suchmaschine genutzt.' },
];

export const leitidee = 'Eine Region, die man sehen will.';
export const leitideeSub = 'Wer hier Urlaub macht, will hier leben. Wer hier arbeitet, zeigt es gern.';

export const prinzipien: { t: string; d: string }[] = [
  { t: 'Content vor Community', d: 'Community entsteht, wenn Inhalte sehenswert sind.' },
  { t: 'Feste Formate', d: 'Wiedererkennbare Reihen statt Einzelposts. Reels und Carousels zuerst.' },
  { t: 'Partner als Verstärker', d: 'Jeder Beitrag mit Betrieb, Gemeinde oder Event als Collab-Post.' },
  { t: 'Ein Thema, zwei Blickwinkel', d: 'Ort, Menschen, Arbeit und Freizeit in einem Beitrag.' },
];

export const kanalPlan: { t: string; s: string; d: string }[] = [
  { t: 'Instagram und Facebook', s: 'Kern', d: 'Hier ist das Publikum heute. Formate, Collab-Posts, Stories zu Events.' },
  { t: 'TikTok', s: 'neu', d: 'Für Ausflug und Urlaub. Gleiche Drehs, eigener Schnitt.' },
  { t: 'Paid Social', s: 'gezielt', d: 'Budget zuerst in Creator- und UGC-Content, Anzeigen für Events und Highlights.' },
];

export const formate: { t: string; d: string }[] = [
  { t: 'Gemacht im DONAURIES', d: 'Kurzdokus über Betriebe und Tätigkeiten' },
  { t: 'Good-to-know', d: 'Kurze Fakten über die Region' },
  { t: 'Was geht im DONAURIES', d: 'Der Event-Ausblick' },
  { t: 'Countdown Gartenschau', d: 'Auf dem Weg zur Landesgartenschau 2028' },
  { t: 'Ein Gesicht für die Region', d: 'Wiederkehrende Moderation mit Regionalbezug' },
  { t: 'Creator vor Ort', d: 'UGC von Gästen, Einheimischen und lokalen Creatorn' },
];

export const gemacht: string[] = [
  'Ausbildung zum Fluggerätmechaniker bei Airbus Helicopters',
  'Neubau in Donauwörth für rund 450 Arbeitsplätze',
  'Hama in Monheim, Zott in Mertingen, Brauerei Oettinger',
  'Die Orgelmanufaktur in Oettingen, Orgelbau seit 1847',
  'Kleine Handwerksbetriebe mit besonderem Können',
];

export const goodToKnow: string[] = [
  'Apollo-Astronauten trainierten 1970 im Ries für den Mond.',
  'Im Stein von St. Georg in Nördlingen stecken winzige Diamanten aus dem Einschlag.',
  'Nördlingen hat die einzige vollständig begehbare Stadtmauer Deutschlands.',
  'Die Harburg ist eine der größten Burganlagen Süddeutschlands.',
  'Hama in Monheim führt über 18.000 Produkte.',
  'Rund um Donauwörth: zum 35. Mal in Folge die niedrigste Arbeitslosenquote Deutschlands.',
];

// Event year 2027; months marked "voraussichtlich" are not yet announced
export const jahr: { m: string; e: string[] }[] = [
  { m: 'Apr', e: ['Wolle Festival Nördlingen'] },
  { m: 'Mai', e: ['Stabenfest Nördlingen', 'Ipf-Ries Halbmarathon', 'Historischer Markt Oettingen'] },
  { m: 'Jun', e: ['Nördlinger Mess'] },
  { m: 'Jul', e: ['25. Reichsstraßenfest Donauwörth', 'Scharlachrennen Nördlingen', 'Hangover Party Mertingen'] },
  { m: 'Dez', e: ['Weihnachtsmärkte'] },
];

export const workshop = {
  t: 'Workshop',
  s: 'Auftakt und Strategie',
  items: ['Ziele und Schwerpunkte gemeinsam festlegen', 'Social-Media-Strategie entwickeln', 'Formate und Event-Kalender planen'],
};

export const monatlich: { t: string; d: string }[] = [
  { t: 'Redaktionsplan', d: 'Themen und Termine in Notion, Abstimmung mit Ihnen' },
  { t: 'Dreh vor Ort', d: 'Gebündelt nach Region und Anlass' },
  { t: 'Veröffentlichung', d: 'Beitragsplanung über Metricool, mit Collab-Posts' },
  { t: 'Online-Meeting', d: 'Reporting und konkrete Empfehlungen' },
];

// Controlling and community management (our plan, no client facts)
export const kpis: string[] = ['Reichweite', 'Shares und Saves', 'Profilaufrufe', 'Follower-Entwicklung', 'Interaktionsrate'];

export const controlling: string[] = [
  'Monatliches Reporting im Online-Meeting',
  'Was gut lief, was nicht, und warum',
  'Konkrete Empfehlungen für den nächsten Monat',
];

export const community: string[] = [
  'Kommentare und Direktnachrichten betreuen',
  'Fachliche Fragen gemeinsam mit den Vereinen beantworten',
  'Partner, Gemeinden und Creator markieren und einbinden',
  'Interaktive DMs: Stichwort kommentieren, Link per Direktnachricht',
];

// Why Uhl: only what we know about ourselves
export const warumUhl: { t: string; d: string }[] = [
  { t: 'Nähe zur Region', d: 'Wir kennen den Landkreis und drehen selbst vor Ort, ohne lange Anfahrt.' },
  { t: 'Alles im eigenen Team', d: 'Strategie, Text und Interview, Design, Video und Foto aus einer Hand.' },
  { t: 'Formate statt Einzelposts', d: 'Wiedererkennbare Reihen, die Tourismus und Wirtschaft verbinden.' },
  { t: 'Feste Abläufe', d: 'Klarer Monatsrhythmus, ein Online-Meeting, ein Reporting mit Empfehlungen.' },
];

export const team: { n: string; r: string; d: string; img: string[] }[] = [
  { n: 'Daniel', r: 'Geschäftsführung', d: '', img: ['/team/daniel-hurle.jpg'] },
  { n: 'Karlheinz', r: 'Geschäftsführung', d: '', img: ['/team/karlheinz-uhl.jpg'] },
  { n: 'Rupert', r: 'Content-Ideen & Umsetzung', d: '', img: ['/team/rupert-lohse.jpg'] },
  { n: 'Annalena', r: 'Design der Beiträge & Planung', d: '', img: ['/team/annalena-geier.jpg'] },
  { n: 'Kai', r: 'Copywriting & Interviewführung', d: '', img: ['/team/kai-mueller.jpg'] },
  { n: 'Cedric', r: 'Video & Fotografie', d: '', img: ['/team/cedric-weber.jpg'] },
];

// todo: placeholder still to be filled, rendered red so it is not presented by accident
export const referenzen: { t: string; s: string; d: string; todo?: boolean }[] = [
  { t: 'München Standortkarte', s: 'Regionalität', d: 'Zitat folgt', todo: true },
  { t: 'FinLers', s: 'Bezug Donauwörth', d: 'Arbeitsschutz, Gesundheitsmanagement und Betriebsmedizin. Laufendes Content Marketing für Instagram, Facebook, LinkedIn und Blog.' },
  { t: 'Social Media', s: 'Weitere Referenzen', d: 'Reitzner · IntHome · Kinetikum · Therapiezentrum Augsburg' },
];

export const fragen: { t: string; q: string[] }[] = [
  { t: 'Ziele', q: ['Woran merken Sie in einem Jahr, dass der Wechsel richtig war?', 'Wer kommt heute zu kurz, Tourismus oder Wirtschaft?'] },
  { t: 'Content', q: ['Was hat die bisherige Agentur geliefert?', 'Wie viel Material können die Vereine selbst liefern?'] },
  { t: 'Rahmen', q: ['Gibt es ein eigenes Mediabudget?', 'Wäre ein Auftakt-Workshop schon im Dezember denkbar?'] },
];
