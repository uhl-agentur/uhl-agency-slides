// ==================== PROJECT SETTINGS ====================
export interface ProjectSettings {
  kundenname: string;          // {{kundenname}} variable
  domain: string;              // {{domain}} variable
  logoUrl: string | null;      // Uploaded customer logo (base64)
  sessionId: string;           // Unique session identifier
}

// ==================== SECTION VISIBILITY ====================
export interface SlideVisibility {
  id: string;                  // Slide identifier
  name: string;                // Display name
  enabled: boolean;            // Toggle individual slide
}

export interface SectionVisibility {
  id: string;                  // '01', '02', '03', '04', '05'
  name: string;                // Section title
  enabled: boolean;            // Toggle entire section
  slides: SlideVisibility[];
}

// ==================== SLIDE 4: UNTERNEHMEN ====================
export interface UnternehmenData {
  elevatorPitch: string;       // Was macht Ihr Unternehmen?
  usp: string;                 // Was unterscheidet Sie?
  fokus: string;               // Worauf liegt der Fokus?
  ansprechpartner: string;     // Wer ist Ansprechpartner?
  zusatz: string;              // Weitere Informationen
}

// ==================== SLIDE 5: ZIELGRUPPE ====================
export interface PersonaCard {
  id: string;
  title: string;               // e.g., "Persona 1"
  content: string;             // Persona description
}

export interface ZielgruppeData {
  targetType: 'B2B' | 'B2C' | 'BOTH' | null;
  idealerKunde: string;        // Ideal customer description
  hauptproblem: string;        // Main problem to solve
  personas: PersonaCard[];     // 4 persona cards
}

// ==================== SLIDE 6: COMPETITOR ====================
export interface CompetitorRow {
  id: string;
  name: string;                // Wettbewerber
  staerken: string;            // Stärken
  schwaechen: string;          // Schwächen
  url: string;                 // Website URL
}

// ==================== SLIDE 7: IST & SOLL ====================
export interface IstSollData {
  istStatus: string;           // Current state
  istProbleme: string;         // Current problems
  istErfahrungen: string;      // Past experiences
  sollZiele: string;           // Target goals
  sollErwartungen: string;     // Expectations
  sollTimeline: string;        // Timeline expectations
  notizen: string;             // Additional notes
}

// ==================== SLIDE 9: AKTUELLES DESIGN ====================
export interface AktuellesDesignData {
  hatBrandbook: string;        // Has brandbook?
  markenfarben: string;        // Brand colors
  schriften: string;           // Fonts
  designNotizen: string;       // Design notes
  logoUpload: string | null;   // Uploaded logo (base64)
}

// ==================== SLIDE 10: VIBE & VALUES ====================
export interface VibeValuesData {
  selectedTags: string[];      // Selected vibe tags
  toggles: {
    formality: 'left' | 'right';    // Förmlich <-> Locker
    emotion: 'left' | 'right';      // Sachlich <-> Emotional
    intensity: 'left' | 'right';    // Dezent <-> Auffällig
  };
  notizen: string;             // Additional notes
}

// Available vibe tags
export const VIBE_TAGS = [
  'Modern', 'Traditionell', 'Innovativ', 'Zuverlässig',
  'Kreativ', 'Professionell', 'Freundlich', 'Premium',
  'Zugänglich', 'Mutig', 'Seriös', 'Verspielt',
  'Luxuriös', 'Natürlich'
] as const;

// ==================== SLIDE 11: LIKE & DISLIKE ====================
export interface LikeDislikeData {
  likes: string;               // What they like
  dislikes: string;            // What they dislike
}

// ==================== SLIDE 13: WEBSITE ZIELE ====================
export interface WebsiteGoal {
  id: string;
  label: string;               // Goal description
  priority: number | null;     // 1-9 or null if not prioritized
  isCustom: boolean;           // User-added goal
}

export interface WebsiteZieleData {
  goals: WebsiteGoal[];
  notizen: string;
}

// Default goals
export const DEFAULT_GOALS: string[] = [
  'Leads generieren',
  'Unternehmen präsentieren',
  'Produkte verkaufen',
  'Informieren & Aufklären',
  'Kunden binden',
  'Gefunden werden (SEO)'
];

