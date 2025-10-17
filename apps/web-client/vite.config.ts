import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import basicSsl from '@vitejs/plugin-basic-ssl';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), basicSsl()],
  server: {
    https: true,
    port: process.env.WEB_CLIENT_PORT ? parseInt(process.env.WEB_CLIENT_PORT) : 3000,
  },
});
