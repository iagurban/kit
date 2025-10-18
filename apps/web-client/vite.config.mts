import basicSsl from '@vitejs/plugin-basic-ssl';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), basicSsl(), tsconfigPaths({ projects: ['../../tsconfig.json'] })],
  server: {
    https: true,
    port: process.env.WEB_CLIENT_PORT ? parseInt(process.env.WEB_CLIENT_PORT) : 3000,
    fs: {
      // Allow serving files from one level up to the project root
      allow: ['../../'],
    },
  },
});
