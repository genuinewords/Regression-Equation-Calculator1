import {
  type Locale,
  type MergedTranslations,
  DEFAULT_LOCALE,
  LOCALES,
  RTL_LOCALES,
} from './types';

const mainModules = import.meta.glob<Record<string, any>>(
  '../../src/i18n/*.json',
  { eager: true }
);

const sharedModules = import.meta.glob<Record<string, any>>(
  '../../src/i18n/shared/*.json',
  { eager: true }
);

const faqModules = import.meta.glob<Record<string, any>>(
  '../../src/i18n/faq/*.json',
  { eager: true }
);

function extractLocaleFromGlobKey(key: string): string {
  const fileName = key.split('/').pop()!;
  return fileName.replace('.json', '');
}

function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

function deepMerge<T extends Record<string, any>>(
  base: T,
  override: Partial<T>
): T {
  const result = { ...base } as Record<string, any>;
  for (const key of Object.keys(override)) {
    const baseVal = result[key];
    const overVal = (override as Record<string, any>)[key];
    if (
      baseVal &&
      overVal &&
      typeof baseVal === 'object' &&
      typeof overVal === 'object' &&
      !Array.isArray(baseVal) &&
      !Array.isArray(overVal)
    ) {
      result[key] = deepMerge(baseVal, overVal);
    } else if (overVal !== undefined) {
      result[key] = overVal;
    }
  }
  return result as T;
}

function loadJsonFromModules(
  modules: Record<string, any>,
  locale: string
): Record<string, any> | null {
  for (const [key, mod] of Object.entries(modules)) {
    if (extractLocaleFromGlobKey(key) === locale) {
      return (mod as any).default ?? mod;
    }
  }
  return null;
}

function loadEnBase(
  modules: Record<string, any>
): Record<string, any> {
  const data = loadJsonFromModules(modules, DEFAULT_LOCALE);
  if (!data) {
    return {};
  }
  return data;
}

export function getLocalizedUrl(path: string, locale: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  if (locale === DEFAULT_LOCALE) {
    return cleanPath;
  }
  return `/${locale}${cleanPath}`;
}

export function extractLocaleFromParams(
  params: Record<string, string | undefined>
): Locale {
  const raw = params.locale;
  if (raw && isLocale(raw)) {
    return raw;
  }
  return DEFAULT_LOCALE;
}

export function getLocaleStaticPaths(): Array<{ params: { locale: string } }> {
  return LOCALES.filter(
    (locale) => locale !== DEFAULT_LOCALE
  ).map((locale) => ({
    params: { locale },
  }));
}

export async function mergeTranslations(
  locale: string
): Promise<MergedTranslations> {
  const enMain = loadEnBase(mainModules);
  const enShared = loadEnBase(sharedModules);
  const enFaq = loadEnBase(faqModules);

  const localeMain = loadJsonFromModules(mainModules, locale) ?? {};
  const localeShared = loadJsonFromModules(sharedModules, locale) ?? {};
  const localeFaq = loadJsonFromModules(faqModules, locale) ?? {};

  const mergedMain = deepMerge(enMain, localeMain);
  const mergedShared = deepMerge(enShared, localeShared);
  const mergedFaq = deepMerge(enFaq, localeFaq);

  return {
    ...mergedMain,
    nav: mergedShared.nav ?? enShared.nav ?? {},
    footer: mergedShared.footer ?? enShared.footer ?? {},
    common: mergedShared.common ?? enShared.common ?? {},
    faqs: mergedFaq.faqs ?? enFaq.faqs ?? [],
  } as MergedTranslations;
}

export function t(translations: MergedTranslations, key: string): string {
  const keys = key.split('.');
  let current: any = translations;
  for (const k of keys) {
    if (current == null || typeof current !== 'object') {
      return key;
    }
    current = current[k];
  }
  if (typeof current === 'string') {
    return current;
  }
  return key;
}

export function getDirection(locale: string): 'ltr' | 'rtl' {
  if ((RTL_LOCALES as readonly string[]).includes(locale)) {
    return 'rtl';
  }
  return 'ltr';
}

const OG_LOCALE_MAP: Record<string, string> = {
  en: 'en_US',
  hi: 'hi_IN',
  es: 'es_ES',
  ru: 'ru_RU',
  fr: 'fr_FR',
  de: 'de_DE',
  it: 'it_IT',
  pt: 'pt_PT',
  bn: 'bn_BD',
  ja: 'ja_JP',
  ko: 'ko_KR',
  ms: 'ms_MY',
  pl: 'pl_PL',
  id: 'id_ID',
  ar: 'ar_SA',
  bg: 'bg_BG',
  tr: 'tr_TR',
  sv: 'sv_SE',
};

export function getLocaleOgLocale(locale: string): string {
  return OG_LOCALE_MAP[locale] ?? `${locale}_${locale.toUpperCase()}`;
}
