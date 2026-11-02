// Content source: research 14.10.2026 (website audit, directories, competitor check). Raw files in the session scratchpad.

export const fields = [
  { t: 'Öffentliche Bauten', n: '9', d: 'Büchereien, Bürgerbüros, Kitas, Kirchengemeinden' },
  { t: 'Wohnbauten', n: '10', d: 'Einfamilienhaus bis Mehrfamilienhaus, Villa, Penthouse' },
  { t: 'Industrie & Gewerbe', n: '3', d: 'Spedition, Bürogebäude, Logistik (Rational)' },
  { t: 'Wettbewerbe', n: '3', d: 'Realisierungswettbewerbe, VgV-Verfahren' },
];

export const facts = [
  ['2010', 'gegründet in Augsburg'],
  ['4', 'Personen im Team'],
  ['24', 'Referenzen online'],
  ['5,0', 'Sterne aus 20 Bewertungen'],
];

export const groups = [
  { t: 'Öffentliche Auftraggeber', w: 'Stadt, Gemeinden, Kirchen', s: 'Referenzen, Leistungsphasen, Termintreue', heute: 'teilweise' },
  { t: 'Private Bauherren', w: 'Familien, Paare, Eigentümer', s: 'Ablauf, Kosten, Vertrauen', heute: 'teilweise' },
  { t: 'Unternehmen', w: 'Gewerbe, Industrie, Investoren', s: 'Kosten- und Terminsicherheit', heute: 'teilweise' },
  { t: 'Bewerber', w: 'Architekten, Studierende', s: 'Projekte, Team, Perspektive', heute: 'fehlt' },
];

// filled = fehlt, outline = Baustelle, light = gut
export const istRows: [string, string, 'filled' | 'outline' | 'light', string][] = [
  ['Projekte', 'gut', 'light', 'Gute Texte, viele Bilder, Filter nach Kategorie'],
  ['Positionierung', 'fehlt', 'filled', 'Startseite ist nur ein Projektraster, kein Versprechen'],
  ['Anfragen', 'fehlt', 'filled', 'Kein Formular, Telefon nur auf der Kontaktseite'],
  ['Google-Grundlagen', 'fehlt', 'filled', 'Keine Hauptüberschriften, keine Seitenbeschreibungen'],
  ['Technik', 'Baustelle', 'outline', 'Elementor plus drei Zusatzpakete, 54 Skript- und Stildateien'],
  ['Bewertungen', 'Baustelle', 'outline', '5,0 Sterne, aber nirgends auf der Website sichtbar'],
  ['Social Media', 'fehlt', 'filled', 'Keine Profile verlinkt'],
];

export interface Fazit {
  short: string;
  title: string;
  daher: string;
  belege: string[];
}

