import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // 关键配置：使用相对路径，避免在 GitHub Pages 子目录下出现 404 错误
})
