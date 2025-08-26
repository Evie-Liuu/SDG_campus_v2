import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss()
  ],
  base: "/SDG_campus_v2/",
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // @ 指向 src 目录
    },
  },
})
