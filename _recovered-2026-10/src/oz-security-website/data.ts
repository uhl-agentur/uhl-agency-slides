// SEO/GEO analysis of ozsecurity.de, 15.10.2026. Raw files in the session scratchpad (oz/, oz-sistrix.json).

export const kurz: [string, string][] = [
  ['Bei Google kaum sichtbar', 'Sichtbarkeitsindex 0. Alle Leistungen stehen auf einer Seite, dadurch kein Ranking für „Objektschutz“ und Co.'],
  ['Anfragen schwer gemacht', 'Keine Kontaktseite, kein Formular, keine klickbare Telefonnummer. Bewerbung nur per E-Mail.'],
  ['Recruiting ist ein eigenes Suchfeld', '„Sicherheitsdienst Jobs“ wird 1.600-mal im Monat gesucht, fast so oft wie „Objektschutz“.'],
  ['Starke Basis vorhanden', 'Seit 1998, echte Referenzen wie KUKA und Revolverheld. Das zeigt kein Wettbewerber.'],
];

type Status = 'filled' | 'outline' | 'light';

export const seo: [string, string, Status, string][] = [
  ['Seitenumfang', 'fehlt', 'filled', 'Fünf Seiten, alle Leistungen als Abschnitte auf einer einzigen Seite.'],
  ['Kontaktwege', 'fehlt', 'filled', 'Keine Kontaktseite, kein Formular, keine klickbare Telefonnummer.'],
  ['Aktualität', 'fehlt', 'filled', 'Letzte Änderung August 2023, im Footer „Copyright 2023“.'],
  ['Strukturierte Daten', 'Baustelle', 'outline', 'Keine Firmendaten mit Adresse und Telefon im Code.'],
  ['Bildtexte', 'Baustelle', 'outline', 'Auf der Startseite fehlen bei 12 von 23 Bildern die Alt-Texte.'],
  ['Technik und Sicherheit', 'Baustelle', 'outline', 'Theme und SEO-Plugin von 2023, Benutzername „admin“ öffentlich lesbar.'],
  ['Darstellung', 'Baustelle', 'outline', 'Textblöcke doppelt, sichtbarer Rest „admin“ mit Zeitstempel.'],
  ['Grundlagen', 'gut', 'light', 'SSL, Sitemap, Weiterleitungen, eindeutige Seitentitel.'],
];

export const geo: [string, string, Status, string][] = [
  ['Klare Aussage zu Ort und Leistung', 'Baustelle', 'outline', 'Hauptüberschrift „Ihr zuverlässiger Security Service seit 1998!“, ohne Augsburg.'],
  ['Eigene Seite je Leistung', 'fehlt', 'filled', 'Werkschutz, Personenschutz, Diskothekenschutz nur auf einer Sammelseite.'],
  ['Fragen und Antworten', 'fehlt', 'filled', 'Keine Antworten zu §34a, Kosten oder Ablauf.'],
  ['Zertifikate', 'Baustelle', 'outline', 'DIN 77200 und ISO 9001 nur im Fließtext, mit den Jahren 2006 und 2008.'],
  ['Referenzen', 'Baustelle', 'outline', 'Starke Namen, aber als Textliste, Einsätze meist 2002 bis 2014.'],
  ['Einträge im Netz', 'Baustelle', 'outline', 'Das Örtliche führt noch Sommestraße und eine alte Telefonnummer.'],
  ['Bewertungen', 'gut', 'light', 'Google 4,9 Sterne aus 23 Bewertungen (laut trustlocal).'],
  ['KI-Crawler', 'gut', 'light', 'robots.txt erlaubt alles.'],
];

export const mapping: [string, string, string][] = [
  ['1.700', 'Objektschutz', 'Eigene Leistungsseite Objekt- und Werkschutz'],
  ['1.600', 'Sicherheitsdienst Jobs', 'Karriereseite mit konkreten Stellen'],
  ['150', 'Sicherheitsdienst Augsburg', 'Startseite: Titel und Hauptüberschrift'],
  ['100', 'Security Augsburg', 'Startseite und Seite Veranstaltungsschutz'],
  ['Lücke', 'Diskothekenschutz, Konzert-Security', 'Eigene Seite, hat in Augsburg noch kein Wettbewerber'],
];

