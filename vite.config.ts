import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages project site: https://baoyx007.github.io/bohemian-scriptorium/
export default defineConfig({
  plugins: [react()],
  base: '/bohemian-scriptorium/',
})
