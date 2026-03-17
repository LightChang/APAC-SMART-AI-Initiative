# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

APAC Precision Health Initiative website promoting SMART on FHIR adoption in Asia-Pacific. Built with Astro, Tailwind CSS, and Alpine.js. Deployed to GitHub Pages at https://apac.health.

## Build Commands

```bash
npm install          # Install dependencies
npm run dev          # Start development server
npm run build        # Production build (outputs to dist/)
npm run preview      # Preview production build locally
```

## Architecture

### Technology Stack
- **Astro** v5.18.0 - Static site generator
- **Tailwind CSS** v4.2.1 - Utility-first styling
- **Alpine.js** v3.15.8 - Lightweight interactivity
- **TypeScript** - Strict mode enabled

### Directory Structure
```
src/
├── layouts/          # Page layouts (BaseLayout.astro)
├── components/
│   ├── layout/       # Header, Footer, LanguageSwitcher
│   ├── sections/     # Large content blocks (Hero, KeyMetrics, etc.)
│   ├── ui/           # Atomic components (Card, Button, MetricCard)
│   └── seo/          # SEO components (BaseHead)
├── pages/
│   ├── index.astro   # Root redirect (language detection)
│   └── [...locale]/  # Dynamic routing for all 23 locales
├── i18n/
│   ├── config.ts     # 23 locale definitions with region grouping
│   ├── utils.ts      # Dynamic translation loading with inheritance
│   ├── languageDetect.ts  # Browser language detection
│   └── locales/      # Translation JSON files (23 directories)
├── assets/data/      # JSON data (partners, apps, metrics, timeline)
└── styles/global.css # Global styles, Tailwind theme, RTL support
```

### Import Path Alias
Use `@/*` to import from `src/*`:
```typescript
import { t, getLocalizedPath } from '@/i18n/utils';
```

## Internationalization (i18n)

**23 Locales across 4 regions:**

| Region | Locales |
|--------|---------|
| East Asia | zh-cn (default), zh-TW, zh-HK, ja, ko, mn |
| Southeast Asia | ms-MY, ms-SG, id, th, vi, fil, km, lo, my |
| South Asia | hi, bn, ur (RTL), si, ne |
| Oceania | en, en-NZ |

### Translation System
- Dynamic loading via `import.meta.glob` in `utils.ts`
- 8 JSON files per locale: common, home, smart, apac, about, involve, contact, apps
- Locale inheritance: `en-NZ` → `en`, `zh-HK` → `zh-TW`, `ms-SG` → `ms-MY`
- Fallback chain: requested locale → parent locale → default (zh-cn)

### Key Functions
```typescript
t(locale, 'namespace.key')        // Get translation
getLocalizedPath(locale, '/path') // Build localized URL
getRawPagePath(pathname)          // Extract path without locale
```

### Adding New Locale
1. Add locale config in `src/i18n/config.ts` (locales, languageMap, localesByRegion)
2. Create directory `src/i18n/locales/{locale}/` with 8 JSON files
3. Update `src/i18n/languageDetect.ts` and `src/pages/index.astro`
4. Update `astro.config.mjs` sitemap locales

### URL Pattern
`/{locale}/{page}/` with trailing slash (e.g., `/ja/about/`, `/ur/contact/`)

## Dynamic Routing

Pages use `getStaticPaths()` to generate all 23 locale versions:

```astro
---
import { localeKeys, type Locale } from '@/i18n/config';

export function getStaticPaths() {
  return localeKeys.map((locale) => ({ params: { locale } }));
}

const { locale } = Astro.params as { locale: Locale };
---
```

## RTL Support

Urdu (ur) uses RTL direction. CSS utilities in `global.css`:
- `[dir="rtl"]` selectors for text alignment and flex direction
- Border and padding adjustments

## Data Files

Content externalized to JSON in `src/assets/data/`:
- `partners.json` - Partner organizations
- `smarthealth-apps.json` - SMART Health apps catalog
- `metrics.json` - Key statistics
- `timeline.json` - Initiative timeline (with locale keys)
- `countries.json` - APAC country data (with locale keys)

## Deployment

GitHub Actions deploys to Pages on push to `main` or `claude/*` branches. Custom domain configured via `public/CNAME`.

## Color Theme

Primary colors defined in `src/styles/global.css`:
- Navy: `#0F172A`
- Cyan: `#0891B2`
- Emerald: `#059669`
- Warm White: `#FAFAF9`
- Slate BG: `#F1F5F9`
