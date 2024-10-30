import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import history from 'vite-plugin-history';

export default defineConfig({
  plugins: [react(), history()],
});




