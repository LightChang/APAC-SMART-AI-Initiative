export const defaultLocale = 'zh-cn' as const;

export const locales = {
  // East Asia
  'zh-cn': { label: '简体中文', lang: 'zh-CN', dir: 'ltr', region: 'east-asia', font: 'noto-sans-sc' },
  'zh-TW': { label: '繁體中文(台灣)', lang: 'zh-TW', dir: 'ltr', region: 'east-asia', font: 'noto-sans-tc' },
  'zh-HK': { label: '繁體中文(香港)', lang: 'zh-HK', dir: 'ltr', region: 'east-asia', font: 'noto-sans-tc' },
  ja: { label: '日本語', lang: 'ja', dir: 'ltr', region: 'east-asia', font: 'noto-sans-jp' },
  ko: { label: '한국어', lang: 'ko', dir: 'ltr', region: 'east-asia', font: 'noto-sans-kr' },
  mn: { label: 'Монгол', lang: 'mn', dir: 'ltr', region: 'east-asia', font: 'noto-sans-mongolian' },

  // Southeast Asia
  'ms-MY': { label: 'Bahasa Malaysia', lang: 'ms-MY', dir: 'ltr', region: 'southeast-asia', font: 'inter' },
  'ms-SG': { label: 'Bahasa Melayu (SG)', lang: 'ms-SG', dir: 'ltr', region: 'southeast-asia', font: 'inter' },
  id: { label: 'Bahasa Indonesia', lang: 'id', dir: 'ltr', region: 'southeast-asia', font: 'inter' },
  th: { label: 'ภาษาไทย', lang: 'th', dir: 'ltr', region: 'southeast-asia', font: 'noto-sans-thai' },
  vi: { label: 'Tiếng Việt', lang: 'vi', dir: 'ltr', region: 'southeast-asia', font: 'inter' },
  fil: { label: 'Filipino', lang: 'fil', dir: 'ltr', region: 'southeast-asia', font: 'inter' },
  km: { label: 'ភាសាខ្មែរ', lang: 'km', dir: 'ltr', region: 'southeast-asia', font: 'noto-sans-khmer' },
  lo: { label: 'ພາສາລາວ', lang: 'lo', dir: 'ltr', region: 'southeast-asia', font: 'noto-sans-lao' },
  my: { label: 'မြန်မာဘာသာ', lang: 'my', dir: 'ltr', region: 'southeast-asia', font: 'noto-sans-myanmar' },

  // South Asia
  hi: { label: 'हिन्दी', lang: 'hi', dir: 'ltr', region: 'south-asia', font: 'noto-sans-devanagari' },
  bn: { label: 'বাংলা', lang: 'bn', dir: 'ltr', region: 'south-asia', font: 'noto-sans-bengali' },
  ur: { label: 'اردو', lang: 'ur', dir: 'rtl', region: 'south-asia', font: 'noto-sans-arabic' },
  si: { label: 'සිංහල', lang: 'si', dir: 'ltr', region: 'south-asia', font: 'noto-sans-sinhala' },
  ne: { label: 'नेपाली', lang: 'ne', dir: 'ltr', region: 'south-asia', font: 'noto-sans-devanagari' },

  // Oceania / English
  en: { label: 'English', lang: 'en', dir: 'ltr', region: 'oceania', font: 'inter' },
  'en-NZ': { label: 'English (NZ)', lang: 'en-NZ', dir: 'ltr', region: 'oceania', font: 'inter' },
} as const;

export type Locale = keyof typeof locales;
export type LocaleConfig = (typeof locales)[Locale];

export const localeKeys = Object.keys(locales) as Locale[];

/** Locale inheritance for variants that share most translations */
export const localeInheritance: Partial<Record<Locale, Locale>> = {
  'en-NZ': 'en',
  'zh-HK': 'zh-TW',
  'ms-SG': 'ms-MY',
};

/** Group locales by region for the language switcher UI */
export const localesByRegion = {
  'east-asia': ['zh-cn', 'zh-TW', 'zh-HK', 'ja', 'ko', 'mn'] as Locale[],
  'southeast-asia': ['ms-MY', 'ms-SG', 'id', 'th', 'vi', 'fil', 'km', 'lo', 'my'] as Locale[],
  'south-asia': ['hi', 'bn', 'ur', 'si', 'ne'] as Locale[],
  oceania: ['en', 'en-NZ'] as Locale[],
} as const;

export const regionLabels: Record<keyof typeof localesByRegion, { en: string; zh: string }> = {
  'east-asia': { en: 'East Asia', zh: '東亞' },
  'southeast-asia': { en: 'Southeast Asia', zh: '東南亞' },
  'south-asia': { en: 'South Asia', zh: '南亞' },
  oceania: { en: 'Oceania', zh: '大洋洲' },
};

/** Maps browser language codes to our locale keys */
export const languageMap: Record<string, Locale> = {
  // Chinese variants
  'zh-cn': 'zh-cn',
  'zh-hans': 'zh-cn',
  zh: 'zh-cn',
  'zh-tw': 'zh-TW',
  'zh-hant': 'zh-TW',
  'zh-hk': 'zh-HK',

  // Japanese
  ja: 'ja',
  'ja-jp': 'ja',

  // Korean
  ko: 'ko',
  'ko-kr': 'ko',

  // Mongolian
  mn: 'mn',

  // Malay variants
  ms: 'ms-MY',
  'ms-my': 'ms-MY',
  'ms-sg': 'ms-SG',

  // Indonesian
  id: 'id',
  'id-id': 'id',

  // Thai
  th: 'th',
  'th-th': 'th',

  // Vietnamese
  vi: 'vi',
  'vi-vn': 'vi',

  // Filipino / Tagalog
  fil: 'fil',
  tl: 'fil',
  'tl-ph': 'fil',

  // Khmer
  km: 'km',
  'km-kh': 'km',

  // Lao
  lo: 'lo',
  'lo-la': 'lo',

  // Burmese
  my: 'my',
  'my-mm': 'my',

  // Hindi
  hi: 'hi',
  'hi-in': 'hi',

  // Bengali
  bn: 'bn',
  'bn-bd': 'bn',
  'bn-in': 'bn',

  // Urdu
  ur: 'ur',
  'ur-pk': 'ur',

  // Sinhala
  si: 'si',
  'si-lk': 'si',

  // Nepali
  ne: 'ne',
  'ne-np': 'ne',

  // English variants
  en: 'en',
  'en-us': 'en',
  'en-gb': 'en',
  'en-au': 'en',
  'en-nz': 'en-NZ',
  'en-sg': 'en',
  'en-in': 'en',
};

/** Navigation items */
export const navItems = [
  { key: 'nav.home', path: '' },
  { key: 'nav.smart', path: 'smart-on-fhir' },
  { key: 'nav.apps', path: 'smarthealth-apps' },
  { key: 'nav.apac', path: 'apac-opportunity' },
  { key: 'nav.involve', path: 'get-involved' },
  { key: 'nav.about', path: 'about' },
  { key: 'nav.contact', path: 'contact' },
] as const;
