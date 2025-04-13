import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  server: {
    fs: {
      strict: false // Allows accessing files outside root
    }
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true // Helps debug if needed
  }
});