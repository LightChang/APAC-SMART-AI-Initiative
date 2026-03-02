/**
 * Client-side language detection script.
 * Runs on the root `/` route to redirect users to their preferred locale.
 */

const STORAGE_KEY = 'apac-preferred-locale';
const DEFAULT_LOCALE = 'zh-cn';
const SUPPORTED_LOCALES = ['zh-cn', 'en'];

const LANGUAGE_MAP: Record<string, string> = {
  'zh-cn': 'zh-cn',
  'zh-hans': 'zh-cn',
  'zh': 'zh-cn',
  'en': 'en',
  'en-us': 'en',
  'en-gb': 'en',
  'en-au': 'en',
  'en-nz': 'en',
  'en-sg': 'en',
  'en-in': 'en',
};

function detectLocale(): string {
  // 1. Check localStorage for saved preference
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved && SUPPORTED_LOCALES.includes(saved)) {
    return saved;
  }

  // 2. Detect from browser languages
  const browserLangs = navigator.languages || [navigator.language];
  for (const lang of browserLangs) {
    const normalized = lang.toLowerCase();
    // Exact match
    if (LANGUAGE_MAP[normalized]) return LANGUAGE_MAP[normalized];
    // Prefix match (e.g. 'en-au' → 'en')
    const prefix = normalized.split('-')[0];
    if (LANGUAGE_MAP[prefix]) return LANGUAGE_MAP[prefix];
  }

  // 3. Fallback to default
  return DEFAULT_LOCALE;
}

export function redirectToLocale(): void {
  const locale = detectLocale();
  localStorage.setItem(STORAGE_KEY, locale);
  const currentPath = window.location.pathname;
  // Only redirect from root
  if (currentPath === '/' || currentPath === '') {
    window.location.replace(`/${locale}/`);
  }
}
