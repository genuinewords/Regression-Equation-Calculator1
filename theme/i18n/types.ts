export const LOCALES = [
  'en', 'hi', 'es', 'ru', 'fr', 'de', 'it', 'pt',
  'bn', 'ja', 'ko', 'ms', 'pl', 'id', 'ar', 'bg', 'tr', 'sv',
] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'en';

export const RTL_LOCALES: readonly Locale[] = ['ar'] as const;

export interface HomeTranslations {
  title: string;
  description: string;
  regressionCalculator: string;
  linearRegression: string;
  polynomialRegression: string;
  multipleRegression: string;
  exploreCalculators: string;
}

export interface AboutTranslations {
  title: string;
  description: string;
  mission: string;
  missionText: string;
  values: string;
  valuesText: string;
  team: string;
  teamText: string;
}

export interface ContactTranslations {
  title: string;
  description: string;
  name: string;
  email: string;
  message: string;
  send: string;
  success: string;
  error: string;
  emailSupport: string;
}

export interface TermsTranslations {
  title: string;
  description: string;
  lastUpdated: string;
  intro: string;
}

export interface PrivacyTranslations {
  title: string;
  description: string;
  lastUpdated: string;
  intro: string;
}

export interface BlogTranslations {
  title: string;
  description: string;
  readMore: string;
  recentPosts: string;
  allPosts: string;
  articles: string;
}

export interface CalculatorTranslations {
  title: string;
  description: string;
  linear: string;
  polynomial: string;
  multiple: string;
  enterData: string;
  calculate: string;
  result: string;
  steps: string;
  coefficient: string;
  intercept: string;
  equation: string;
  rSquared: string;
  adjustedRSquared: string;
  standardError: string;
  dataPoints: string;
  independentVariable: string;
  dependentVariable: string;
  degree: string;
  addPoint: string;
  removePoint: string;
  clear: string;
  example: string;
  showSteps: string;
  hideSteps: string;
  copyEquation: string;
  copied: string;
  invalidData: string;
  insufficientData: string;
  calculationError: string;
  step: string;
  means: string;
}

export interface NotFoundTranslations {
  title: string;
  description: string;
  heading: string;
  message: string;
  backHome: string;
}

export interface SitemapTranslations {
  title: string;
  description: string;
  pages: string;
  calculators: string;
  resources: string;
}

export interface Translations {
  siteTitle: string;
  siteDescription: string;
  home: HomeTranslations;
  about: AboutTranslations;
  contact: ContactTranslations;
  terms: TermsTranslations;
  privacy: PrivacyTranslations;
  blog: BlogTranslations;
  calculator: CalculatorTranslations;
  notFound: NotFoundTranslations;
  sitemap: SitemapTranslations;
}

export interface NavLabels {
  home: string;
  tools: string;
  linearCalc: string;
  quadCalc: string;
  multiCalc: string;
  pearsonCorrelation: string;
  grubbsTest: string;
  assumptionsChecker: string;
  aboutUs: string;
  blog: string;
  contactUs: string;
  terms: string;
  privacy: string;
  sitemap: string;
  calculator: string;
  language: string;
}

export interface FooterLabels {
  copyright: string;
  allRightsReserved: string;
  disclaimer: string;
  privacyPolicy: string;
  termsOfService: string;
  contactUs: string;
  toolsTitle: string;
  companyTitle: string;
  connectTitle: string;
  languageTitle: string;
}

export interface CommonLabels {
  readMore: string;
  learnMore: string;
  getStarted: string;
  loading: string;
  error: string;
  back: string;
  next: string;
  previous: string;
  close: string;
  menu: string;
  theme: string;
  light: string;
  dark: string;
  system: string;
  skipToContent: string;
  scrollToTop: string;
  selectLanguage: string;
  availableLanguages: string;
  showing: string;
  of: string;
  exploreTools: string;
  mainToolsTitle: string;
  languagesTitle: string;
}

export interface SharedLabels {
  nav: NavLabels;
  footer: FooterLabels;
  common: CommonLabels;
}

export interface FaqItem {
  question: string;
  answer: string;
  display: boolean;
}

export interface FaqData {
  faqs: FaqItem[];
}

export interface MergedTranslations extends Translations {
  nav: NavLabels;
  footer: FooterLabels;
  common: CommonLabels;
  faqs: FaqItem[];
}
