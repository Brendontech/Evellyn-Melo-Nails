import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base './' permite publicar em qualquer subpasta (GitHub Pages, Hostinger, Netlify, Vercel)
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: './',
})
