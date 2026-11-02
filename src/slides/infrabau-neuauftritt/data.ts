// Content source: artifact "Infrabau Neuauftritt" (claude.ai/artifact/FfjspkU7WtD8k3u2mBf5Q9), research 14.10.2026

export interface Fazit {
  short: string;
  title: string;
  daher: string;
  belege: string[];
}

export const fazits: Fazit[] = [
  {
    short: 'Ohne Website keine Anfragen',
    title: 'Ohne Website keine Anfragen, und Google vergisst infrabau gerade',
    daher: 'Neue Hauptseite hat oberste Priorität. Erst schlank online, dann ausbauen.',
    belege: [
      'infrabau.de ist offline.',
      'Bei Google noch Platz 2 bis 7, aber nur aus dem alten Index. Das fällt weg, je länger die Seite fehlt.',
    ],
  },
  {
    short: 'Keiner sagt, warum sicher',
    title: 'Alle werben mit Jahren. Keiner sagt, warum man bei ihm sicher kauft.',
    daher: 'infrabau wird der Bauträger, bei dem man sicher kauft: Absicherung, feste Preise für Sonderwünsche, Gewährleistung offen erklärt.',
    belege: [
      'Alle 6 Bauträger der Region werben mit Erfahrung und Qualität.',
      'Käufer fragen immer wieder: Was, wenn der Bauträger pleitegeht? Was kosten Sonderwünsche?',
      'Die einzige 1-Stern-Bewertung kritisiert genau das.',
    ],
  },
  {
    short: 'Unbeantwortete Kritik',
    title: 'Unbeantwortete Kritik kostet Käufer',
    daher: 'Auf jede Bewertung antworten, gerade auf die kritischen. Käufer nach der Übergabe um Bewertungen bitten.',
    belege: [
      'Google: 4,6 Sterne aus 40 Bewertungen.',
      'Positive werden beantwortet, die 1-Stern-Bewertung nicht. Auf 11880 die nächste.',
      'Käufer lesen zuerst die schlechten Bewertungen und schauen, wie die Firma reagiert.',
    ],
  },
  {
    short: 'Drei Adressen im Netz',
    title: 'Im Netz stehen drei Adressen und zwei Telefonnummern',
    daher: 'Firmendaten überall vereinheitlichen und Alteinträge löschen lassen.',
    belege: [
      'Richtig: Daimlerstraße 19 im Google-Profil.',
      'Dazu Dieselstraße 25 und Hirtenmahdweg auf Gelbe Seiten, 11880 und Yelp.',
      'Eine falsche Nummer auf 11880, Branche „Immobilienmakler“ auf Trustlocal.',
    ],
  },
  {
    short: 'Digitale Werkzeuge fehlen',
    title: 'Digitale Werkzeuge hat in der Region fast niemand',
    daher: 'Mit Rechnern, Online-Terminen und Wohnungsauswahl am Gebäude hebt sich infrabau sichtbar ab.',
    belege: [
      'Wohnungsauswahl am Gebäude und Baustellen-Tagebuch: bei keinem Bauträger.',
      'Förder- oder Finanzierungsrechner: nur Layer.',
      'Online-Terminbuchung: bei keinem sichtbar.',
    ],
  },
  {
    short: 'Neubau teurer als Bestand',
    title: 'Neubau ist knapp, aber teurer als Bestand',
    daher: 'Kosten und Förderung transparent machen. Der Mehrpreis muss sich durch Förderung, Energie und Sicherheit erklären.',
    belege: [
      'Fertigstellungen 2025 in Bayern minus 16 %, Tief seit 2012.',
      '73 % der Bestandswohnungen in Augsburg kosten unter 5.000 €/m².',
      'KfW bis 270.000 € für Familien, 5 % Abschreibung pro Jahr für Anleger.',
    ],
  },
  {
    short: 'Projekte unter die Marke',
    title: 'Projekte gehören unter die Marke infrabau',
    daher: 'Jedes Projekt wird eine Seite unter infrabau.de, eigene Domains wie wertachufer.de leiten nur weiter.',
    belege: [
      'Eigene Projektdomains starten bei null und verschwinden nach dem Abverkauf mitsamt Rankings.',
      'Den Ranking-Vorteil durch den Namen in der Domain gibt es seit 2012 nicht mehr.',
      'Eigener Look pro Projekt geht auch als Projektseite.',
    ],
  },
  {
    short: 'Grundstücke sind der Engpass',
    title: 'Nicht nur Käufer zählen: Grundstücke sind der Engpass',
    daher: 'Eigener Einstieg für Grundstücksverkäufer, neben Eigennutzern, Anlegern und Bewerbern.',
    belege: [
      'Ohne Grundstück kein Projekt.',
      '„Grundstück verkaufen“ wird 1.500-mal im Monat gesucht.',
      'Kommunen nur, wenn infrabau an Ausschreibungen teilnimmt.',
    ],
  },
  {
    short: 'Social Media überzeugt nicht',
    title: 'Social Media zeigt bisher nicht, was infrabau baut',
    daher: 'Ganz oder gar nicht: Instagram mit einem Grundstock an Videos, LinkedIn mit Hauptaccount und Autorenprofilen.',
    belege: [
      'Instagram läuft über eine externe Agentur und überzeugt aktuell nicht.',
      'LinkedIn: kaum eigene Beiträge, meist geteilte Inhalte.',
      'KLAUS erklärt eine Wohnung in 60 Sekunden: rund 48.000 Aufrufe in fünf Tagen.',
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
    title: 'Umzug und Fundament',
    ziel: 'Sauber aufgestellt, damit ein Ausfall wie jetzt nicht wieder passiert.',
    pflicht: [
      'Umzug zu IONOS oder ALL-INKL in unseren Partner-Account',
      'Webspace aufräumen: alte Unterverzeichnisse raus',
      'Die vier Backend- und SFTP-Zugänge entfernen',
      'Updates, tägliche Backups, Überwachung',
      'Bewertungen beantworten, Firmendaten bereinigen',
    ],
    optional: [],
  },
  {
    n: '2',
    title: 'Hauptseite infrabau.de',
    ziel: 'Schlank online und Vertrauen aufbauen.',
    pflicht: [
      'Wer infrabau ist, Projekte, Kontakt',
      'Einstiege je Zielgruppe',
      '„Sicher kaufen“ und Kaufablauf',
      'Jede Anfrage direkt in OnOffice',
    ],
    optional: [
      'Nebenkosten- und Finanzierungsrechner',
      'Besichtigung online buchen',
      'Vertrauensleiste und Garantie',
    ],
  },
  {
    n: '3',
    title: 'Projektseiten',
    ziel: 'Jedes Projekt verkauft aus einer Vorlage.',
    pflicht: [
      'Eine Vorlage für alle Projekte',
      'Wertachufer zuerst, dann alle laufenden',
      'Wohnungsliste, Grundrisse, Exposé, Interessentenliste',
      'Projekt-Domains leiten weiter',
    ],
    optional: [
      'Ads zum Verkaufsstart je Projekt',
      'Merkliste, Hinweis auf knappe Verfügbarkeit',
      'Förder-Check, Rechner für Anleger',
    ],
  },
  {
    n: '4',
    title: 'Ausbau',
    ziel: 'Mehr Anfragen über Google und neue Werkzeuge.',
    pflicht: [
      'Ortsseiten und Ratgeber für Google',
      'Messen, was Anfragen bringt',
      'Laufende Betreuung',
    ],
    optional: [
      'Online-Immobilienbewertung',
      'KI-Wohnungssuche',
      'Wohnung am Gebäude auswählen',
      '360°-Rundgang, Konfigurator, Lagekarte',
    ],
  },
];
