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
    port:'5173',
		proxy: {
			'/api':{
				target:"http://localhost:50100",
        changeOrigin:true, //支持跨域
        rewrite:(path) => path.replace(/^\/api/, "")//重写路径,替换/api
			},
      '/test':{
        target:"http://localhost:4523",
        changeOrigin:true, //支持跨域
        rewrite:(path) => path.replace(/^\/test/, "")//重写路径,替换/test
      }
		}
	}
})
