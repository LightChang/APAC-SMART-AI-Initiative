/**
 * Client-side language detection script.
 * Runs on the root `/` route to redirect users to their preferred locale.
 */

const STORAGE_KEY = 'apac-preferred-locale';
const DEFAULT_LOCALE = 'zh-cn';

const SUPPORTED_LOCALES = [
  'zh-cn', 'zh-TW', 'zh-HK', 'ja', 'ko', 'mn',
  'ms-MY', 'ms-SG', 'id', 'th', 'vi', 'fil', 'km', 'lo', 'my',
  'hi', 'bn', 'ur', 'si', 'ne',
  'en', 'en-NZ',
];

const LANGUAGE_MAP: Record<string, string> = {
  // Chinese variants
  'zh-cn': 'zh-cn',
  'zh-hans': 'zh-cn',
  'zh': 'zh-cn',
  'zh-tw': 'zh-TW',
  'zh-hant': 'zh-TW',
  'zh-hk': 'zh-HK',

  // Japanese
  'ja': 'ja',
  'ja-jp': 'ja',

  // Korean
  'ko': 'ko',
  'ko-kr': 'ko',

  // Mongolian
  'mn': 'mn',

  // Malay variants
  'ms': 'ms-MY',
  'ms-my': 'ms-MY',
  'ms-sg': 'ms-SG',

  // Indonesian
  'id': 'id',
  'id-id': 'id',

  // Thai
  'th': 'th',
  'th-th': 'th',

  // Vietnamese
  'vi': 'vi',
  'vi-vn': 'vi',

  // Filipino / Tagalog
  'fil': 'fil',
  'tl': 'fil',
  'tl-ph': 'fil',

  // Khmer
  'km': 'km',
  'km-kh': 'km',

  // Lao
  'lo': 'lo',
  'lo-la': 'lo',

  // Burmese
  'my': 'my',
  'my-mm': 'my',

  // Hindi
  'hi': 'hi',
  'hi-in': 'hi',

  // Bengali
  'bn': 'bn',
  'bn-bd': 'bn',
  'bn-in': 'bn',

  // Urdu
  'ur': 'ur',
  'ur-pk': 'ur',

  // Sinhala
  'si': 'si',
  'si-lk': 'si',

  // Nepali
  'ne': 'ne',
  'ne-np': 'ne',

  // English variants
  'en': 'en',
  'en-us': 'en',
  'en-gb': 'en',
  'en-au': 'en',
  'en-nz': 'en-NZ',
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
