import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
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
