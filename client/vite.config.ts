import { defineConfig } from 'vite';

export default defineConfig({
  resolve: {
    alias: {
      path: 'path-browserify',
      url: 'url',
      fs: 'browserify-fs',
    },
  },
  define: {
    'process.env': {}, // Để xử lý lỗi "process is not defined"
  },
});
