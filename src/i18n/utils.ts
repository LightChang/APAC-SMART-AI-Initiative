import { defaultLocale, locales, type Locale, localeKeys, localeInheritance } from './config';

type TranslationDict = Record<string, string | Record<string, unknown>>;

// Use Vite's import.meta.glob for dynamic loading at build time
const translationModules = import.meta.glob<{ default: TranslationDict }>(
  './locales/*/*.json',
  { eager: true }
);

// Translation file names in loading order
const TRANSLATION_FILES = ['common', 'home', 'smart', 'apac', 'involve', 'about', 'contact', 'apps'];

/**
 * Load translations for a specific locale
 */
function loadTranslationsForLocale(locale: string): TranslationDict {
  let merged: TranslationDict = {};

  for (const file of TRANSLATION_FILES) {
    const path = `./locales/${locale}/${file}.json`;
    const module = translationModules[path];
    if (module?.default) {
      merged = { ...merged, ...module.default };
    }
  }

  return merged;
}

/**
 * Deep merge two translation dictionaries
 */
function deepMerge(base: TranslationDict, override: TranslationDict): TranslationDict {
  const result: TranslationDict = { ...base };

  for (const key of Object.keys(override)) {
    const baseVal = base[key];
    const overrideVal = override[key];

    if (
      typeof baseVal === 'object' &&
      baseVal !== null &&
      typeof overrideVal === 'object' &&
      overrideVal !== null &&
      !Array.isArray(baseVal) &&
      !Array.isArray(overrideVal)
    ) {
      result[key] = deepMerge(
        baseVal as TranslationDict,
        overrideVal as TranslationDict
      );
    } else {
      result[key] = overrideVal;
    }
  }

  return result;
}

/**
 * Load translations with inheritance support
 * e.g., en-NZ inherits from en, zh-HK inherits from zh-TW
 */
function loadTranslationsWithInheritance(locale: Locale): TranslationDict {
  const parentLocale = localeInheritance[locale];

  if (parentLocale) {
    // Load parent translations first
    const parentTranslations = loadTranslationsForLocale(parentLocale);
    // Load specific locale translations
    const localeTranslations = loadTranslationsForLocale(locale);
    // Merge with locale-specific overrides
    return deepMerge(parentTranslations, localeTranslations);
  }

  return loadTranslationsForLocale(locale);
}

// Build translations cache at module initialization
const translations: Record<Locale, TranslationDict> = {} as Record<Locale, TranslationDict>;

for (const locale of localeKeys) {
  translations[locale] = loadTranslationsWithInheritance(locale);
}

/**
 * Get a nested value from an object using a dot-separated key path
 */
function getNestedValue(obj: Record<string, unknown>, keyPath: string): string | undefined {
  const keys = keyPath.split('.');
  let current: unknown = obj;
  for (const key of keys) {
    if (current === null || current === undefined || typeof current !== 'object') return undefined;
    current = (current as Record<string, unknown>)[key];
  }
  return typeof current === 'string' ? current : undefined;
}

/**
 * Translate a key for a given locale, with fallback chain:
 * 1. Requested locale
 * 2. Parent locale (if inheritance exists)
 * 3. Default locale (zh-cn)
 */
export function t(locale: Locale, key: string): string {
  // Try requested locale
  const value = getNestedValue(translations[locale] as Record<string, unknown>, key);
  if (value !== undefined) return value;

  // Try parent locale if exists
  const parentLocale = localeInheritance[locale];
  if (parentLocale) {
    const parentValue = getNestedValue(translations[parentLocale] as Record<string, unknown>, key);
    if (parentValue !== undefined) return parentValue;
  }

  // Fallback to default locale
  if (locale !== defaultLocale) {
    const fallback = getNestedValue(translations[defaultLocale] as Record<string, unknown>, key);
    if (fallback !== undefined) return fallback;
  }

  return key;
}

/** Base path from Astro config (for GitHub Pages subpath deployment) */
const BASE = import.meta.env.BASE_URL.replace(/\/+$/, '');

// Build regex pattern for all locale codes
const localePattern = localeKeys.map((l) => l.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');

/**
 * Get locale from URL pathname (strips base path first)
 */
export function getLocaleFromPath(pathname: string): Locale {
  const stripped = pathname.replace(new RegExp(`^${BASE}/?`), '');
  const segments = stripped.split('/').filter(Boolean);
  const first = segments[0];
  if (first && localeKeys.includes(first as Locale)) {
    return first as Locale;
  }
  return defaultLocale;
}

/**
 * Build a localized path, prepending the base path
 */
export function getLocalizedPath(locale: Locale, path: string = ''): string {
  const cleanPath = path.replace(/^\/+|\/+$/g, '');
  return `${BASE}/${locale}${cleanPath ? `/${cleanPath}` : ''}/`;
}

/**
 * Get all alternate locale URLs for hreflang tags
 */
export function getAlternateUrls(path: string): { locale: Locale; url: string }[] {
  // Strip any existing locale prefix from the path
  const cleanPath = path
    .replace(new RegExp(`^/(${localePattern})/?`), '')
    .replace(/^\/+|\/+$/g, '');

  return localeKeys.map((locale) => ({
    locale,
    url: getLocalizedPath(locale, cleanPath),
  }));
}

/**
 * Get locale config
 */
export function getLocaleConfig(locale: Locale) {
  return locales[locale];
}

/**
 * Extract raw page path from a full pathname (strips base and locale)
 */
export function getRawPagePath(pathname: string): string {
  return pathname
    .replace(new RegExp(`^${BASE}/(${localePattern})/?`), '')
    .replace(/\/+$/, '');
}
