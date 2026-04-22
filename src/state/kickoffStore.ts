import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type {
  KickoffStore,
  KickoffState,
  SectionVisibility,
} from './types';
import {
  DEFAULT_FEATURES,
  DEFAULT_PHASES,
  DEFAULT_GOALS,
} from './types';

// Generate unique ID
const generateId = () => Math.random().toString(36).substring(2, 11);

// Initial state for sections with slides
const initialSections: SectionVisibility[] = [
  {
    id: '01',
    name: 'Ihr Unternehmen & Zielgruppen',
    enabled: true,
    slides: [
      { id: 'title', name: 'Title', enabled: true },
      { id: 'agenda', name: 'Agenda', enabled: true },
      { id: 'divider01', name: 'Sektions-Trenner', enabled: true },
      { id: 'unternehmen', name: 'Unternehmen', enabled: true },
      { id: 'zielgruppe', name: 'Zielgruppe', enabled: true },
      { id: 'competitor', name: 'Wettbewerber', enabled: true },
      { id: 'istSoll', name: 'Ist & Soll', enabled: true },
    ],
  },
  {
    id: '02',
    name: 'Branding & Corporate Design',
    enabled: true,
    slides: [
      { id: 'divider02', name: 'Sektions-Trenner', enabled: true },
      { id: 'aktuellesDesign', name: 'Aktuelles Design', enabled: true },
      { id: 'vibeValues', name: 'Vibe & Values', enabled: true },
      { id: 'likeDislike', name: 'Like & Dislike', enabled: true },
    ],
  },
  {
    id: '03',
    name: 'Website Anforderungen',
    enabled: true,
    slides: [
      { id: 'divider03', name: 'Sektions-Trenner', enabled: true },
      { id: 'websiteZiele', name: 'Website Ziele', enabled: true },
      { id: 'istStatus', name: 'Ist-Status', enabled: true },
      { id: 'inspiration', name: 'Inspiration', enabled: true },
      { id: 'features', name: 'Features', enabled: true },
      { id: 'content', name: 'Content', enabled: true },
      { id: 'specs', name: 'Specs', enabled: true },
    ],
  },
  {
    id: '04',
    name: 'Zusammenarbeit & Prozess',
    enabled: true,
    slides: [
      { id: 'divider04', name: 'Sektions-Trenner', enabled: true },
      { id: 'projektablauf', name: 'Projektablauf', enabled: true },
      { id: 'kommunikation', name: 'Kommunikation', enabled: true },
      { id: 'zusammenfassung', name: 'Zusammenfassung', enabled: true },
    ],
  },
  {
    id: '05',
    name: 'Nächste Schritte',
    enabled: true,
    slides: [
      { id: 'divider05', name: 'Sektions-Trenner', enabled: true },
      { id: 'nextSteps', name: 'Next Steps', enabled: true },
      { id: 'offeneFragen', name: 'Offene Fragen', enabled: true },
      { id: 'abschluss', name: 'Abschluss', enabled: true },
    ],
  },
];