// ==================== SLIDE 14: IST-STATUS ====================
export interface IstStatusData {
  currentUrl: string;          // Pre-filled with {{domain}}
  painPoints: {
    designVeraltet: boolean;
    schwerZuPflegen: boolean;
    nichtMobilOptimiert: boolean;
    langsam: boolean;
    keineAnalytics: boolean;
  };
  customPainPoint: string;
  screenshotUrl: string | null;
}

// ==================== SLIDE 15: INSPIRATION ====================
export interface InspirationRow {
  id: string;
  url: string;
  description: string;         // Was gefällt daran?
}

// ==================== SLIDE 16: FEATURES ====================
export interface Feature {
  id: string;
  label: string;
  checked: boolean;
  isCustom: boolean;
}

export interface FeatureCategory {
  id: string;
  name: string;
  features: Feature[];
}

export const DEFAULT_FEATURES: FeatureCategory[] = [
  {
    id: 'basis',
    name: 'Basis',
    features: [
      { id: 'kontaktformular', label: 'Kontaktformular', checked: false, isCustom: false },
      { id: 'impressum', label: 'Impressum/Datenschutz', checked: false, isCustom: false },
      { id: 'responsive', label: 'Responsive Design', checked: false, isCustom: false },
      { id: 'seo', label: 'SEO-Grundlagen', checked: false, isCustom: false },
      { id: 'analytics', label: 'Analytics', checked: false, isCustom: false },
    ]
  },
  {
    id: 'erweitert',
    name: 'Erweitert',
    features: [
      { id: 'blog', label: 'Blog/News', checked: false, isCustom: false },
      { id: 'newsletter', label: 'Newsletter-Integration', checked: false, isCustom: false },
      { id: 'social', label: 'Social Media Integration', checked: false, isCustom: false },
      { id: 'suche', label: 'Suchfunktion', checked: false, isCustom: false },
      { id: 'mehrsprachig', label: 'Mehrsprachigkeit', checked: false, isCustom: false },
    ]
  },
  {
    id: 'spezial',
    name: 'Spezial',
    features: [
      { id: 'shop', label: 'E-Commerce/Shop', checked: false, isCustom: false },
      { id: 'booking', label: 'Buchungssystem', checked: false, isCustom: false },
      { id: 'login', label: 'Kundenportal/Login', checked: false, isCustom: false },
      { id: 'api', label: 'API-Anbindungen', checked: false, isCustom: false },
      { id: 'chatbot', label: 'Chatbot/Live-Chat', checked: false, isCustom: false },
    ]
  },
  {
    id: 'weitere',
    name: 'Weitere',
    features: []
  }
];

// ==================== SLIDE 17: CONTENT ====================
export type ContentStatus = 'vorhanden' | 'teilweise' | 'nichtVorhanden' | null;

export interface ContentData {
  texte: ContentStatus;
  bilder: ContentStatus;
  videos: ContentStatus;
  notizen: string;
}

// ==================== SLIDE 18: SPECS ====================
export interface SpecsData {
  hosting: string;             // Hosting-Präferenz
  cms: string;                 // CMS-Wünsche
  budget: string;              // Budget-Rahmen
  timeline: string;            // Zeitrahmen
  wartung: string;             // Wartung & Support
  techChecks: {
    ssl: boolean;
    dsgvo: boolean;
    backup: boolean;
    analytics: boolean;
    seo: boolean;
  };
}

// ==================== SLIDE 20: PROJEKTABLAUF ====================
export interface ProjectPhase {
  id: string;
  title: string;
  description: string;
  date: string;                // e.g., "06.02.2026"
}

export const DEFAULT_PHASES: ProjectPhase[] = [
  { id: 'kickoff', title: 'Kick-off', description: 'Anforderungen klären', date: '' },
  { id: 'konzept', title: 'Konzept', description: 'Strategie & Struktur', date: '' },
  { id: 'design', title: 'Design', description: 'Entwürfe & Feedback', date: '' },
  { id: 'entwicklung', title: 'Entwicklung', description: 'Technische Umsetzung', date: '' },
  { id: 'launch', title: 'Launch', description: 'Go-Live & Schulung', date: '' },
];

// ==================== SLIDE 21: KOMMUNIKATION ====================
export interface KommunikationData {
  projektleiter: string;
  position: string;
  email: string;
  telefon: string;
}

