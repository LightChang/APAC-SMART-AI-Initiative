import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import alpinejs from '@astrojs/alpinejs';
import icon from 'astro-icon';

export default defineConfig({
  site: 'https://apac.health',
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'zh-cn',
        locales: {
          // East Asia
          'zh-cn': 'zh-CN',
          'zh-TW': 'zh-TW',
          'zh-HK': 'zh-HK',
          ja: 'ja',
          ko: 'ko',
          mn: 'mn',
          // Southeast Asia
          'ms-MY': 'ms-MY',
          'ms-SG': 'ms-SG',
          id: 'id',
          th: 'th',
          vi: 'vi',
          fil: 'fil',
          km: 'km',
          lo: 'lo',
          my: 'my',
          // South Asia
          hi: 'hi',
          bn: 'bn',
          ur: 'ur',
          si: 'si',
          ne: 'ne',
          // Oceania / English
          en: 'en',
          'en-NZ': 'en-NZ',
        },
      },
    }),
    alpinejs(),
    icon(),
  ],
});
