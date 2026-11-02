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
  { k: 'YouTube', n: '340', d: 'Abos, Landkreis-Kanal' },
  { k: 'Komoot', n: '–', d: 'Möglichkeit, noch offen' },
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
  { t: 'Follow-for-Follow', d: 'Viele Follower kommen über gegenseitiges Folgen und interessieren sich kaum für die Inhalte.' },
  { t: 'Wenig Engagement', d: 'Likes, Kommentare und Shares bleiben im Verhältnis zur Followerzahl gering.' },
  { t: 'Content von der Stange', d: 'Viele KI-Captions wirken unpersönlich, Videos passen inhaltlich kaum zu Short-Form und verlieren früh Zuschauer.' },
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
  { t: 'Instagram & Facebook', s: 'Kern', d: 'Hier ist das Publikum heute. Formate, Collab-Posts, Stories zu Events.' },
  { t: 'TikTok', s: 'neu', d: 'Für Ausflug und Urlaub. Gleiche Drehs, eigener Schnitt.' },
  { t: 'Komoot', s: 'neu', d: 'Wander- und Radtouren als Collections, verknüpft mit Reels aus der Region.' },
  { t: 'Website', s: 'optional', d: 'Die Zentrale: Blog und Eventkalender, synchron zu allen Kanälen.' },
  { t: 'YouTube & Google Maps', s: 'ergänzend', d: 'Mini-Dokus in voller Länge, kuratierte Listen mit Ausflugszielen in Google Maps.' },
  { t: 'Paid Social', s: 'gezielt', d: 'Budget zuerst in Creator- und UGC-Content, Anzeigen für Events und Highlights.' },
];

export const website = {
  optionen: [
    { t: 'Bestehende Seiten neu aufsetzen', d: 'Ferienland und Wirtschaftsförderverband bekommen einen frischen Auftritt.' },
    { t: 'Eine gemeinsame DONAURIES-Seite', d: 'Eine Seite für Tourismus und Wirtschaft, passend zum gemeinsamen Kanal.' },
  ],
  inhalte: [
    'Verstärkt die Reichweite: Gerade ältere Zielgruppen informieren sich weiterhin über Websites',
    'Blogbeiträge zu jedem Format, synchron zu Reels und Posts',
    'Eventkalender, der Social Media und Website gleichzeitig füttert',
    'Touren aus Komoot und Mini-Dokus direkt eingebunden',
  ],
  warum: 'Verstärkt die Reichweite: Gerade ältere Zielgruppen informieren sich weiterhin über Websites.',
  shop: { t: 'Shop ausbauen', d: 'Merch mit eigenem Slogan mit Augenzwinkern, nach dem Vorbild der Baden-Württemberg-Kampagne „Schön hier. Aber waren Sie schon mal in Baden-Württemberg?“' },
};

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

