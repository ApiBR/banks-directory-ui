import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  base: '/ui/banks-directory/',
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
