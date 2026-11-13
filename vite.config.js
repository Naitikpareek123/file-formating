import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: './', // Ensures assets load properly on GitHub Pages and custom domains
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    host: true, // Local Network / Wi-Fi par mobile aur doosre PC ke liye open karta hai
    port: 5173,
  },
  preview: {
    host: true,
    port: 5173,
  },
})
