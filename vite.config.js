import { fileURLToPath, URL } from 'node:url'

import { VitePWA } from 'vite-plugin-pwa'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    VitePWA({ 
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}']
      },
      includeAssets: ['logo.svg', './img/icons/favicon-32x32.png'],
      manifest: {
        name: 'Погода',
        short_name: 'Погода',
        description: 'Приложение погоды, способное отображать прогноз в любой точке мира!',
        theme_color: '#4a4c4e',
        lang: "ru",
        icons: [
          {
            src: 'logo.svg',
            sizes: 'any'
          },
          {
            src: './img/icons/favicon-32x32.png',
            sizes: '32x32',
            type: 'image/png'
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
