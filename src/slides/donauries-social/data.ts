// DONAURIES social media pitch (Nov 2026). Sources: client folder D/Donauries/00_Allgemeines/07_Briefings/01_Pitch
// (outline.md, 2026-11-02_Recherche-Region.md). Slides and Leitfaden read the same data.

export const regionFacts: [string, string][] = [
  ['44', 'Städte, Märkte und Gemeinden'],
  ['135.000', 'Einwohner'],
  ['2,9 %', 'Arbeitslosenquote'],
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
  { t: 'Ein Kanal, zwei Absender', d: 'Tourismus und Arbeitgebermarke laufen über denselben Kanal. Bei vergleichbaren Regionen ist das selten.' },
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
  { t: 'Instagram und Facebook', s: 'Kern', d: 'Hier ist die Community heute. Formate, Collab-Posts, Stories zu Events.' },
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

export const team: { n: string; r: string; d: string; img: string[] }[] = [
  { n: 'Daniel & Karlheinz', r: 'Geschäftsführung', d: 'Bezug zu Donauwörth bzw. dem Ries', img: ['/team/avatar-daniel-hurle.jpg', '/team/avatar-karlheinz-uhl.jpg'] },
  { n: 'Rupert', r: 'Content-Ideen und Umsetzung', d: '', img: ['/team/avatar-rupert-lohse.jpg'] },
  { n: 'Annalena', r: 'Design der Beiträge und Planung', d: '', img: ['/team/avatar-annalena-geier.jpg'] },
  { n: 'Kai', r: 'Copywriting & Interviewführung', d: '', img: ['/team/avatar-kai-mueller.jpg'] },
  { n: 'Cedric', r: 'Video und Fotografie', d: '', img: ['/team/avatar-cedric-weber.jpg'] },
];

export const referenzen: { t: string; s: string; d: string }[] = [
  { t: 'München Standortkarte', s: 'Regionalität', d: 'Zitat folgt' },
  { t: 'FinLers', s: 'Bezug Donauwörth', d: 'Arbeitsschutz, Gesundheitsmanagement und Betriebsmedizin. Laufendes Content Marketing für Instagram, Facebook, LinkedIn und Blog.' },
  { t: 'Social Media', s: 'Weitere Referenzen', d: 'Reitzner · IntHome · Kinetikum · Therapiezentrum Augsburg · Blobel Consulting · AWI Consulting' },
];

export const fragen: { t: string; q: string[] }[] = [
  { t: 'Ziele', q: ['Woran merken Sie in einem Jahr, dass der Wechsel richtig war?', 'Wer kommt heute zu kurz, Tourismus oder Wirtschaft?'] },
  { t: 'Content', q: ['Was hat die bisherige Agentur geliefert?', 'Wie viel Material können die Vereine selbst liefern?'] },
  { t: 'Rahmen', q: ['Gibt es ein eigenes Mediabudget?', 'Wäre ein Auftakt-Workshop schon im Dezember denkbar?'] },
];
