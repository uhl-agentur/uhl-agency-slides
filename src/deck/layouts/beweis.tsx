import React from 'react';
import { Bild, BildDaten, Folie, Kennzahl, KennzahlDaten, Liste, T } from '../system';
import { Balken, BalkenDaten, Meilenstein, Venn3, VennKreis, Zeitleiste } from '../charts';
import type { LayoutDef } from '../typen';

/* Proof, value, pricing, process and contact.
   Key figures use Kennzahl tiles (one `akzent` tile = the key figure),
   charts come from ../charts. */

/* ------------------------------------------------------------ Kennzahlen --- */
interface Kennzahlen {
  label?: string;
  aussage: string;
  kennzahlen: KennzahlDaten[];
  /** index of the one key figure (lime tile) */
  schluessel?: number;
  bild?: BildDaten;
}

interface KennzahlenText extends Omit<Kennzahlen, 'aussage' | 'bild'> {
  titel: string;
  text?: string;
}

/** grey tiles (role --hoch) in both themes, the one key figure in lime */
const Kachelreihe: React.FC<{ k: KennzahlDaten[]; schluessel?: number }> = ({ k, schluessel }) => (
  <div style={{ display: 'grid', gridTemplateColumns: `repeat(${k.length}, 440px)`, gap: 'var(--gap)', justifyContent: 'center' }}>
    {k.map((z, i) => (
      <Kennzahl key={i} k={z} max={{ wert: 6, text: 44 }} variante={i === schluessel ? 'akzent' : 'hoch'} style={{ height: 320, textAlign: 'center', alignItems: 'center' }} />
    ))}
  </div>
);

const KennzahlenBild: React.FC<Kennzahlen> = (p) => (
  <Folie label={p.label}>
    <Bild bild={p.bild} eckig schleier="voll" platzhalter="" unterschrift={false} className="voll" />
    <div className="inhalt" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 'var(--s4)', textAlign: 'center' }}>
      <T stil="aussage" as="h2" max={80}>
        {p.aussage}
      </T>
      <Kachelreihe k={p.kennzahlen} schluessel={p.schluessel} />
    </div>
  </Folie>
);

const Kennzahlen3: React.FC<Kennzahlen> = (p) => (
  <Folie label={p.label}>
    <div className="inhalt" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 'var(--s4)', textAlign: 'center' }}>
      <T stil="aussage" as="h2" max={80}>
        {p.aussage}
      </T>
      <Kachelreihe k={p.kennzahlen} schluessel={p.schluessel} />
    </div>
  </Folie>
);

const KennzahlenText6: React.FC<KennzahlenText> = (p) => (
  <Folie label={p.label}>
    {/* F2: six figures are the realistic maximum next to a text; 50/50 like every text | media split */}
    <div className="inhalt" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: 'var(--s4)', alignItems: 'center' }}>
      <div className="stapel">
        <T stil="titel" as="h2" max={48}>
          {p.titel}
        </T>
        <T stil="body" leise max={120}>
          {p.text}
        </T>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 'var(--gap)' }}>
        {p.kennzahlen.map((z, i) => (
          <Kennzahl key={i} k={z} gross={false} max={{ wert: 5, text: 32 }} variante={i === p.schluessel ? 'akzent' : 'hoch'} style={{ minHeight: 200 }} />
        ))}
      </div>
    </div>
  </Folie>
);

const Kennzahlen6: React.FC<Kennzahlen> = (p) => (
  <Folie label={p.label}>
    <div className="inhalt" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 'var(--s4)', textAlign: 'center' }}>
      <T stil="aussage" as="h2" max={80}>
        {p.aussage}
      </T>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 480px)', gap: 'var(--gap)' }}>
        {p.kennzahlen.map((z, i) => (
          <Kennzahl key={i} k={z} gross={false} max={{ wert: 5, text: 32 }} variante={i === p.schluessel ? 'akzent' : 'hoch'} style={{ minHeight: 212, textAlign: 'center', alignItems: 'center', justifyContent: 'center' }} />
        ))}
      </div>
    </div>
  </Folie>
);

