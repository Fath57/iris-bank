import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: true, 
    port: 5173, 
    strictPort: true, 
    hmr: {
      clientPort: 5173, 
    },
    proxy: {
      '/api': {
        target: 'http://backend:5001', 
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
    watch: {
      usePolling: true, 
      interval: 1000,  
    },
  },
})