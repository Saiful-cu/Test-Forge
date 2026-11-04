import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Absolute asset URLs, so nested routes like /projects/:id still load /assets/*.
  base: '/',
})
