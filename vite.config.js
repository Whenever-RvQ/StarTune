import { defineConfig } from 'vite';
import path from 'path';
import fs from 'fs';

// 自定义插件：将所有 src/*.js 按 main.js 的 import 顺序简单拼接
// 不走 Rollup 模块系统，避免变量重命名和作用域隔离
function concatPlugin() {
  return {
    name: 'startune-concat',
    generateBundle(_, bundle) {
      // 读取 main.js 获取 import 顺序
      const mainContent = fs.readFileSync(path.resolve(__dirname, 'src/main.js'), 'utf8');
      const imports = [...mainContent.matchAll(/import\s+['"]\.\/([^'"]+)['"]/g)].map(m => m[1]);
      
      // 按顺序拼接所有模块
      let combined = '// StarTune — Vite concat build\n';
      combined += '"use strict";\n\n';
      for (const file of imports) {
        const filePath = path.resolve(__dirname, 'src', file);
        if (fs.existsSync(filePath)) {
          const content = fs.readFileSync(filePath, 'utf8');
          combined += `// ===== ${file} =====\n`;
          combined += content + '\n\n';
        }
      }

      // 替换 Rollup 生成的 JS bundle
      for (const key of Object.keys(bundle)) {
        if (key.endsWith('.js') && bundle[key].type === 'chunk') {
          bundle[key].code = combined;
          bundle[key].map = null;
        }
      }
    }
  };
}

export default defineConfig({
  root: '.',
  publicDir: false,
  build: {
    outDir: 'public/dist',
    emptyOutDir: true,
    rollupOptions: {
      input: path.resolve(__dirname, 'index.vite.html'),
      output: {
        entryFileNames: 'app.js',
        assetFileNames: '[name][extname]',
      },
    },
    cssCodeSplit: false,
    minify: false,
    sourcemap: false,
  },
  plugins: [concatPlugin()],
});
