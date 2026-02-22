import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://jeffhoeber.com',
  integrations: [sitemap()],
  vite: {
    envPrefix: 'CONTENTFUL_',
  },
});
