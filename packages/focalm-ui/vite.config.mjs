
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths'

// import dts from 'vite-plugin-dts';

import { createHtmlPlugin } from 'vite-plugin-html';
// import {dancingFontUrl} from "./src/_inject";

// https://vitejs.dev/config/
export default defineConfig({
  assetsInclude: ['**/*.woff2'],
  plugins: [
    tsconfigPaths(),
    react({
      jsxRuntime: 'automatic',
      // jsxImportSource: "@emotion/react",
      babel: {
        plugins: [
          // ['@emotion/babel-plugin'],
          ['@babel/plugin-proposal-decorators', { legacy: true }],
          ['@babel/plugin-transform-class-properties', { loose: false }],
        ],
        "env": {
          "development" : {
            "compact": false
          }
        }
      },
    }),
    // dts({
    //   include: ["src/storage.ts"],
    //   outDir: "dtsss"
    // })
    createHtmlPlugin({
      minify: true,
      /**
       * After writing entry here, you will not need to add script tags in `index.html`, the original tags need to be deleted
       * @default src/main.ts
       */
      entry: '/src/_load.tsx',
      /**
       * If you want to store `index.html` in the specified folder, you can modify it, otherwise no configuration is required
       * @default index.html
       */
      template: 'index.html',

      /**
       * Data that needs to be injected into the index.html ejs template
       */
      inject: {
        data: {
          title: 'index',
          // injectScript: `<link rel="preload" as="font" href={dancingFontUrl} type="font/woff2" />`,
          // preloadScript: `<script type="module" src="/src/_preload.ts"></script>`
        },
        tags: [
          {
            injectTo: 'head',
            tag: 'script',
            attrs: {
              type: 'module',
              src: '/src/_preload.ts',
            }
          },
          {
            injectTo: 'body-prepend',
            tag: 'div',
            attrs: {
              id: 'root-app-id',
            },
          },
        ],
      },
    }),
  ],
  cacheDir: '.vite-cache',
  server: {
    watch: {
      additionalPaths: (watcher) => {
        watcher.add('../kit/src/**');
      }
    }
  }
});
