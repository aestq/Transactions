import { defineConfig } from 'vite'
import svgr from 'vite-plugin-svgr'
import react from '@vitejs/plugin-react'
import path from 'path'
import dns from 'dns'

dns.setDefaultResultOrder('verbatim')

export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      '@pages': path.resolve(__dirname, 'src', 'pages'),
      '@components': path.resolve(__dirname, 'src', 'components'),
      '@assets': path.resolve(__dirname, 'src', 'assets'),
      '@hooks': path.resolve(__dirname, 'src', 'hooks'),
      '@modules': path.resolve(__dirname, 'src', 'modules'),
      '@store': path.resolve(__dirname, 'src', 'store'),
      '@services': path.resolve(__dirname, 'src', 'services'),
      '@': path.resolve(__dirname, 'src')
    },
  },
  server: {
    port: 3000,
    host: "localhost"
  }
})


