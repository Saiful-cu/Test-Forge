import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Relative asset URLs, so the build runs unchanged from a domain root, a
  // sub-folder (GitHub Pages) or any nested static URL.
  base: './',
})
