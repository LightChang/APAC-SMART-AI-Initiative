import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import alpinejs from '@astrojs/alpinejs';
import icon from 'astro-icon';

export default defineConfig({
  site: 'https://apac-smart.org',
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'zh-cn',
        locales: {
          'zh-cn': 'zh-CN',
          en: 'en',
        },
      },
    }),
    alpinejs(),
    icon(),
  ],
});
