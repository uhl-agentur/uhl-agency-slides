import { notFound } from 'next/navigation';
import { layoutNach } from '../../../../src/deck/registry';
import { FolienRahmen } from '../../../../src/deck/system';
import { probeProps } from '../../../../src/deck/probe';

// One variant at full 1920 x 1080, for screenshots: /vorlagen/<familie>/<variante>?thema=dark
// (a singleton family: /vorlagen/<familie>; a family alone shows its first variant)
// ?probe=max|min renders stress content for the smoke test (src/deck/probe.ts)
export default async function EineVorlage({ params, searchParams }: { params: Promise<{ pfad: string[] }>; searchParams: Promise<{ thema?: string; probe?: string }> }) {
  const { pfad } = await params;
  const { thema, probe } = await searchParams;
  const l = pfad.length <= 2 ? layoutNach(pfad[0], pfad[1]) : undefined;
  if (!l) notFound();
  const K = l.komponente;
  return (
    <main>
      <style>{`html, body { margin: 0; background: #E3E3E3; } @page { size: 1920px 1080px; margin: 0; }`}</style>
      <FolienRahmen thema={thema === 'dark' ? 'dark' : 'light'}>
        <K {...(probe === 'max' || probe === 'min' ? probeProps(l, probe) : l.beispiel)} />
      </FolienRahmen>
    </main>
  );
}
