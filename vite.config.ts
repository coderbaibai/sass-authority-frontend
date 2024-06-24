import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server:{
    host:'0.0.0.0',
    port:5173,
		proxy: {
			'/api':{
        // target:"http://10.236.60.40:8081",
        // target:"http://10.240.71.33:8081",
        target:"http://10.241.122.174:8081",
        changeOrigin:true,
        rewrite:(path) => path.replace(/^\/api/, "")
			},
      '/test':{
        target:"http://localhost:4523",
        changeOrigin:true,
        rewrite:(path) => path.replace(/^\/test/, "")
      }
		}
	}
})

