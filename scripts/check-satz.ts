// Selfcheck of the German typesetting rules in src/deck/cx.ts (satz). ~ = no-break space.
// usage: npm run check:satz
import { satz } from '../src/deck/cx';
import assert from 'node:assert';
const nb = (s: string) => s.replace(/\u00A0/g, '~');
const f = (a: string, b: string) => assert.equal(nb(satz(a)), b, a);
f('38 % weniger Kosten pro Anfrage', '38~% weniger Kosten pro~Anfrage');
f('1.250 € pro Monat', '1.250~€ pro~Monat');
f('in 3 Monaten live', 'in 3~Monaten~live');
f('z. B. Pflege', 'z.~B.~Pflege');
f('Platz Nr. 1', 'Platz Nr.~1');
f('Schnell – und gut', 'Schnell~– und~gut');
f('Wettbewerbsanalyse Suchmaschinenoptimierung', 'Wettbewerbsanalyse Suchmaschinenoptimierung');
f('3 mal', '3~mal');
f('Ab 3 Mitarbeitern wächst die Region', 'Ab 3 Mitarbeitern wächst die~Region');
f('Ihre ==Region==', 'Ihre~==Region==');
f('Eins', 'Eins');
f('in 1 Stunde vor Ort sein', 'in 1~Stunde vor Ort~sein');
f('Was Kunden schätzen', 'Was Kunden schätzen');
f('Suchmaschinenoptimierung ab', 'Suchmaschinenoptimierung~ab');
f('Große Ads-Budgets für Fachkräftegewinnung heute', 'Große Ads-Budgets für Fachkräftegewinnung heute');
console.log('satz ok');
