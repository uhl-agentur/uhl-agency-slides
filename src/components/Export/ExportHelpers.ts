import type { KickoffState } from '../../state/types';

/**
 * Export helpers for CSV, JSON formats
 * CSV: Semicolon-delimited with UTF-8 BOM for German Excel compatibility
 * JSON: Complete state backup for import/restore
 */

// Generate filename with timestamp
const generateFilename = (projectName: string, extension: string): string => {
  const date = new Date().toISOString().split('T')[0];
  const safeName = projectName.replace(/[^a-zA-Z0-9äöüÄÖÜß\-_]/g, '_') || 'kickoff';
  return `UHL-Kickoff_${safeName}_${date}.${extension}`;
};

// Escape CSV values (handle semicolons, quotes, newlines)
const escapeCSV = (value: string | number | boolean | null | undefined): string => {
  if (value === null || value === undefined) return '';
  const str = String(value);
  // If contains semicolon, quotes, or newline, wrap in quotes and escape existing quotes
  if (str.includes(';') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
};

/**
 * Export state to CSV format
 * UTF-8 BOM ensures German characters display correctly in Excel
 */
export const exportToCSV = (state: KickoffState): void => {
  const rows: string[][] = [];

  // Header
  rows.push(['Kategorie', 'Feld', 'Wert']);
  rows.push([]); // Empty line

  // Project Settings
  rows.push(['PROJEKT-EINSTELLUNGEN', '', '']);
  rows.push(['', 'Kundenname', state.projectSettings.kundenname]);
  rows.push(['', 'Domain', state.projectSettings.domain]);
  rows.push(['', 'Session ID', state.projectSettings.sessionId]);
  rows.push([]);

  // Unternehmen
  rows.push(['UNTERNEHMEN', '', '']);
  rows.push(['', 'Elevator Pitch', state.unternehmen.elevatorPitch]);
  rows.push(['', 'USP', state.unternehmen.usp]);
  rows.push(['', 'Fokus', state.unternehmen.fokus]);
  rows.push(['', 'Ansprechpartner', state.unternehmen.ansprechpartner]);
  rows.push(['', 'Zusatz', state.unternehmen.zusatz]);
  rows.push([]);

  // Zielgruppe
  rows.push(['ZIELGRUPPE', '', '']);
  rows.push(['', 'Zielgruppen-Typ', state.zielgruppe.targetType || '']);
  rows.push(['', 'Idealer Kunde', state.zielgruppe.idealerKunde]);
  rows.push(['', 'Hauptproblem', state.zielgruppe.hauptproblem]);
  state.zielgruppe.personas.forEach((persona, i) => {
    rows.push(['', `Persona ${i + 1}`, persona.content]);
  });
  rows.push([]);

  // Competitors
  rows.push(['WETTBEWERBER', '', '']);
  state.competitors.forEach((comp, i) => {
    rows.push(['', `Wettbewerber ${i + 1}`, comp.name]);
    rows.push(['', '- Stärken', comp.staerken]);
    rows.push(['', '- Schwächen', comp.schwaechen]);
    rows.push(['', '- URL', comp.url]);
  });
  rows.push([]);

  // Ist & Soll
  rows.push(['IST & SOLL', '', '']);
  rows.push(['', 'Ist-Status', state.istSoll.istStatus]);
  rows.push(['', 'Ist-Probleme', state.istSoll.istProbleme]);
  rows.push(['', 'Ist-Erfahrungen', state.istSoll.istErfahrungen]);
  rows.push(['', 'Soll-Ziele', state.istSoll.sollZiele]);
  rows.push(['', 'Soll-Erwartungen', state.istSoll.sollErwartungen]);
  rows.push(['', 'Soll-Timeline', state.istSoll.sollTimeline]);
  rows.push(['', 'Notizen', state.istSoll.notizen]);
  rows.push([]);

  // Aktuelles Design
  rows.push(['AKTUELLES DESIGN', '', '']);
  rows.push(['', 'Hat Brandbook', state.aktuellesDesign.hatBrandbook]);
  rows.push(['', 'Markenfarben', state.aktuellesDesign.markenfarben]);
  rows.push(['', 'Schriften', state.aktuellesDesign.schriften]);
  rows.push(['', 'Design-Notizen', state.aktuellesDesign.designNotizen]);
  rows.push([]);

  // Vibe & Values
  rows.push(['VIBE & VALUES', '', '']);
  rows.push(['', 'Ausgewählte Tags', state.vibeValues.selectedTags.join(', ')]);
  rows.push(['', 'Förmlichkeit', state.vibeValues.toggles.formality === 'left' ? 'Förmlich' : 'Locker']);
  rows.push(['', 'Emotion', state.vibeValues.toggles.emotion === 'left' ? 'Sachlich' : 'Emotional']);
  rows.push(['', 'Intensität', state.vibeValues.toggles.intensity === 'left' ? 'Dezent' : 'Auffällig']);
  rows.push(['', 'Notizen', state.vibeValues.notizen]);
  rows.push([]);

  // Like & Dislike
  rows.push(['LIKE & DISLIKE', '', '']);
  rows.push(['', 'Likes', state.likeDislike.likes]);
  rows.push(['', 'Dislikes', state.likeDislike.dislikes]);
  rows.push([]);

  // Website Ziele
  rows.push(['WEBSITE ZIELE', '', '']);
  const prioritizedGoals = state.websiteZiele.goals
    .filter(g => g.priority !== null)
    .sort((a, b) => (a.priority || 0) - (b.priority || 0));
  prioritizedGoals.forEach((goal) => {
    rows.push(['', `Priorität ${goal.priority}`, goal.label]);
  });
  const unprioritizedGoals = state.websiteZiele.goals
    .filter(g => g.priority === null && g.label.trim() !== '');
  unprioritizedGoals.forEach((goal) => {
    rows.push(['', 'Ohne Priorität', goal.label]);
  });
  rows.push(['', 'Notizen', state.websiteZiele.notizen]);
  rows.push([]);

  // Ist-Status Website
  rows.push(['IST-STATUS WEBSITE', '', '']);
  rows.push(['', 'Aktuelle URL', state.istStatus.currentUrl]);
  rows.push(['', 'Design veraltet', state.istStatus.painPoints.designVeraltet ? 'Ja' : 'Nein']);
  rows.push(['', 'Schwer zu pflegen', state.istStatus.painPoints.schwerZuPflegen ? 'Ja' : 'Nein']);
  rows.push(['', 'Nicht mobil-optimiert', state.istStatus.painPoints.nichtMobilOptimiert ? 'Ja' : 'Nein']);
  rows.push(['', 'Langsam', state.istStatus.painPoints.langsam ? 'Ja' : 'Nein']);
  rows.push(['', 'Keine Analytics', state.istStatus.painPoints.keineAnalytics ? 'Ja' : 'Nein']);
  rows.push(['', 'Weitere Probleme', state.istStatus.customPainPoint]);
  rows.push([]);

  // Inspiration
  rows.push(['INSPIRATION', '', '']);
  state.inspiration.forEach((insp, i) => {
    rows.push(['', `Website ${i + 1}`, insp.url]);
    rows.push(['', '- Was gefällt', insp.description]);
  });
  rows.push([]);

  // Features
  rows.push(['FEATURES', '', '']);
  state.features.forEach((category) => {
    const checkedFeatures = category.features.filter(f => f.checked);
    if (checkedFeatures.length > 0) {
      rows.push(['', category.name, checkedFeatures.map(f => f.label).join(', ')]);
    }
  });
  rows.push([]);

  // Content
  rows.push(['CONTENT', '', '']);
  rows.push(['', 'Texte', state.content.texte || 'Nicht angegeben']);
  rows.push(['', 'Bilder', state.content.bilder || 'Nicht angegeben']);
  rows.push(['', 'Videos', state.content.videos || 'Nicht angegeben']);
  rows.push(['', 'Notizen', state.content.notizen]);
  rows.push([]);

  // Specs
  rows.push(['TECHNISCHE SPECS', '', '']);
  rows.push(['', 'Hosting', state.specs.hosting]);
  rows.push(['', 'CMS', state.specs.cms]);
  rows.push(['', 'Budget', state.specs.budget]);
  rows.push(['', 'Timeline', state.specs.timeline]);
  rows.push(['', 'Wartung', state.specs.wartung]);
  rows.push(['', 'SSL', state.specs.techChecks.ssl ? 'Ja' : 'Nein']);
  rows.push(['', 'DSGVO', state.specs.techChecks.dsgvo ? 'Ja' : 'Nein']);
  rows.push(['', 'Backup', state.specs.techChecks.backup ? 'Ja' : 'Nein']);
  rows.push(['', 'Analytics', state.specs.techChecks.analytics ? 'Ja' : 'Nein']);
  rows.push(['', 'SEO', state.specs.techChecks.seo ? 'Ja' : 'Nein']);
  rows.push([]);

  // Projektablauf
  rows.push(['PROJEKTABLAUF', '', '']);
  state.projektablauf.forEach((phase) => {
    rows.push(['', phase.title, phase.date || 'Noch nicht geplant']);
    if (phase.description) {
      rows.push(['', '- Beschreibung', phase.description]);
    }
  });
  if (state.projektablaufNotizen) {
    rows.push(['', 'Notizen', state.projektablaufNotizen]);
  }
  rows.push([]);

  // Kommunikation
  rows.push(['KOMMUNIKATION', '', '']);
  rows.push(['', 'Projektleiter', state.kommunikation.projektleiter]);
  rows.push(['', 'Position', state.kommunikation.position]);
  rows.push(['', 'E-Mail', state.kommunikation.email]);
  rows.push(['', 'Telefon', state.kommunikation.telefon]);
  rows.push([]);

  // Zusammenfassung
  rows.push(['ZUSAMMENFASSUNG', '', '']);
  rows.push(['', 'Projektziele', state.zusammenfassung.projektziele]);
  rows.push(['', 'Marken-Kernaussagen', state.zusammenfassung.markenKernaussagen]);
  rows.push(['', 'Wichtige Anforderungen', state.zusammenfassung.wichtigeAnforderungen]);
  rows.push([]);

  // Next Steps
  rows.push(['NEXT STEPS', '', '']);
  state.nextSteps.forEach((step, i) => {
    rows.push(['', `Schritt ${i + 1} - Wer`, step.wer]);
    rows.push(['', `Schritt ${i + 1} - Was`, step.was]);
    rows.push(['', `Schritt ${i + 1} - Nächste Aktion`, step.naechsteAktion]);
  });
  rows.push([]);

  // Offene Fragen
  rows.push(['OFFENE FRAGEN', '', '']);
  rows.push(['', 'Fragen', state.offeneFragen.fragen]);

  // Convert to CSV string
  const csvContent = rows
    .map(row => row.map(escapeCSV).join(';'))
    .join('\n');

  // Add UTF-8 BOM for Excel compatibility
  const BOM = '\uFEFF';
  const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8;' });

  // Download
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = generateFilename(state.projectSettings.kundenname, 'csv');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
};

/**
 * Export state to JSON format for backup/restore
 */
export const exportToJSON = (state: KickoffState): void => {
  const exportData = {
    version: 1,
    exportedAt: new Date().toISOString(),
    projectName: state.projectSettings.kundenname,
    data: state,
  };

  const jsonContent = JSON.stringify(exportData, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json;charset=utf-8;' });

  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = generateFilename(state.projectSettings.kundenname, 'json');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
};

/**
 * Import state from JSON backup
 */
export const importFromJSON = (
  jsonString: string,
  importState: (json: string) => void
): { success: boolean; error?: string } => {
  try {
    const parsed = JSON.parse(jsonString);

    // Validate structure
    if (!parsed.version || !parsed.data) {
      return { success: false, error: 'Ungültiges Backup-Format' };
    }

    // Import the data
    importState(JSON.stringify(parsed.data));

    return { success: true };
  } catch (_error) {
    return { success: false, error: 'Fehler beim Lesen der Datei' };
  }
};