// Event year 2027 (research 02.11.2026): confirmed only Reichsstraßenfest, Wolle-Festival, Ipf-Ries-Halbmarathon;
// all others follow the 2026 pattern (sources in 07_Briefings/01_Pitch, Recherche)
export const jahr: { m: string; e: string[] }[] = [
  { m: 'Jan', e: ['Faschingsbälle im ganzen Landkreis'] },
  { m: 'Feb', e: ['Faschings\u00adumzug Megesheim', 'Genderkinger Gaudiwurm', 'Tillywurm Rain', 'Faschings\u00adumzug Donauwörth', 'Faschings\u00adumzug Mertingen'] },
  { m: 'Mär', e: [] },
  { m: 'Apr', e: ['Wolle-Festival Nördlingen'] },
  { m: 'Mai', e: ['Stabenfest Nördlingen', 'Ipf-Ries-Halbmarathon', 'Historischer Markt Oettingen', 'Eisenbahnfest Nördlingen', 'Fuchsien- und Kräutermarkt Wemding', 'Residenz\u00adkonzerte Oettingen'] },
  { m: 'Jun', e: ['Inselfest Donauwörth', 'Nördlinger Mess\' und RVA', 'Mittelalter\u00admarkt Burg Harburg', 'Brückenfest Harburg', 'Freilichtbühne Donauwörth', 'Bockfest Harburg', 'Leitheimer Schloss\u00adkonzerte'] },
  { m: 'Jul', e: ['25. Reichsstraßen\u00adfest Donauwörth', 'Schwäbisch\u00adwerder Kindertag', 'Scharlachrennen Nördlingen', 'Hangover Party Mertingen', 'Rainer Stadtfest', 'Jakobi-Kirchweih Oettingen', 'Nördlinger Stadtlauf', 'Blasmusik Open Air Monheim', 'Jakobimarkt Rain'] },
  { m: 'Aug', e: ['Rainer Winkel Festival Münster', 'Historisches Fest Huisheim'] },
  { m: 'Sep', e: ['KulturNacht\u00adRain', 'Donau-Rieser Schaftag Maihingen'] },
  { m: 'Okt', e: ['Donauwörther Kulturtage', 'Kirchweihen im Ries'] },
  { m: 'Nov', e: ['Kunst- und Lichternacht Donauwörth', 'Weihnachts\u00adduft Donauwörth', 'Christkindles\u00admarkt Oettingen'] },
  { m: 'Dez', e: ['Weihnachts\u00admarkt Nördlingen', 'Weihnachts\u00admarkt Insel Ried Donauwörth'] },
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
  'Kommentare und Nachrichten größtenteils selbst beantworten',
  'Konkrete Fachfragen mit Ihnen abstimmen',
  'Partner, Gemeinden und Creator markieren und einbinden',
  'Interaktive DMs: Stichwort kommentieren, Link per Direktnachricht',
];

// Why Uhl: only what we know about ourselves
export const warumUhl: { t: string; d: string }[] = [
  { t: 'Nähe zur Region', d: 'Daniel kommt aus Donauwörth, Karlheinz aus dem Ries. Wir drehen selbst vor Ort, ohne lange Anfahrt.' },
  { t: 'Alles im eigenen Team', d: 'Strategie, Text und Interview, Design, Video und Foto aus einer Hand.' },
  { t: 'Drei Generationen im Team', d: 'Für jede Plattform passt jemand zur Zielgruppe und weiß, was dort funktioniert.' },
  { t: 'Feste Abläufe', d: 'Klarer Monatsrhythmus, ein Online-Meeting, ein Reporting mit Empfehlungen.' },
];

export const team: { n: string; r: string; d: string; img: string[] }[] = [
  { n: 'Daniel', r: 'Geschäftsführung', d: '', img: ['/team/daniel-hurle.jpg'] },
  { n: 'Karlheinz', r: 'Geschäftsführung', d: '', img: ['/team/karlheinz-uhl.jpg'] },
  { n: 'Rupert', r: 'Content Creator', d: '', img: ['/team/rupert-lohse.jpg'] },
  { n: 'Annalena', r: 'Social Media Managerin', d: '', img: ['/team/annalena-geier.jpg'] },
  { n: 'Kay', r: 'Redakteur', d: '', img: ['/team/kai-mueller.jpg'] },
  { n: 'Cedric', r: 'Video & Fotografie', d: '', img: ['/team/cedric-weber.jpg'] },
];

// Main reference with quote (placeholder rendered red until the quote arrives), others small below
export const hauptReferenz = { t: 'Landeshauptstadt München', s: 'Referat für Arbeit und Wirtschaft', quote: 'Zitat folgt', todo: true };
export const weitereReferenzen = 'Weitere Referenzen: FinLers, Donauwörth (Content Marketing) · Social Media: Reitzner, IntHome, Kinetikum, Therapiezentrum Augsburg';

export const fragen: { t: string; q: string[] }[] = [
  { t: 'Ziele', q: ['Woran merken Sie in einem Jahr, dass der Wechsel richtig war?', 'Wer kommt heute zu kurz, Tourismus oder Wirtschaft?'] },
  { t: 'Content', q: ['Was hat die bisherige Agentur geliefert?', 'Wie viel Material können die Vereine selbst liefern?'] },
  { t: 'Rahmen', q: ['Gibt es ein eigenes Mediabudget?', 'Wäre ein Auftakt-Workshop schon im November denkbar?'] },
];
