import { notFound } from 'next/navigation';
import { layoutNach } from '../../../../src/deck/registry';
import { FolienRahmen } from '../../../../src/deck/system';
import { probeProps } from '../../../../src/deck/probe';

// One layout at full 1920 x 1080, for screenshots: /vorlagen/<id>?thema=dark
// ?probe=max|min renders stress content for the smoke test (src/deck/probe.ts)
export default async function EineVorlage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ thema?: string; probe?: string }> }) {
  const { id } = await params;
  const { thema, probe } = await searchParams;
  const l = layoutNach(id);
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