const kennzahlen3: Kennzahlen = {
  label: 'Ergebnisse',
  aussage: 'Über 120 Unternehmen aus Schwaben vertrauen auf unsere Kampagnen.',
  kennzahlen: [
    { wert: '38\u00a0%', text: 'weniger Kosten pro Anfrage' },
    { wert: '2,4×', text: 'mehr Anfragen über die Website' },
    { wert: '96\u00a0%', text: 'Kunden, die nach dem ersten Jahr bleiben' },
  ],
  schluessel: 1,
};
const kennzahlenLimits = { label: 24, aussage: 80, 'kennzahlen[].wert': 6, 'kennzahlen[].text': 44 };

const kennzahlen9: KennzahlenText = {
  label: 'Ergebnisse',
  titel: 'Messbar mehr Wirkung in zwölf Monaten',
  text: 'Durchschnitt über 24 Mandate aus Handwerk, Pflege und Industrie seit 2023.',
  kennzahlen: [
    { wert: '+64\u00a0%', text: 'organische Besucher' },
    { wert: '2,4×', text: 'Anfragen pro Monat' },
    { wert: '−38\u00a0%', text: 'Kosten pro Anfrage' },
    { wert: '4,8', text: 'Google-Bewertung im Schnitt' },
    { wert: '21\u00a0%', text: 'Abschlussquote der Leads' },
    { wert: '96\u00a0%', text: 'Kunden bleiben länger' },
  ],
  schluessel: 1,
};
const kennzahlen9Limits = { label: 24, titel: 48, text: 120, 'kennzahlen[].wert': 5, 'kennzahlen[].text': 32 };

const kennzahlen6: Kennzahlen = {
  label: 'Ergebnisse',
  aussage: 'Was unsere Kunden nach einem Jahr Zusammenarbeit messen.',
  kennzahlen: [
    { wert: '+64\u00a0%', text: 'organische Besucher' },
    { wert: '2,4×', text: 'Anfragen pro Monat' },
    { wert: '−38\u00a0%', text: 'Kosten pro Anfrage' },
    { wert: '4,8', text: 'Google-Bewertung im Schnitt' },
    { wert: '21\u00a0%', text: 'Abschlussquote der Leads' },
    { wert: '96\u00a0%', text: 'Kunden bleiben länger' },
  ],
  schluessel: 1,
};

/* ------------------------------------------------------------ Wert-Mosaik --- */
interface WertMosaik {
  label?: string;
  titel: string;
  text?: string;
  bilder?: [BildDaten?, BildDaten?, BildDaten?];
}

const WertMosaikFolie: React.FC<WertMosaik> = (p) => (
  <Folie label={p.label}>
    <div className="inhalt" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--s4)' }}>
      <div className="stapel" style={{ alignSelf: 'center' }}>
        <T stil="titel" as="h2" max={48}>
          {p.titel}
        </T>
        <T stil="body" leise max={140}>
          {p.text}
        </T>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 3fr', gridTemplateRows: '1fr 1fr', gap: 'var(--gap)' }}>
        <Bild bild={p.bilder?.[0]} platzhalter="Detail" unterschrift={false} style={{ height: '100%' }} />
        <Bild bild={p.bilder?.[2]} platzhalter="Hauptbild" unterschrift={false} style={{ height: '100%', gridColumn: 2, gridRow: '1 / 3' }} />
        <Bild bild={p.bilder?.[1]} platzhalter="Detail" unterschrift={false} style={{ height: '100%' }} />
      </div>
    </div>
  </Folie>
);

/* -------------------------------------------------------------- Wert-Venn --- */
interface WertVenn {
  label?: string;
  titel: string;
  punkte: string[];
  fazit?: string;
  kreise: [VennKreis, VennKreis, VennKreis];
  mitte: string;
}

const WertVennFolie: React.FC<WertVenn> = (p) => (
  <Folie label={p.label}>
    <div className="inhalt" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--s4)', alignItems: 'center', justifyItems: 'start' }}>
      <div className="stapel-l">
        <T stil="titel" as="h2" max={48}>
          {p.titel}
        </T>
        <Liste punkte={p.punkte} max={40} />
        <T stil="body" leise max={80}>
          {p.fazit}
        </T>
      </div>
      <Venn3 kreise={p.kreise} mitte={p.mitte} groesse={760} max={{ titel: 22, text: 48, mitte: 20 }} style={{ justifySelf: 'center' }} />
    </div>
  </Folie>
);

