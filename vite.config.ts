import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
  port: process.env.PORT ||10000,  // Usa el puerto proporcionado por el entorno o 3000 como valor por defecto
}
})