export const mappingNote = 'Suchvolumen: Sistrix, geschätzt. „Lücke“: kein Volumen gemessen, aber kein Wettbewerber hat dafür eine eigene Seite.';

export const stand = [
  'Alle Leistungen auf einer Seite',
  'Keine Kontaktseite, kein Formular, keine klickbare Telefonnummer',
  'Bewerbung nur per E-Mail, keine konkreten Stellen',
  'Zertifikate und Referenzen im Fließtext versteckt',
  'Seit August 2023 nicht mehr aktualisiert',
  'Firmendaten in Verzeichnissen teils veraltet',
];

export const machen = [
  'Neue Website mit klarer Aussage: Sicherheitsdienst in Augsburg seit 1998',
  'Eigene Seite je Leistung, auch Diskothekenschutz und Konzert-Security',
  'Karriereseite mit Stellen und Schnellbewerbung in drei Klicks',
  'Anfrage nach Leistung, Telefon auf jeder Seite, 24/7-Nummer',
  'Zertifikate und Referenzen als Fallbeispiele sichtbar',
  'Saubere Grundlagen und aktuelle, sichere Technik',
];

export const addons = [
  {
    t: 'Quick Wins',
    s: 'hoher Nutzen · wenig Aufwand',
    dark: true,
    items: ['Schnellbewerbung ohne Lebenslauf', 'Bewerbung per WhatsApp', 'Zertifikate- und Vertrauensleiste', 'Bewertungen auf der Website', 'Rückruf-Service'],
  },
  {
    t: 'Große Hebel',
    s: 'hoher Nutzen · mehr Aufwand',
    items: ['Stellenbörse mit Filtern, sichtbar in Google Jobs', 'Anfrage-Strecke nach Leistung, ohne Preise', 'Branchenseiten: Industrie, Handel, Events, Baustellen', 'Kundenportal mit digitalem Wachbuch'],
  },
  {
    t: 'Nice to have',
    s: 'mittlerer Nutzen · wenig Aufwand',
    items: ['Karriere-Videos aus dem Team', 'Mitarbeiter werben Mitarbeiter', 'Fragen und Antworten zu §34a', 'Blog mit Einsatzberichten'],
  },
];

export const fragen = [
  {
    t: 'Ziele',
    q: ['Welche Aufträge wollen Sie mehr: Objektschutz, Veranstaltungen oder Personenschutz?', 'Wie viele Mitarbeiter suchen Sie gerade?', 'Woher kommen heute die meisten Anfragen?'],
  },
  {
    t: 'Website',
    q: ['Welche Zertifikate sind aktuell gültig?', 'Wie viel wollen Sie selbst pflegen?'],
  },
];

// Wettbewerb (for the Leitfaden), checked 15.10.2026 via direct site visits
export const wettbewerb = [
  'Geiselhart Security (Biburg/Diedorf): 11 Leistungsseiten plus 11 Stadtseiten im Landkreis, Bewertungs-Widget. Keine Stellen, keine Online-Bewerbung.',
  'Monkey Security (Augsburg): rund 20 Unterseiten „in Augsburg“, Jobs mit Formular, ProvenExpert und Google 5,0 eingebunden.',
  'UNI-TED Security (Augsburg, Regensburg): einziger mit sichtbarer DIN 77200 und ISO 9001 (DEKRA), Stellenliste mit Filter. Modernstes Design.',
  'Custodia Protection (Königsbrunn): 24/7-Notruf, Angebotsanfrage in 5 Schritten, Bewerbung ohne Lebenslauf, Fachblog. Setzt den Maßstab.',
  'ICPS (Augsburg): teils Leistungsseiten, Bewerbung über Google Forms.',
  'Echte Kundenreferenzen mit Namen zeigt keiner der Wettbewerber, nur OZ.',
  'Diskothekenschutz und Konzert-Security hat kein Wettbewerber als eigene Seite.',
];

// Google.de and AI assistants: filled once the manual checks are pasted
export const google: { karte: [string, string][]; treffer: string[]; ki: string[]; takeaway: string } | null = null;
export const ki: { name: string; genannt: boolean; wie: string; andere: string }[] | null = null;