/* ------------------------------------------------------- Wert-Zwei-Spalten --- */
interface ZweiSpalten {
  label?: string;
  links: string;
  rechts: string;
}

const ZweiSpaltenFolie: React.FC<ZweiSpalten> = (p) => (
  <Folie label={p.label}>
    <div className="inhalt" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--s4)', alignItems: 'center' }}>
      <T stil="lead" max={160}>
        {p.links}
      </T>
      <T stil="lead" max={160}>
        {p.rechts}
      </T>
    </div>
  </Folie>
);

/* ------------------------------------------------------------ Preis-Balken --- */
interface PreisBalken {
  label?: string;
  titel: string;
  text?: string;
  hinweis?: string;
  stufen: BalkenDaten[];
}

const PreisBalkenFolie: React.FC<PreisBalken> = (p) => (
  <Folie label={p.label}>
    <div className="inhalt" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--s4)', alignItems: 'center' }}>
      <div className="stapel">
        <T stil="titel" as="h2" max={40}>
          {p.titel}
        </T>
        <T stil="body" leise max={120}>
          {p.text}
        </T>
        <T stil="meta" leise max={80}>
          {p.hinweis}
        </T>
      </div>
      <div className="kachel" style={{ height: '100%' }}>
        <Balken balken={p.stufen} max={{ tag: 9, label: 12, sub: 26 }} />
      </div>
    </div>
  </Folie>
);

const preis: PreisBalken = {
  label: 'Investition',
  titel: 'Drei Pakete, ein klarer Monatspreis',
  text: 'Fester Betrag pro Monat, nach dem ersten Quartal monatlich kündbar.',
  hinweis: 'Netto zzgl. MwSt., Mediabudget zahlen Sie direkt an Google und Meta.',
  stufen: [
    { wert: 1250, tag: '1.250 €', label: 'Start', sub: 'Website und SEO' },
    { wert: 2400, tag: '2.400 €', label: 'Wachstum', sub: 'plus Google Ads', hervorheben: true },
    { wert: 3900, tag: '3.900 €', label: 'Komplett', sub: 'plus Social und Recruiting' },
  ],
};

/* -------------------------------------------------------------- Ablauf --- */
interface Ablauf {
  label?: string;
  titel?: string;
  punkte: Meilenstein[];
  erreicht?: number;
}

const zeitleisteMax = { titel: 22, datum: 20, text: 70 };

const AblaufZeitleiste: React.FC<Ablauf> = (p) => (
  <Folie label={p.label}>
    <div className="inhalt" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Zeitleiste punkte={p.punkte} erreicht={p.erreicht} max={zeitleisteMax} />
    </div>
  </Folie>
);

const AblaufTitelZeitleiste: React.FC<Ablauf> = (p) => (
  <Folie label={p.label}>
    <div className="inhalt" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 'var(--s3)' }}>
      <T stil="titel" as="h2" max={60}>
        {p.titel}
      </T>
      {/* centred in the space below the headline */}
      <Zeitleiste punkte={p.punkte} erreicht={p.erreicht} max={{ ...zeitleisteMax, text: 90 }} style={{ marginBlock: 'auto' }} />
    </div>
  </Folie>
);

const AblaufZeitleisteAussage: React.FC<Ablauf> = (p) => (
  <Folie label={p.label}>
    <div className="inhalt" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 'var(--s3)' }}>
      <Zeitleiste punkte={p.punkte} erreicht={p.erreicht} max={{ ...zeitleisteMax, text: 100 }} style={{ marginTop: 'var(--s3)' }} />
      <T stil="aussage" as="h2" max={60} style={{ textAlign: 'center', marginInline: 'auto' }}>
        {p.titel}
      </T>
    </div>
  </Folie>
);

