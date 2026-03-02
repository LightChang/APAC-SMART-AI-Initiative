import { defaultLocale, locales, type Locale, localeKeys } from './config';

// Import all locale files statically
import enCommon from './locales/en/common.json';
import enHome from './locales/en/home.json';
import enSmart from './locales/en/smart.json';
import enApac from './locales/en/apac.json';
import enInvolve from './locales/en/involve.json';
import enAbout from './locales/en/about.json';
import enContact from './locales/en/contact.json';
import enApps from './locales/en/apps.json';

import zhCommon from './locales/zh-cn/common.json';
import zhHome from './locales/zh-cn/home.json';
import zhSmart from './locales/zh-cn/smart.json';
import zhApac from './locales/zh-cn/apac.json';
import zhInvolve from './locales/zh-cn/involve.json';
import zhAbout from './locales/zh-cn/about.json';
import zhContact from './locales/zh-cn/contact.json';
import zhApps from './locales/zh-cn/apps.json';

type TranslationDict = Record<string, string | Record<string, unknown>>;

const translations: Record<Locale, TranslationDict> = {
  en: { ...enCommon, ...enHome, ...enSmart, ...enApac, ...enInvolve, ...enAbout, ...enContact, ...enApps },
  'zh-cn': { ...zhCommon, ...zhHome, ...zhSmart, ...zhApac, ...zhInvolve, ...zhAbout, ...zhContact, ...zhApps },
};

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
 * Translate a key for a given locale, with fallback to default locale
 */
export function t(locale: Locale, key: string): string {
  const value = getNestedValue(translations[locale] as Record<string, unknown>, key);
  if (value !== undefined) return value;

  // Fallback to default locale
  if (locale !== defaultLocale) {
    const fallback = getNestedValue(translations[defaultLocale] as Record<string, unknown>, key);
    if (fallback !== undefined) return fallback;
  }

  return key;
}

/** Base path from Astro config (for GitHub Pages subpath deployment) */
const BASE = import.meta.env.BASE_URL.replace(/\/+$/, '');

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
  const cleanPath = path.replace(/^\/(en|zh-cn)\/?/, '').replace(/^\/+|\/+$/g, '');
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
