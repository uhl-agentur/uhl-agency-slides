import React from "react";
import { Bild, BildDaten, Folie, T } from "../system";
import type { LayoutDef } from "../typen";

/* Covers and table of contents. */

/* ------------------------------------------------------------ titel-links --- */
interface Cover {
  titel: string;
  unterzeile?: string;
  kunde?: string;
  datum?: string;
  bild?: BildDaten;
}

const TitelLinks: React.FC<Cover> = (p) => (
  <Folie chrome={false}>
    <div className="voll" style={{ padding: "var(--chrome) var(--rand)" }}>
      <div className="stapel" style={{ maxWidth: 1180 }}>
        <T stil="display" as="h1" max={48}>
          {p.titel}
        </T>
        <T stil="lead" leise max={90}>
          {p.unterzeile}
        </T>
      </div>
      <div
        style={{
          position: "absolute",
          left: "var(--rand)",
          bottom: "var(--chrome)",
        }}
        className="t-meta leise"
      >
        {[p.kunde, p.datum].filter(Boolean).join(" · ")}
      </div>
    </div>
  </Folie>
);

/* ------------------------------------------------------------- titel-split --- */
/* Exact 50/50: the picture half runs full bleed from x = 960 to the right edge. */
const TitelSplit: React.FC<Cover> = (p) => (
  <Folie chrome={false} logo={false}>
    <div
      className="voll"
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
      }}
    >
      <div
        style={{
          position: "relative",
          padding: "0 var(--s4) 0 var(--rand)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div className="stapel">
          <T stil="aussage" as="h1" max={48}>
            {p.titel}
          </T>
          <T stil="lead" leise max={90}>
            {p.unterzeile}
          </T>
        </div>
        <div
          style={{
            position: "absolute",
            left: "var(--rand)",
            bottom: "var(--chrome)",
          }}
          className="t-meta leise"
        >
          {[p.kunde, p.datum].filter(Boolean).join(" · ")}
        </div>
      </div>
      <Bild
        bild={p.bild}
        eckig
        platzhalter="Titelbild"
        unterschrift={false}
        style={{ height: "100%" }}
      />
    </div>
  </Folie>
);

/* -------------------------------------------------------------- titel-bild --- */
const TitelBild: React.FC<Cover> = (p) => (
  <Folie chrome={false}>
    {/* veil of the slide ground: title in role colours reads in light and dark; kept low like a cover */}
    <Bild
      bild={p.bild}
      eckig
      schleier="unten"
      platzhalter=""
      unterschrift={false}
      className="voll"
    />
    <div
      className="inhalt"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <div
        className="stapel-s"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <T stil="meta" leise max={90}>
          {p.unterzeile}
        </T>
        <T stil="aussage" as="h1" max={48}>
          {p.titel}
        </T>
      </div>
    </div>
  </Folie>
);

const cover: Cover = {
  titel: "Marketingstrategie Donauries 2027",
  unterzeile: "Wie aus Bekanntheit in der Region planbare Anfragen werden.",
  kunde: "Donauries Pflegedienst",
  datum: "November 2026",
};
const coverLimits = { titel: 48, unterzeile: 90, kunde: 40, datum: 24 };

/* ---------------------------------------------------------------- inhalt --- */
interface Inhalt {
  label?: string;
  titel?: string;
  kapitel: string[];
  bild?: BildDaten;
}

/* Exact 50/50: list in the left half, picture full bleed from x = 960. */
const InhaltSplit: React.FC<Inhalt> = (p) => (
  <Folie label={p.label} logo={false}>
    <div
      className="voll"
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
      }}
    >
      <div
        style={{
          padding: "var(--oben) var(--s4) var(--unten) var(--rand)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <ol
          className="liste-nummer t-lead"
          style={{ display: "grid", gap: "var(--s2)" }}
        >
          {p.kapitel.map((k, i) => (
            <li key={i}>{k}</li>
          ))}
        </ol>
      </div>
      <Bild
        bild={p.bild}
        eckig
        platzhalter="Bild"
        unterschrift={false}
        style={{ height: "100%" }}
      />
    </div>
  </Folie>
);

/* Tab layout (F3k): chapter left, number right-aligned in its own column, one block centred
   on the slide. Big type, no rules. */
const InhaltZentriert: React.FC<Inhalt> = (p) => (
  <Folie label={p.label}>
    <div
      className="inhalt"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ol
        style={{
          width: 1200,
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) auto",
          columnGap: "var(--s4)",
          alignItems: "baseline",
        }}
      >
        {p.kapitel.map((k, i) => (
          <li key={i} style={{ display: "contents" }}>
            <T
              stil="aussage"
              max={24}
              style={{ maxWidth: "none", whiteSpace: "nowrap" }}
            >
              {k}
            </T>
            <span
              className="t-aussage leise"
              style={{ textAlign: "right", fontVariantNumeric: "tabular-nums" }}
            >
              {i + 1}
            </span>
          </li>
        ))}
      </ol>
    </div>
  </Folie>
);