const meilensteine: Meilenstein[] = [
  { titel: 'Kick-off', datum: 'Januar 2027', text: 'Ziele, Zielgruppen und Zugänge in einem halben Tag klären.' },
  { titel: 'Strategie', datum: 'Februar 2027', text: 'Positionierung, Kanalmix und Budget als Fahrplan festlegen.' },
  { titel: 'Website', datum: 'März bis Mai', text: 'Neue Seiten texten, gestalten und mit Tracking live stellen.' },
  { titel: 'Kampagnen', datum: 'ab Juni 2027', text: 'Google Ads und Social starten, wöchentlich nachsteuern.' },
  { titel: 'Auswertung', datum: 'Dezember 2027', text: 'Ergebnisse gegen die Ziele prüfen und das Folgejahr planen.' },
];

/* -------------------------------------------------------------- Kontakt --- */
interface Kontakt {
  label?: string;
  aussage?: string;
  mail: string;
  zeilen?: string[];
  bild?: BildDaten;
}

const KontaktMail: React.FC<Kontakt> = (p) => (
  <Folie label={p.label}>
    <div className="inhalt" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: 'var(--s3)' }}>
      <T stil="lead" leise max={60}>
        {p.aussage}
      </T>
      <T stil="aussage" as="h2" max={34} style={{ maxWidth: 'none' }}>
        {p.mail}
      </T>
    </div>
  </Folie>
);

const KontaktAbschluss: React.FC<Kontakt> = (p) => (
  <Folie label={p.label}>
    <div className="inhalt" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: 'var(--s3)' }}>
      <T stil="aussage" as="h2" max={60}>
        {p.aussage}
      </T>
      <div>
        <T stil="body" leise max={34}>
          {p.mail}
        </T>
        {(p.zeilen ?? []).map((z, i) => (
          <T key={i} stil="body" leise max={40}>
            {z}
          </T>
        ))}
      </div>
    </div>
  </Folie>
);