export const fazits: Fazit[] = [
  {
    short: 'Klar sagen, wofür das Büro steht',
    title: 'Die Startseite muss in Sekunden sagen, wofür das Büro steht',
    daher: 'Startseite mit Hauptaussage, drei Schwerpunkten und den stärksten Referenzen, statt nur einem Projektraster.',
    belege: [
      'Die Startseite zeigt heute rund 150 Wörter und ein Projektraster.',
      'Es gibt kein Versprechen und keinen Einstieg je Zielgruppe.',
    ],
  },
  {
    short: 'Drei Wege für drei Zielgruppen',
    title: 'Drei Zielgruppen brauchen drei eigene Wege',
    daher: 'Eigene Bereiche für öffentliche Auftraggeber, private Bauherren und Unternehmen, jeweils mit passenden Referenzen.',
    belege: [
      'Walcher deckt Bücherei, Kita, Einfamilienhaus und Logistik ab. Diese Spannweite hat in der Region kaum ein Büro.',
      'Heute spricht die Seite alle gleichzeitig an.',
    ],
  },
  {
    short: 'Anfragen leicht machen',
    title: 'Anfragen müssen mit einem Klick möglich sein',
    daher: 'Telefon im Kopf jeder Seite, Formular für Projektanfragen, Kontakt-Hinweis unter jedem Projekt.',
    belege: [
      'Kein Kontaktformular, kein Hinweis zur Anfrage unter den Projekten.',
      'Die Telefonnummer steht nur auf der Kontaktseite. Bei den Wettbewerbern ist sie meist in Kopf oder Fuß.',
    ],
  },
  {
    short: 'Projekt-Steckbriefe für Vergaben',
    title: 'Projekt-Steckbriefe, die bei Vergaben überzeugen',
    daher: 'Jedes Projekt mit Jahr, Auftraggeber, Fläche, Kosten, Leistungsphasen und Status in fester Struktur.',
    belege: [
      'Leistungsphasen stehen schon drin, Jahr, Fläche und Auftraggeber fehlen.',
      'Kommunen bewerten bei VgV-Verfahren genau diese Daten.',
      'Fast kein Wettbewerber zeigt sie einheitlich.',
    ],
  },
  {
    short: 'Bei Google gefunden werden',
    title: 'Die Suche besetzen, solange die Büros es nicht tun',
    daher: 'Google-Grundlagen sauber, eigene Seiten für Suchen wie „Architekt Augsburg“, „Kita planen“ oder „Einfamilienhaus Augsburg“.',
    belege: [
      'Bei Architekten-Suchen in Augsburg stehen fast nur Portale oben, kaum ein Büro mit eigener Seite.',
      'Heute fehlen Hauptüberschriften und Seitenbeschreibungen, mehrere Projekte haben denselben Titel.',
    ],
  },
  {
    short: 'Bewertungen sichtbar machen',
    title: 'Die guten Bewertungen sichtbar machen',
    daher: 'Sterne und Kundenstimmen auf der Website zeigen, Profile in den Portalen übernehmen und pflegen.',
    belege: [
      '5,0 Sterne aus 20 Bewertungen, Platz 3 unter Architekten in Augsburg bei werkenntdenBESTEN.',
      'Das Profil dort ist nicht übernommen und verlinkt noch die alte Domain.',
      'Kein Büro in der Region bindet Bewertungen auf der eigenen Seite ein.',
    ],
  },
  {
    short: 'Ablauf und Kosten erklären',
    title: 'Private Bauherren wollen wissen, wie es abläuft und was es kostet',
    daher: 'Seite „So arbeiten wir“: Schritte von der ersten Idee bis zur Übergabe, Honorar grob eingeordnet, häufige Fragen.',
    belege: [
      'Nur Wachinger erklärt einen Ablauf, nur E2WO hat häufige Fragen. Beides zusammen hat niemand.',
    ],
  },
  {
    short: 'Schlanke, sichere Technik',
    title: 'Schlanke Technik statt Baukasten mit Zusatzpaketen',
    daher: 'Neuaufbau ohne Elementor-Zusatzpakete: schneller, sicherer, leichter zu pflegen.',
    belege: [
      'Elementor, Elementor Pro und Royal Addons laden 24 Stil- und 30 Skriptdateien auf der Startseite.',
      'Reste der Umstellung: Schriften kommen noch von neu.architekturbuero-walcher.de.',
    ],
  },
  {
    short: 'Bewerber gewinnen',
    title: 'Ein kleines Team braucht Nachwuchs',
    daher: 'Karriereseite mit Teamfotos, Einblicken ins Büro und offenen Stellen.',
    belege: [
      'Vier Personen im Team, keine Karriereseite.',
      'Endres + Tiefenbacher, PARS und Schrammel haben eine.',
    ],
  },
  {
    short: 'Haltung und Netzwerk zeigen',
    title: 'Haltung und Netzwerk sind Vertrauensbeweise',
    daher: 'Nachhaltiges Bauen, Wettbewerbe und das Netzwerk als eigene Inhalte zeigen.',
    belege: [
      'Präsidium im Kultur- und Kreativwirtschaftsverband Schwaben, seit 2012 im BNI.',
      'Eigene Haltung: „touch the earth lightly“, passive Solarnutzung, Photovoltaik.',
    ],
  },
];

export interface Phase {
  n: string;
  title: string;
  ziel: string;
  pflicht: string[];
  optional: string[];
}

