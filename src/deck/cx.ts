// Plain helpers, no 'use client': layouts rendered on the server may call them.
export const cx = (...k: (string | false | null | undefined)[]) => k.filter(Boolean).join(' ');

/** Length a reader sees: the ==highlight== marks do not count. */
export const sichtbareLaenge = (s: string) => s.replace(/==/g, '').length;
