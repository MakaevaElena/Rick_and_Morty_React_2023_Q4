/// <reference types="vitest" />
/// <reference types="vite/client" />
import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  // server: {
  //   open: true,
  // },
  // plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/setupTests.ts'],
    coverage: { provider: 'v8' },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});

// import { defineConfig } from 'vitest/config';
// import react from '@vitejs/plugin-react';

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   test: {
//     environment: 'jsdom',
//   },
// });

// https://react.dev/blog/2022/03/08/react-18-upgrade-guide#updates-to-client-rendering-apis
