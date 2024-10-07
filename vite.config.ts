import path from 'node:path'

import react from '@vitejs/plugin-react'
import fs from 'fs'
import { defineConfig, loadEnv } from 'vite'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load environment variables based on the current mode
  const envVars = loadEnv(mode, process.cwd())

  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      https: {
        key: fs.readFileSync(path.resolve(__dirname, 'key.pem')),
        cert: fs.readFileSync(path.resolve(__dirname, 'cert.pem')),
      },
      proxy: {
        '/api': {
          target: envVars.VITE_API_URL,
          changeOrigin: true,
          secure: true, // Certifica-se de que o proxy também está usando HTTPS.
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    },
  }
})