const KontaktBild: React.FC<Kontakt> = (p) => (
  <Folie label={p.label} logo={false}>
    <div className="voll" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
      <div style={{ padding: 'var(--oben) var(--s4) var(--unten) var(--rand)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div className="stapel-l">
          <T stil="titel" as="h2" max={60}>
            {p.aussage}
          </T>
          <div>
            <T stil="body" max={34}>
              {p.mail}
            </T>
            {(p.zeilen ?? []).map((z, i) => (
              <T key={i} stil="body" leise max={40}>
                {z}
              </T>
            ))}
          </div>
        </div>
      </div>
      <Bild bild={p.bild} eckig platzhalter="Teamfoto" unterschrift={false} style={{ height: '100%' }} />
    </div>
  </Folie>
);

const kontakt: Kontakt = {
  label: 'Kontakt',
  aussage: 'Lassen Sie uns gemeinsam loslegen.',
  mail: 'info@uhl-werbeagentur.de',
  zeilen: ['uhl-werbeagentur.de', 'Uhl Werbeagentur, Augsburg'],
};
const kontaktLimits = { label: 24, aussage: 60, mail: 34, 'zeilen[]': 40 };

export const beweisLayouts: LayoutDef[] = [
  {
    id: 'beweis-kennzahlen-bild',
    name: 'Aussage + 3 Kennzahlen auf Bild',
    gruppe: 'Beweis',
    zweck: 'Drei Belegzahlen als Kacheln auf einem Stimmungsbild hinter Schleier.',
    komponente: KennzahlenBild,
    beispiel: kennzahlen3,
    limits: kennzahlenLimits,
    anzahl: { kennzahlen: [3, 3] },
  },
  {
    id: 'beweis-kennzahlen3',
    name: 'Aussage + 3 Kennzahlen',
    gruppe: 'Beweis',
    zweck: 'Eine Aussage, belegt mit drei Zahlen; eine davon als Schlüsselzahl.',
    komponente: Kennzahlen3,
    beispiel: kennzahlen3,
    limits: kennzahlenLimits,
    anzahl: { kennzahlen: [3, 3] },
  },
  {
    id: 'beweis-text-kennzahlen',
    name: 'Text + 6 Kennzahlen',
    gruppe: 'Beweis',
    zweck: 'Viele Ergebnisse auf einen Blick, mit kurzer Einordnung links.',
    komponente: KennzahlenText6,
    beispiel: kennzahlen9,
    limits: kennzahlen9Limits,
    anzahl: { kennzahlen: [2, 6] },
  },
  {
    id: 'beweis-kennzahlen6',
    name: 'Aussage + 6 Kennzahlen',
    gruppe: 'Beweis',
    zweck: 'Aussage oben, darunter sechs Ergebnisse in zwei Reihen.',
    komponente: Kennzahlen6,
    beispiel: kennzahlen6,
    limits: { ...kennzahlenLimits, 'kennzahlen[].wert': 5, 'kennzahlen[].text': 32 },
    anzahl: { kennzahlen: [6, 6] },
  },
  {
    id: 'wert-mosaik',
    name: 'Text + Bildmosaik',
    gruppe: 'Wert',
    zweck: 'Nutzen in einem Satz, belegt mit drei Bildern aus Projekt oder Alltag.',
    komponente: WertMosaikFolie,
    beispiel: {
      label: 'Ihr Nutzen',
      titel: 'Ein Auftritt, der nach Ihnen aussieht',
      text: 'Echte Fotos aus Ihrem Betrieb statt Stockbildern: Kunden und Bewerber sehen sofort, mit wem sie es zu tun haben.',
    } satisfies WertMosaik,
    limits: { label: 24, titel: 48, text: 140 },
  },
  {
    id: 'wert-venn',
    name: 'Text + Venn-Diagramm',
    gruppe: 'Wert',
    zweck: 'Positionierung als Schnittmenge aus Können, Kundenwunsch und Markt.',
    komponente: WertVennFolie,
    beispiel: {
      label: 'Positionierung',
      titel: 'Was Ihre Kunden davon haben',
      punkte: ['Ein fester Ansprechpartner', 'Klare Preise schon auf der Website', 'Termine online statt am Telefon'],
      kreise: [
        { titel: 'Was Kunden schätzen', text: 'Schnelle Termine, faire Preise, Ruhe.' },
        { titel: 'Was Sie können', text: 'Meisterbetrieb mit 30 Jahren Erfahrung.' },
        { titel: 'Was der Markt bietet', text: 'Große Ketten ohne festen Ansprechpartner.' },
      ],
      mitte: '==Ihre Position==',
    } satisfies WertVenn,
    limits: { label: 24, titel: 48, 'punkte[]': 40, fazit: 80, 'kreise[].titel': 22, 'kreise[].text': 48, mitte: 20 },
    anzahl: { punkte: [2, 5], kreise: [3, 3] },
  },
  {
    id: 'wert-zwei-spalten',
    name: 'Zwei Textspalten',
    gruppe: 'Wert',
    zweck: 'Vorher und nachher in zwei ruhigen Absätzen, ohne Bild.',
    komponente: ZweiSpaltenFolie,
    beispiel: {
      label: 'Ihr Nutzen',
      links: 'Bisher kommen Anfragen zufällig. Flyer, Zeitungsanzeige und Bauchgefühl entscheiden, niemand sieht, was wirkt.',
      rechts: 'Künftig kommen sie planbar. Interessenten kennen Leistungen und Preise, bevor sie anrufen, und jeden Monat zeigen Zahlen, was wirkt.',
    } satisfies ZweiSpalten,
    limits: { label: 24, links: 160, rechts: 160 },
  },
  {
    id: 'preis-balken',
    name: 'Preise als Balken',
    gruppe: 'Preis',
    zweck: 'Zwei bis drei Pakete als Balken, das empfohlene in Lime (ab vier Balken passt der Preis nicht mehr in den Balken).',
    komponente: PreisBalkenFolie,
    beispiel: preis,
    limits: { label: 24, titel: 40, text: 120, hinweis: 80, 'stufen[].tag': 9, 'stufen[].label': 12, 'stufen[].sub': 26 },
    anzahl: { stufen: [2, 3] },
  },
  {
    id: 'ablauf-zeitleiste',
    name: 'Zeitleiste',
    gruppe: 'Ablauf',
    zweck: 'Projektablauf mit drei bis sechs Meilensteinen über die volle Breite.',
    komponente: AblaufZeitleiste,
    beispiel: { label: 'Ablauf', punkte: meilensteine, erreicht: 2 } satisfies Ablauf,
    limits: { label: 24, 'punkte[].titel': 22, 'punkte[].datum': 20, 'punkte[].text': 70 },
    anzahl: { punkte: [3, 6] },
  },
  {
    id: 'ablauf-titel-zeitleiste',
    name: 'Überschrift + Zeitleiste',
    gruppe: 'Ablauf',
    zweck: 'Überschrift oben, darunter vier Meilensteine bis zum Ziel.',
    komponente: AblaufTitelZeitleiste,
    beispiel: {
      label: 'Ablauf',
      titel: 'In vier Schritten zu planbaren Anfragen',
      punkte: [
        { titel: 'Kick-off', datum: 'Januar 2027', text: 'Ziele, Zielgruppen und Zugänge in einem halben Tag klären.' },
        { titel: 'Strategie', datum: 'Februar 2027', text: 'Positionierung, Kanalmix und Budget als Fahrplan festlegen.' },
        { titel: 'Umsetzung', datum: 'März bis Mai', text: 'Website, Anzeigen und Inhalte aufbauen und live stellen.' },
        { titel: 'Optimierung', datum: 'ab Juni 2027', text: 'Jeden Monat auswerten, Budget dorthin lenken, wo es wirkt.' },
      ],
      erreicht: 1,
    } satisfies Ablauf,
    limits: { label: 24, titel: 60, 'punkte[].titel': 22, 'punkte[].datum': 20, 'punkte[].text': 90 },
    anzahl: { punkte: [3, 5] },
  },
  {
    id: 'ablauf-zeitleiste-aussage',
    name: 'Zeitleiste + Aussage',
    gruppe: 'Ablauf',
    zweck: 'Drei große Etappen oben, die Kernaussage groß darunter.',
    komponente: AblaufZeitleisteAussage,
    beispiel: {
      label: 'Nächste Schritte',
      titel: 'Jeder Schritt bringt Sie näher an planbare Anfragen.',
      punkte: [
        { titel: 'Freigabe', datum: 'diese Woche', text: 'Sie geben das Angebot frei, wir reservieren das Team für Ihren Start.' },
        { titel: 'Kick-off', datum: 'in zwei Wochen', text: 'Ein halber Tag bei Ihnen vor Ort, danach liegt der Fahrplan vor.' },
        { titel: 'Erste Ergebnisse', datum: 'nach 90 Tagen', text: 'Die neue Website ist live, die ersten Kampagnen bringen Anfragen.' },
      ],
      erreicht: 1,
    } satisfies Ablauf,
    limits: { label: 24, titel: 60, 'punkte[].titel': 22, 'punkte[].datum': 20, 'punkte[].text': 100 },
    anzahl: { punkte: [3, 4] },
  },
  {
    id: 'kontakt-mail',
    name: 'Kontakt: E-Mail groß',
    gruppe: 'Kontakt',
    zweck: 'Letzte Folie mit einer großen Kontaktadresse in der Mitte.',
    komponente: KontaktMail,
    beispiel: { label: 'Kontakt', aussage: 'Fragen? Schreiben Sie uns.', mail: 'info@uhl-werbeagentur.de' } satisfies Kontakt,
    limits: { label: 24, aussage: 60, mail: 34 },
  },
  {
    id: 'kontakt-abschluss',
    name: 'Kontakt: Schlusssatz',
    gruppe: 'Kontakt',
    zweck: 'Schlusssatz groß in der Mitte, darunter die Kontaktwege.',
    komponente: KontaktAbschluss,
    beispiel: kontakt,
    limits: kontaktLimits,
    anzahl: { zeilen: [0, 3] },
  },
  {
    id: 'kontakt-bild',
    name: 'Kontakt mit Bild',
    gruppe: 'Kontakt',
    zweck: 'Schlusssatz und Kontakt links, Team- oder Bürofoto rechts.',
    komponente: KontaktBild,
    beispiel: kontakt,
    limits: kontaktLimits,
    anzahl: { zeilen: [0, 3] },
  },
];
