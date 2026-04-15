import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


export default defineConfig({
  base:'/',
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost/tetes-nivoles-api',
        changeOrigin: true,
      },
      '/uploads': {
        target: 'http://localhost/tetes-nivoles-api/api',
        changeOrigin: true,
      },
    }
  }
})
