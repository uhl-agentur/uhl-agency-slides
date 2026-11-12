// Plain helpers, no 'use client': layouts rendered on the server may call them.
export const cx = (...k: (string | false | null | undefined)[]) => k.filter(Boolean).join(' ');

/** Length a reader sees: the ==highlight== marks do not count. */
export const sichtbareLaenge = (s: string) => s.replace(/==/g, '').length;

const BUCHSTABE = 'A-Za-zÄÖÜäöüß';
const EINHEIT = new RegExp(
  `(\\d)[ \\t]+(?=(?:%|‰|€|\\$|×|Mio\\.|Mrd\\.|Tsd\\.|km|kg|m²|Std\\.|Min\\.|Tage?n?|Wochen?|Monate?n?|Jahre?n?|Stunden?|Minuten?|Uhr|Mal|Personen|Mitarbeiter(?:innen)?|Stück|Prozent|Euro|EUR)(?![${BUCHSTABE}]))`,
  'g',
);

/**
 * German typesetting on every slide text (F3 "sauberes Zeilentrennen"), applied per line:
 * - number and unit never split ("38 %", "1.250 €", "3 Monate"),
 * - abbreviations stay together ("z. B.", "Nr. 1", "§ 3"),
 * - a dash never starts a line,
 * - the last two words are bound so the text never ends with one short word alone on its line
 *   (widow word) when both together have <= 12 letters, or when the last word has <= 3 letters
 *   ("in", "zu"): then the word before is either short (pair <= 12) or long enough (10+) to
 *   hyphenate. A longer pair could not fit a narrow column (Venn label) and would break inside a
 *   word without a hyphen ("schätze-n"); headlines balance instead.
 * Soft hyphens (\u00AD) set in the content are kept.
 */
export function satz(zeile: string): string {
  const laenge = (s: string) => s.replace(/==|[^\p{L}\p{N}]/gu, '').length;
  return zeile
    .replace(EINHEIT, '$1\u00A0')
    .replace(new RegExp(`(^|\\s)([${BUCHSTABE}])\\.[ \\t]+(?=[${BUCHSTABE}]\\.)`, 'g'), '$1$2.\u00A0')
    .replace(/(^|\s)(Nr\.|S\.|Abs\.|Kap\.|ca\.|§)[ \t]+(?=\d)/g, '$1$2\u00A0')
    .replace(/[ \t]+([–—])[ \t]/g, '\u00A0$1 ')
    .replace(/[ \t]+(\S+)[ \t]*$/, (m, letztes: string, i: number, s: string) => {
      const davor = s.slice(0, i).split(/\s/).pop() ?? '';
      return davor && (laenge(davor + letztes) <= 12 || laenge(letztes) <= 3) ? `\u00A0${letztes}` : m;
    });
}
