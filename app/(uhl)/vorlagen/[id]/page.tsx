import { notFound } from 'next/navigation';
import { layoutNach, layouts } from '../../../../src/deck/registry';
import { FolienRahmen } from '../../../../src/deck/system';

// One layout at full 1920 x 1080, for screenshots: /vorlagen/<id>?thema=dark
export default async function EineVorlage({ params, searchParams }: { params: Promise<{ id: string }>; searchParams: Promise<{ thema?: string }> }) {
  const { id } = await params;
  const { thema } = await searchParams;
  const l = layoutNach(id);
  if (!l) notFound();
  const K = l.komponente;
  const n = layouts.indexOf(l) + 1;
  return (
    <main>
      <style>{`html, body { margin: 0; background: #E3E3E3; } @page { size: 1920px 1080px; margin: 0; }`}</style>
      <FolienRahmen {...{ thema: thema === 'dark' ? 'dark' : 'light', marke: 'Uhl Werbeagentur · Vorlagen', seite: String(n).padStart(2, '0') }}>
        <K {...l.beispiel} />
      </FolienRahmen>
    </main>
  );
}
