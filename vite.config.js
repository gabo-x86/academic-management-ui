import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dotenv from 'dotenv';

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  define: {
    'import.meta.env.KEYCLOAK_HOST': JSON.stringify(process.env.KEYCLOAK_HOST),
    'import.meta.env.KEYCLOAK_REALM': JSON.stringify(process.env.KEYCLOAK_REALM),
    'import.meta.env.KEYCLOAK_CLIENT_ID': JSON.stringify(process.env.KEYCLOAK_CLIENT_ID)
  }
})
