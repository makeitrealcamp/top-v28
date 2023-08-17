import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const proxy =
  process.env.NODE_ENV === 'development'
    ? {
        '/api': 'http://localhost:3000/',
      }
    : {};

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
  },
  plugins: [react()],
  server: {
    proxy: proxy,
  },
});
