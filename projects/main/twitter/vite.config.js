import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import pluginRewriteAll from 'vite-plugin-rewrite-all';

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    environment: 'jsdom',
  },
  plugins: [react(), pluginRewriteAll()],
});
