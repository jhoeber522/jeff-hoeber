import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://jhoeber522.github.io',
  base: '/jeff-hoeber',
  integrations: [sitemap()],
});
