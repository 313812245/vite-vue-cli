import { fileURLToPath, URL } from 'node:url';

import { defineConfig, loadEnv } from 'vite';
import legacy from '@vitejs/plugin-legacy';
import { createVuePlugin } from 'vite-plugin-vue2';
import Components from 'unplugin-vue-components/vite';
import AutoImport from 'unplugin-auto-import/vite';
// import { ElementUiResolver } from 'unplugin-vue-components/resolvers';
import { createHtmlPlugin } from 'vite-plugin-html';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import type { Plugin } from 'vite';

const importPlugin = () => {
  return <Plugin>{
    name: 'importPlugin',
    transform(code, id) {
      // 判断当前处理的是否是 src/main.ts
      const name = fileURLToPath(new URL('./src/main.ts', import.meta.url));
      if (name.replace(/\\/g, '/') === id.replace(/\\/g, '/')) {
        const prepend = `import 'virtual:svg-icons-register';\n`;
        return prepend + code;
      }
      return code;
    },
  };
};

// https://vitejs.dev/config/
const viteConfig = defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const isBuild = command === 'build';
  return {
    base: '/',
    publicDir: 'public',
    assetsDir: 'static',
    envPrefix: ['VITE_', 'VUE_'],
    plugins: [
      createVuePlugin(),
      importPlugin(),
      createSvgIconsPlugin({
        iconDirs: [
          fileURLToPath(new URL('./src/assets/icons', import.meta.url)),
        ],
        symbolId: '[name]',
      }),
      Components({
        // resolvers: [ElementUiResolver()],
        dts: './src/components.d.ts',
      }),
      AutoImport({
        // resolvers: [ElementUiResolver()],
        imports: ['pinia'],
        dirs: ['./src/api', './src/store'],
        dts: './src/auto-import.d.ts',
        eslintrc: {
          enabled: true, // 默认false, true启用。生成一次就可以，避免每次工程启动都生成
          filepath: './.eslintrc-auto-import.json',
          globalsPropValue: true,
        },
      }),
      legacy({
        targets: ['chrome 52', 'ie >= 11'],
        additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
      }),
      createHtmlPlugin({
        inject: {
          data: {
            ...env,
          },
        },
      }),
    ],
    build: {
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: isBuild,
          drop_debugger: isBuild,
        },
      },
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        assets: fileURLToPath(new URL('./src/assets', import.meta.url)),
      },
    },
    server: {
      port: 8066,
      strictPort: true,
      open: true,
      overlay: {
        warning: false,
        error: true,
      },
      proxy: {
        [env.VUE_APP_BASEURL]: {
          target: env.VUE_APP_BASEURL,
          changeOrigin: true,
          secure: false,
          rewrite: (path) =>
            path.replace(new RegExp(`^${env.VUE_APP_BASEURL}`), ''),
        },
        [env.VUE_APP_DOWNLOAD]: {
          target: env.VUE_APP_DOWNLOAD,
          changeOrigin: true,
          secure: false,
          rewrite: (path) =>
            path.replace(new RegExp(`^${env.VUE_APP_DOWNLOAD}`), ''),
        },
      },
    },
  };
});

export default viteConfig;