export const phases: Phase[] = [
  {
    n: '1',
    title: 'Workshop und Konzept',
    ziel: 'Nach dem Einstieg heute gehen wir thematisch in die Tiefe.',
    pflicht: ['Zielgruppen und Schwerpunkte festlegen', 'Seitenstruktur und Inhalte planen', 'Suchbegriffe auswählen'],
    optional: [],
  },
  {
    n: '2',
    title: 'Sofort-Maßnahmen',
    ziel: 'Auf der bestehenden Seite das Nötigste beheben, bis die neue steht.',
    pflicht: ['Telefon in Kopf und Fuß', 'Hauptüberschriften und Seitenbeschreibungen', 'Impressum ergänzen, Tippfehler raus', 'Portal-Profile übernehmen'],
    optional: [],
  },
  {
    n: '3',
    title: 'Neue Website',
    ziel: 'Klar positioniert, drei Wege für drei Zielgruppen, schlanke Technik.',
    pflicht: ['Startseite mit Hauptaussage', 'Bereiche je Zielgruppe', 'Projekt-Steckbriefe', 'Anfrageformular, Kontakt unter jedem Projekt', 'Bewertungen sichtbar'],
    optional: ['„So arbeiten wir“ mit häufigen Fragen', 'Karriereseite', 'Projektkarte der Region'],
  },
  {
    n: '4',
    title: 'Sichtbarkeit',
    ziel: 'Bei Google gefunden werden, wo heute Portale stehen.',
    pflicht: ['Seiten für wichtige Suchbegriffe', 'Google-Unternehmensprofil pflegen', 'Bewertungen aktiv einsammeln'],
    optional: ['Referenzmappe für Vergaben', 'Beiträge zu Wettbewerben und Nachhaltigkeit'],
  },
  {
    n: '5',
    title: 'Ausbau und Betreuung',
    ziel: 'Laufend messen, pflegen und weiterentwickeln.',
    pflicht: ['Updates, Backups, Überwachung', 'Messen, was Anfragen bringt'],
    optional: ['Instagram und LinkedIn', 'Erstberatung online buchen'],
  },
];

export const quadrants = [
  {
    t: 'Quick Wins',
    s: 'hoher Nutzen · wenig Aufwand',
    dark: true,
    items: ['Telefon überall sichtbar', 'Formular für Projektanfragen', 'Bewertungen einbinden', 'Steckbrief-Daten ergänzen', 'Referenzmappe als PDF'],
  },
  {
    t: 'Große Hebel',
    s: 'hoher Nutzen · mehr Aufwand',
    items: ['Bereiche je Zielgruppe', 'Seiten für Suchbegriffe', '„So arbeiten wir“ mit Kosten-Einordnung'],
  },
  {
    t: 'Nice to have',
    s: 'mittlerer Nutzen · wenig Aufwand',
    items: ['Karriereseite', 'Beiträge zu Wettbewerben', 'Instagram und LinkedIn verlinken'],
  },
  {
    t: 'Später',
    s: 'mittlerer Nutzen · mehr Aufwand',
    items: ['Projektkarte der Region', 'Erstberatung online buchen', 'Projekte als 3D-Modell'],
  },
];

export const fragen = [
  {
    t: 'Ihre Ziele',
    q: ['Welche Aufträge wollen Sie mehr: öffentlich, privat oder Gewerbe?', 'Woher kommen heute die meisten Aufträge?', 'Wo fehlen Kapazitäten?'],
  },
  {
    t: 'Website',
    q: ['Wer hat die aktuelle Seite gebaut?', 'Was gefällt Ihnen, was nicht?', 'Wie viel wollen Sie selbst pflegen?'],
  },
  {
    t: 'Sichtbarkeit',
    q: ['Gibt es ein Google-Unternehmensprofil?', 'Nutzen Sie Social Media oder Werbung?', 'Suchen Sie gerade Mitarbeiter?'],
  },
];

// Competitor matrix: 1 = ja, 0.5 = teils, 0 = nein (automated check 14.10.2026, spot-checked)
export const wbCols = ['Walcher heute', 'Endres + Tiefenbacher', 'Schrammel', 'Lattke', 'PARS', 'Zuth', 'E2WO', 'Wachinger', 'Walcher neu'];
export const wbRows: [string, number[], boolean?][] = [
  ['Projekte mit Filter', [1, 1, 1, 0.5, 0, 0, 0, 1, 1]],
  ['Projektdaten im Steckbrief', [0.5, 1, 0.5, 0.5, 0, 0, 1, 0, 1]],
  ['Leistungen erklärt', [0.5, 0, 0, 0, 1, 1, 1, 1, 1]],
  ['Team mit Fotos', [1, 0, 0, 1, 1, 0.5, 0, 1, 1]],
  ['Telefon sichtbar', [0, 0, 1, 1, 1, 1, 1, 0, 1]],
  ['Kontaktformular', [0, 0, 0, 0, 0, 1, 0.5, 1, 1]],
  ['Karriereseite', [0, 1, 1, 0.5, 1, 0, 0, 0, 1]],
  ['Ablauf und Kosten erklärt', [0, 0, 0, 0, 0, 0, 0.5, 0.5, 1], true],
  ['Bewertungen eingebunden', [0, 0, 0, 0, 0, 0, 0, 0, 1], true],
];