// ==================== SLIDE 22: ZUSAMMENFASSUNG ====================
export interface ZusammenfassungData {
  projektziele: string;
  markenKernaussagen: string;
  wichtigeAnforderungen: string;
}

// ==================== SLIDE 24: NEXT STEPS ====================
export interface NextStepRow {
  id: string;
  wer: string;                 // Who
  was: string;                 // What
  naechsteAktion: string;      // Next action
}

// ==================== SLIDE 25: OFFENE FRAGEN ====================
export interface OffeneFragenData {
  fragen: string;              // Large textarea
}

// ==================== MAIN STORE STATE ====================
export interface KickoffState {
  // Navigation
  currentSlide: number;
  isFullscreen: boolean;
  isSettingsOpen: boolean;

  // Project Settings
  projectSettings: ProjectSettings;

  // Section Visibility
  sections: SectionVisibility[];

  // Slide Data (all 26 slides)
  unternehmen: UnternehmenData;
  zielgruppe: ZielgruppeData;
  competitors: CompetitorRow[];
  istSoll: IstSollData;
  aktuellesDesign: AktuellesDesignData;
  vibeValues: VibeValuesData;
  likeDislike: LikeDislikeData;
  websiteZiele: WebsiteZieleData;
  istStatus: IstStatusData;
  inspiration: InspirationRow[];
  features: FeatureCategory[];
  content: ContentData;
  specs: SpecsData;
  projektablauf: ProjectPhase[];
  projektablaufNotizen: string;
  kommunikation: KommunikationData;
  zusammenfassung: ZusammenfassungData;
  nextSteps: NextStepRow[];
  offeneFragen: OffeneFragenData;
}

// ==================== STORE ACTIONS ====================
export interface KickoffActions {
  // Navigation
  nextSlide: () => void;
  prevSlide: () => void;
  goToSlide: (index: number) => void;
  toggleFullscreen: () => void;
  toggleSettings: () => void;

  // Project Settings
  updateProjectSettings: (settings: Partial<ProjectSettings>) => void;

  // Section Visibility
  toggleSection: (sectionId: string) => void;
  toggleSlide: (sectionId: string, slideId: string) => void;

  // Slide Data Updates
  updateUnternehmen: (data: Partial<UnternehmenData>) => void;
  updateZielgruppe: (data: Partial<ZielgruppeData>) => void;
  updatePersona: (id: string, content: string) => void;

  addCompetitor: () => void;
  updateCompetitor: (id: string, data: Partial<CompetitorRow>) => void;
  deleteCompetitor: (id: string) => void;

  updateIstSoll: (data: Partial<IstSollData>) => void;
  updateAktuellesDesign: (data: Partial<AktuellesDesignData>) => void;
  updateVibeValues: (data: Partial<VibeValuesData>) => void;
  toggleVibeTag: (tag: string) => void;
  updateLikeDislike: (data: Partial<LikeDislikeData>) => void;

  updateWebsiteZiele: (data: Partial<WebsiteZieleData>) => void;
  setGoalPriority: (goalId: string, priority: number | null) => void;

  updateIstStatus: (data: Partial<IstStatusData>) => void;
  togglePainPoint: (key: keyof IstStatusData['painPoints']) => void;

  addInspiration: () => void;
  updateInspiration: (id: string, data: Partial<InspirationRow>) => void;
  deleteInspiration: (id: string) => void;

  toggleFeature: (categoryId: string, featureId: string) => void;
  addCustomFeature: (categoryId: string, label: string) => void;

  updateContent: (data: Partial<ContentData>) => void;
  updateSpecs: (data: Partial<SpecsData>) => void;
  toggleSpecCheck: (key: keyof SpecsData['techChecks']) => void;

  updatePhaseDate: (phaseId: string, date: string) => void;
  updateProjektablaufNotizen: (notizen: string) => void;
  updateKommunikation: (data: Partial<KommunikationData>) => void;
  updateZusammenfassung: (data: Partial<ZusammenfassungData>) => void;

  addNextStep: () => void;
  updateNextStep: (id: string, data: Partial<NextStepRow>) => void;
  deleteNextStep: (id: string) => void;

  updateOffeneFragen: (data: Partial<OffeneFragenData>) => void;

  // Backup/Restore
  exportState: () => string;
  importState: (json: string) => void;
  resetState: () => void;
}

export type KickoffStore = KickoffState & KickoffActions;