const InhaltZeilen: React.FC<Inhalt> = (p) => (
  <Folie label={p.label}>
    <div
      className="inhalt"
      style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "var(--s4)",
        alignItems: "center",
      }}
    >
      <T stil="titel" as="h2" max={40}>
        {p.titel}
      </T>
      <ol>
        {p.kapitel.map((k, i) => (
          <li
            key={i}
            className="linie-unten t-karte"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "var(--s2) 0",
            }}
          >
            <span>{k}</span>
            <span
              className="leise t-meta"
              style={{ fontVariantNumeric: "tabular-nums" }}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
          </li>
        ))}
      </ol>
    </div>
  </Folie>
);

const inhalt: Inhalt = {
  label: "Inhalt",
  titel: "Was wir heute besprechen",
  kapitel: [
    "Ausgangslage",
    "Markt und Wettbewerb",
    "Zielgruppen",
    "Positionierung",
    "Kanalmix",
    "Roadmap",
    "Investition",
    "Nächste Schritte",
  ],
};
const inhaltLimits = { label: 24, titel: 40, "kapitel[]": 28 };

export const titelLayouts: LayoutDef[] = [
  { familie: "titel", variante: "links", name: "Links oben", art: "text", zweck: "Ruhiges Deckblatt ohne Bild, Titel groß links oben.", komponente: TitelLinks, beispiel: cover, limits: coverLimits },
  { familie: "titel", variante: "bild-haelfte", name: "Mit Bildhälfte", art: "bild", bilder: 1, zweck: "Deckblatt mit Kundenbild oder Mockup rechts.", komponente: TitelSplit, beispiel: cover, limits: coverLimits },
  { familie: "titel", variante: "vollbild", name: "Auf Vollbild", art: "bild", bilder: 1, zweck: "Deckblatt auf großem Stimmungsbild, Titel unten zentriert.", komponente: TitelBild, beispiel: cover, limits: coverLimits },
  { familie: "inhalt", variante: "bild", name: "Mit Bild", art: "bild", bilder: 1, zweck: "Agenda als nummerierte Liste neben einem Bild.", komponente: InhaltSplit, beispiel: inhalt, limits: inhaltLimits, anzahl: { kapitel: [3, 9] } },
  { familie: "inhalt", variante: "gross", name: "Groß zentriert", art: "liste", zweck: "Agenda als großer Block mit Tabulator: Kapitel links, Nummer rechtsbündig.", komponente: InhaltZentriert, beispiel: inhalt, limits: { ...inhaltLimits, "kapitel[]": 24 }, anzahl: { kapitel: [3, 8] } },
  { familie: "inhalt", variante: "zeilen", name: "In Zeilen", art: "liste", zweck: "Agenda mit Titel links, Kapitel als Linienzeilen rechts.", komponente: InhaltZeilen, beispiel: inhalt, limits: inhaltLimits, anzahl: { kapitel: [3, 8] } },
];
