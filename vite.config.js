import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@component': path.resolve(__dirname, './src/comps'),
      '@styles': path.resolve(__dirname, './src/styles'),
      // Add more aliases as needed
    },
  },
});
