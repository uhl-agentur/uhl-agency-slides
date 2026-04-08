import React, { useRef } from 'react';
import { SlideContainer } from './components/Presentation';
import { useKickoffStore } from './state/kickoffStore';
import { allSlides } from './slides';
import { Settings, Download, Maximize, RotateCcw, FileSpreadsheet, Upload } from 'lucide-react';
import { exportToCSV, importFromJSON } from './components/Export';

function App() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const store = useKickoffStore();
  const {
    isSettingsOpen,
    isFullscreen,
    projectSettings,
    toggleSettings,
    toggleFullscreen,
    updateProjectSettings,
    resetState,
    exportState,
    importState,
  } = store;

  const handleExportJson = () => {
    const json = exportState();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kickoff-${projectSettings.kundenname || 'backup'}-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportCSV = () => {
    exportToCSV(store);
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      const result = importFromJSON(content, importState);
      if (result.success) {
        alert('Backup erfolgreich importiert!');
      } else {
        alert(`Fehler: ${result.error}`);
      }
    };
    reader.readAsText(file);

    // Reset input so the same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Render slides as React elements
  const slideElements = allSlides.map((SlideComponent, index) => (
    <SlideComponent key={index} />
  ));

  return (
    <div className="min-h-screen bg-black">
      {/* Main Layout */}
      <div className={isSettingsOpen && !isFullscreen ? 'editor-mode' : ''}>
        {/* Slide Viewport */}
        <div className={isSettingsOpen && !isFullscreen ? 'editor-preview' : ''}>
          <SlideContainer>{slideElements}</SlideContainer>
        </div>

        {/* Settings Panel */}
        {isSettingsOpen && !isFullscreen && (
          <div className="editor-sidebar p-6 flex flex-col gap-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <h2 className="font-humane text-2xl uppercase tracking-wide">
                Einstellungen
              </h2>
              <button
                onClick={toggleSettings}
                className="p-2 hover:bg-gray-100 rounded"
              >
                ✕
              </button>
            </div>

            {/* Project Settings */}
            <div className="border-b pb-6">
              <h3 className="font-bold text-sm uppercase text-gray-500 mb-4">
                Projekt
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Kundenname
                  </label>
                  <input
                    type="text"
                    value={projectSettings.kundenname}
                    onChange={(e) =>
                      updateProjectSettings({ kundenname: e.target.value })
                    }
                    placeholder="z.B. Bits for Bites"
                    className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-primary"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Wird als {'{{kundenname}}'} in Slides eingesetzt
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Domain
                  </label>
                  <input
                    type="text"
                    value={projectSettings.domain}
                    onChange={(e) =>
                      updateProjectSettings({ domain: e.target.value })
                    }
                    placeholder="z.B. www.bits-for-bites.de"
                    className="w-full px-3 py-2 border border-gray-200 rounded focus:outline-none focus:border-primary"
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Wird als {'{{domain}}'} in Slides eingesetzt
                  </p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="border-b pb-6">
              <h3 className="font-bold text-sm uppercase text-gray-500 mb-4">
                Aktionen
              </h3>

              <div className="space-y-3">
                <button
                  onClick={toggleFullscreen}
                  className="w-full flex items-center gap-3 px-4 py-3 bg-black text-white hover:bg-gray-800 transition-colors"
                >
                  <Maximize size={18} />
                  <span className="font-medium">Vollbild starten</span>
                </button>

                <button
                  onClick={handleExportCSV}
                  className="w-full flex items-center gap-3 px-4 py-3 bg-primary text-black hover:bg-primary/80 transition-colors"
                >
                  <FileSpreadsheet size={18} />
                  <span className="font-medium">CSV exportieren</span>
                </button>

                <button
                  onClick={handleExportJson}
                  className="w-full flex items-center gap-3 px-4 py-3 border border-gray-200 hover:bg-gray-50 transition-colors"
                >
                  <Download size={18} />
                  <span className="font-medium">Backup exportieren (JSON)</span>
                </button>

                <label className="w-full flex items-center gap-3 px-4 py-3 border border-gray-200 hover:bg-gray-50 transition-colors cursor-pointer">
                  <Upload size={18} />
                  <span className="font-medium">Backup importieren</span>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".json"
                    onChange={handleImportJson}
                    className="hidden"
                  />
                </label>

                <button
                  onClick={() => {
                    if (confirm('Alle Daten zurücksetzen? Diese Aktion kann nicht rückgängig gemacht werden.')) {
                      resetState();
                    }
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 border border-red-200 text-red-600 hover:bg-red-50 transition-colors"
                >
                  <RotateCcw size={18} />
                  <span className="font-medium">Zurücksetzen</span>
                </button>
              </div>
            </div>

            {/* Keyboard Shortcuts */}
            <div>
              <h3 className="font-bold text-sm uppercase text-gray-500 mb-4">
                Tastenkürzel
              </h3>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Nächste Folie</span>
                  <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">→</kbd>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Vorherige Folie</span>
                  <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">←</kbd>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Vollbild</span>
                  <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">F</kbd>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Einstellungen</span>
                  <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Esc</kbd>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-auto pt-6 border-t text-center text-xs text-gray-400">
              <p>UHL Kick-off Präsentation v1.0</p>
              <p className="mt-1">
                Session: {projectSettings.sessionId.slice(0, 8)}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Settings Toggle (when not in fullscreen) */}
      {!isSettingsOpen && !isFullscreen && (
        <button
          onClick={toggleSettings}
          className="fixed top-4 right-4 z-50 p-3 bg-white shadow-lg rounded-full hover:bg-gray-50 transition-colors"
          title="Einstellungen öffnen (Esc)"
        >
          <Settings size={24} />
        </button>
      )}
    </div>
  );
}

export default App;
