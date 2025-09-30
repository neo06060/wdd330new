import { defineConfig } from 'vite'

export default defineConfig({
  base: '/wdd330new/',

  // Le build va générer directement le dossier "docs/"
  build: {
    outDir: 'docs'
  }
})