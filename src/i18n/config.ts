export const defaultLocale = 'zh-cn' as const;

export const locales = {
  'zh-cn': { label: '简体中文', lang: 'zh-CN', dir: 'ltr' },
  en: { label: 'English', lang: 'en', dir: 'ltr' },
} as const;

export type Locale = keyof typeof locales;

export const localeKeys = Object.keys(locales) as Locale[];

/** Maps browser language codes to our locale keys */
export const languageMap: Record<string, Locale> = {
  'zh-cn': 'zh-cn',
  'zh-hans': 'zh-cn',
  zh: 'zh-cn',
  en: 'en',
  'en-us': 'en',
  'en-gb': 'en',
  'en-au': 'en',
};

/** Navigation items */
export const navItems = [
  { key: 'nav.home', path: '' },
  { key: 'nav.smart', path: 'smart-on-fhir' },
  { key: 'nav.apac', path: 'apac-opportunity' },
  { key: 'nav.involve', path: 'get-involved' },
  { key: 'nav.about', path: 'about' },
  { key: 'nav.contact', path: 'contact' },
] as const;