// Initial state
const initialState: KickoffState = {
  // Navigation
  currentSlide: 0,
  isFullscreen: false,
  isSettingsOpen: false,

  // Project Settings
  projectSettings: {
    kundenname: '',
    domain: '',
    logoUrl: null,
    sessionId: generateId(),
  },

  // Section Visibility
  sections: initialSections,

  // Slide Data
  unternehmen: {
    elevatorPitch: '',
    usp: '',
    fokus: '',
    ansprechpartner: '',
    zusatz: '',
  },

  zielgruppe: {
    targetType: null,
    idealerKunde: '',
    hauptproblem: '',
    personas: [
      { id: generateId(), title: 'Persona 1', content: '' },
      { id: generateId(), title: 'Persona 2', content: '' },
      { id: generateId(), title: 'Persona 3', content: '' },
      { id: generateId(), title: 'Persona 4', content: '' },
    ],
  },

  competitors: [
    { id: generateId(), name: '', staerken: '', schwaechen: '', url: '' },
    { id: generateId(), name: '', staerken: '', schwaechen: '', url: '' },
    { id: generateId(), name: '', staerken: '', schwaechen: '', url: '' },
    { id: generateId(), name: '', staerken: '', schwaechen: '', url: '' },
  ],

  istSoll: {
    istStatus: '',
    istProbleme: '',
    istErfahrungen: '',
    sollZiele: '',
    sollErwartungen: '',
    sollTimeline: '',
    notizen: '',
  },

  aktuellesDesign: {
    hatBrandbook: '',
    markenfarben: '',
    schriften: '',
    designNotizen: '',
    logoUpload: null,
  },

  vibeValues: {
    selectedTags: [],
    toggles: {
      formality: 'right',
      emotion: 'right',
      intensity: 'right',
    },
    notizen: '',
  },

  likeDislike: {
    likes: '',
    dislikes: '',
  },

  websiteZiele: {
    goals: DEFAULT_GOALS.map((label) => ({
      id: generateId(),
      label,
      priority: null,
      isCustom: false,
    })).concat([
      { id: generateId(), label: '', priority: null, isCustom: true },
      { id: generateId(), label: '', priority: null, isCustom: true },
      { id: generateId(), label: '', priority: null, isCustom: true },
    ]),
    notizen: '',
  },

  istStatus: {
    currentUrl: '',
    painPoints: {
      designVeraltet: false,
      schwerZuPflegen: false,
      nichtMobilOptimiert: false,
      langsam: false,
      keineAnalytics: false,
    },
    customPainPoint: '',
    screenshotUrl: null,
  },

  inspiration: [
    { id: generateId(), url: '', description: '' },
    { id: generateId(), url: '', description: '' },
    { id: generateId(), url: '', description: '' },
    { id: generateId(), url: '', description: '' },
    { id: generateId(), url: '', description: '' },
  ],

  features: JSON.parse(JSON.stringify(DEFAULT_FEATURES)),

  content: {
    texte: null,
    bilder: null,
    videos: null,
    notizen: '',
  },

  specs: {
    hosting: '',
    cms: '',
    budget: '',
    timeline: '',
    wartung: '',
    techChecks: {
      ssl: false,
      dsgvo: false,
      backup: false,
      analytics: false,
      seo: false,
    },
  },

  projektablauf: JSON.parse(JSON.stringify(DEFAULT_PHASES)),

  projektablaufNotizen: '',

  kommunikation: {
    projektleiter: 'Daniel Hurle',
    position: 'Geschäftsführer',
    email: 'daniel.hurle@uhl-werbeagentur.de',
    telefon: '+49 821 38043',
  },

  zusammenfassung: {
    projektziele: '',
    markenKernaussagen: '',
    wichtigeAnforderungen: '',
  },

  nextSteps: [
    { id: generateId(), wer: 'Kunde', was: 'Inhalte & Texte bereitstellen', naechsteAktion: '' },
    { id: generateId(), wer: 'Kunde', was: 'Feedback zu Entwürfen', naechsteAktion: '' },
    { id: generateId(), wer: 'UHL', was: 'Konzept & Wireframes erstellen', naechsteAktion: '' },
    { id: generateId(), wer: 'UHL', was: 'Design-Entwürfe erstellen', naechsteAktion: '' },
  ],

  offeneFragen: {
    fragen: '',
  },
};

// Store version for migrations
const STORE_VERSION = 1;

