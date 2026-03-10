import { defineConfig } from 'vite';
import { baseURL } from './config';

// https://vitejs.dev/config/
export default defineConfig({
  base: baseURL,
  css: {
    postcss: './postcss.config.js'
  }
});