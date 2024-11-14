import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    // Asegúrate de que Vite procese el CSS correctamente
    preprocessorOptions: {
      css: {
        // Aquí puedes agregar configuraciones si usas preprocesadores como SCSS, etc.
      },
    },
  },
})