export const useKickoffStore = create<KickoffStore>()(
  persist(
    (set, get) => ({
      ...initialState,

      // Navigation Actions
      nextSlide: () => {
        const { currentSlide } = get();
        const totalSlides = getTotalVisibleSlides(get().sections);
        if (currentSlide < totalSlides - 1) {
          set({ currentSlide: currentSlide + 1 });
        }
      },

      prevSlide: () => {
        const { currentSlide } = get();
        if (currentSlide > 0) {
          set({ currentSlide: currentSlide - 1 });
        }
      },

      goToSlide: (index: number) => {
        const totalSlides = getTotalVisibleSlides(get().sections);
        if (index >= 0 && index < totalSlides) {
          set({ currentSlide: index });
        }
      },

      toggleFullscreen: () => {
        set((state) => ({ isFullscreen: !state.isFullscreen }));
      },

      toggleSettings: () => {
        set((state) => ({ isSettingsOpen: !state.isSettingsOpen }));
      },

      // Project Settings Actions
      updateProjectSettings: (settings) => {
        set((state) => ({
          projectSettings: { ...state.projectSettings, ...settings },
        }));
      },

      // Section Visibility Actions
      toggleSection: (sectionId) => {
        set((state) => ({
          sections: state.sections.map((section) =>
            section.id === sectionId
              ? { ...section, enabled: !section.enabled }
              : section
          ),
        }));
      },

      toggleSlide: (sectionId, slideId) => {
        set((state) => ({
          sections: state.sections.map((section) =>
            section.id === sectionId
              ? {
                  ...section,
                  slides: section.slides.map((slide) =>
                    slide.id === slideId
                      ? { ...slide, enabled: !slide.enabled }
                      : slide
                  ),
                }
              : section
          ),
        }));
      },

      // Slide Data Actions
      updateUnternehmen: (data) => {
        set((state) => ({
          unternehmen: { ...state.unternehmen, ...data },
        }));
      },

      updateZielgruppe: (data) => {
        set((state) => ({
          zielgruppe: { ...state.zielgruppe, ...data },
        }));
      },

      updatePersona: (id, content) => {
        set((state) => ({
          zielgruppe: {
            ...state.zielgruppe,
            personas: state.zielgruppe.personas.map((p) =>
              p.id === id ? { ...p, content } : p
            ),
          },
        }));
      },

      addCompetitor: () => {
        set((state) => ({
          competitors: [
            ...state.competitors,
            { id: generateId(), name: '', staerken: '', schwaechen: '', url: '' },
          ],
        }));
      },

      updateCompetitor: (id, data) => {
        set((state) => ({
          competitors: state.competitors.map((c) =>
            c.id === id ? { ...c, ...data } : c
          ),
        }));
      },

      deleteCompetitor: (id) => {
        set((state) => ({
          competitors: state.competitors.filter((c) => c.id !== id),
        }));
      },

      updateIstSoll: (data) => {
        set((state) => ({
          istSoll: { ...state.istSoll, ...data },
        }));
      },

      updateAktuellesDesign: (data) => {
        set((state) => ({
          aktuellesDesign: { ...state.aktuellesDesign, ...data },
        }));
      },

      updateVibeValues: (data) => {
        set((state) => ({
          vibeValues: { ...state.vibeValues, ...data },
        }));
      },

      toggleVibeTag: (tag) => {
        set((state) => {
          const currentTags = state.vibeValues.selectedTags;
          const newTags = currentTags.includes(tag)
            ? currentTags.filter((t) => t !== tag)
            : [...currentTags, tag];
          return {
            vibeValues: { ...state.vibeValues, selectedTags: newTags },
          };
        });
      },

      updateLikeDislike: (data) => {
        set((state) => ({
          likeDislike: { ...state.likeDislike, ...data },
        }));
      },

      updateWebsiteZiele: (data) => {
        set((state) => ({
          websiteZiele: { ...state.websiteZiele, ...data },
        }));
      },

      setGoalPriority: (goalId, priority) => {
        set((state) => ({
          websiteZiele: {
            ...state.websiteZiele,
            goals: state.websiteZiele.goals.map((g) =>
              g.id === goalId ? { ...g, priority } : g
            ),
          },
        }));
      },

      updateIstStatus: (data) => {
        set((state) => ({
          istStatus: { ...state.istStatus, ...data },
        }));
      },

      togglePainPoint: (key) => {
        set((state) => ({
          istStatus: {
            ...state.istStatus,
            painPoints: {
              ...state.istStatus.painPoints,
              [key]: !state.istStatus.painPoints[key],
            },
          },
        }));
      },

      addInspiration: () => {
        set((state) => ({
          inspiration: [
            ...state.inspiration,
            { id: generateId(), url: '', description: '' },
          ],
        }));
      },

      updateInspiration: (id, data) => {
        set((state) => ({
          inspiration: state.inspiration.map((i) =>
            i.id === id ? { ...i, ...data } : i
          ),
        }));
      },

      deleteInspiration: (id) => {
        set((state) => ({
          inspiration: state.inspiration.filter((i) => i.id !== id),
        }));
      },

      toggleFeature: (categoryId, featureId) => {
        set((state) => ({
          features: state.features.map((cat) =>
            cat.id === categoryId
              ? {
                  ...cat,
                  features: cat.features.map((f) =>
                    f.id === featureId ? { ...f, checked: !f.checked } : f
                  ),
                }
              : cat
          ),
        }));
      },

      addCustomFeature: (categoryId, label) => {
        set((state) => ({
          features: state.features.map((cat) =>
            cat.id === categoryId
              ? {
                  ...cat,
                  features: [
                    ...cat.features,
                    { id: generateId(), label, checked: true, isCustom: true },
                  ],
                }
              : cat
          ),
        }));
      },

      updateContent: (data) => {
        set((state) => ({
          content: { ...state.content, ...data },
        }));
      },

      updateSpecs: (data) => {
        set((state) => ({
          specs: { ...state.specs, ...data },
        }));
      },

      toggleSpecCheck: (key) => {
        set((state) => ({
          specs: {
            ...state.specs,
            techChecks: {
              ...state.specs.techChecks,
              [key]: !state.specs.techChecks[key],
            },
          },
        }));
      },

      updatePhaseDate: (phaseId, date) => {
        set((state) => ({
          projektablauf: state.projektablauf.map((p) =>
            p.id === phaseId ? { ...p, date } : p
          ),
        }));
      },

      updateProjektablaufNotizen: (notizen) => {
        set({ projektablaufNotizen: notizen });
      },

      updateKommunikation: (data) => {
        set((state) => ({
          kommunikation: { ...state.kommunikation, ...data },
        }));
      },

      updateZusammenfassung: (data) => {
        set((state) => ({
          zusammenfassung: { ...state.zusammenfassung, ...data },
        }));
      },

      addNextStep: () => {
        set((state) => ({
          nextSteps: [
            ...state.nextSteps,
            { id: generateId(), wer: '', was: '', naechsteAktion: '' },
          ],
        }));
      },

      updateNextStep: (id, data) => {
        set((state) => ({
          nextSteps: state.nextSteps.map((s) =>
            s.id === id ? { ...s, ...data } : s
          ),
        }));
      },

      deleteNextStep: (id) => {
        set((state) => ({
          nextSteps: state.nextSteps.filter((s) => s.id !== id),
        }));
      },

      updateOffeneFragen: (data) => {
        set((state) => ({
          offeneFragen: { ...state.offeneFragen, ...data },
        }));
      },

      // Backup/Restore
      exportState: () => {
        const state = get();
        const exportData = {
          meta: {
            version: STORE_VERSION,
            exportDate: new Date().toISOString(),
            kundenname: state.projectSettings.kundenname,
          },
          data: {
            projectSettings: { ...state.projectSettings, logoUrl: null },
            sections: state.sections,
            unternehmen: state.unternehmen,
            zielgruppe: state.zielgruppe,
            competitors: state.competitors,
            istSoll: state.istSoll,
            aktuellesDesign: { ...state.aktuellesDesign, logoUpload: null },
            vibeValues: state.vibeValues,
            likeDislike: state.likeDislike,
            websiteZiele: state.websiteZiele,
            istStatus: { ...state.istStatus, screenshotUrl: null },
            inspiration: state.inspiration,
            features: state.features,
            content: state.content,
            specs: state.specs,
            projektablauf: state.projektablauf,
            kommunikation: state.kommunikation,
            zusammenfassung: state.zusammenfassung,
            nextSteps: state.nextSteps,
            offeneFragen: state.offeneFragen,
          },
        };
        return JSON.stringify(exportData, null, 2);
      },

      importState: (json) => {
        try {
          const imported = JSON.parse(json);
          if (imported.data) {
            set({
              ...imported.data,
              currentSlide: 0,
              isFullscreen: false,
              isSettingsOpen: false,
            });
          }
        } catch (error) {
          console.error('Failed to import state:', error);
        }
      },

      resetState: () => {
        set({
          ...initialState,
          projectSettings: {
            ...initialState.projectSettings,
            sessionId: generateId(),
          },
        });
      },
    }),
    {
      name: 'uhl-kickoff-storage-v1',
      storage: createJSONStorage(() => localStorage),
      version: STORE_VERSION,
      partialize: (state) => ({
        projectSettings: state.projectSettings,
        sections: state.sections,
        unternehmen: state.unternehmen,
        zielgruppe: state.zielgruppe,
        competitors: state.competitors,
        istSoll: state.istSoll,
        aktuellesDesign: state.aktuellesDesign,
        vibeValues: state.vibeValues,
        likeDislike: state.likeDislike,
        websiteZiele: state.websiteZiele,
        istStatus: state.istStatus,
        inspiration: state.inspiration,
        features: state.features,
        content: state.content,
        specs: state.specs,
        projektablauf: state.projektablauf,
        projektablaufNotizen: state.projektablaufNotizen,
        kommunikation: state.kommunikation,
        zusammenfassung: state.zusammenfassung,
        nextSteps: state.nextSteps,
        offeneFragen: state.offeneFragen,
      }),
    }
  )
);

// Helper function to get total visible slides
function getTotalVisibleSlides(sections: SectionVisibility[]): number {
  return sections
    .filter((s) => s.enabled)
    .reduce((total, section) => {
      return total + section.slides.filter((slide) => slide.enabled).length;
    }, 0);
}

// Helper hook to get visible slides
export function useVisibleSlides() {
  const sections = useKickoffStore((state) => state.sections);
  return getTotalVisibleSlides(sections);
}
