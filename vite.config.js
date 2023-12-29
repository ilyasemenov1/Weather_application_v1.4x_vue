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
      includeAssets: ['logo.svg', './img/icons/icon-512x512.png'],
      manifest: {
        name: 'Погода',
        short_name: 'Погода',
        description: 'Приложение погоды, способное отображать прогноз в любой точке мира!',
        theme_color: '#3d3d3f',
        lang: "ru",
        icons: [
          {
            src: 'logo.svg',
            sizes: 'any'
          },
          {
            src: './img/icons/icon-512x512.png',
            sizes: '512x512',
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
