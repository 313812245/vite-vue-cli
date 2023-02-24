// build配置 https://cli.vuejs.org/config/#configuration-reference
const path = require('path');
// const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
function resolve(dir) {
  return path.join(__dirname, dir);
}
const idDev = process.env.VUE_IS_DEVELOPMENT;
const Timestamp = new Date().getTime();
const webpack = require('webpack');

module.exports = {
  publicPath: '/',
  runtimeCompiler: true,
  // 线上构建的时候，禁用sourcemap
  productionSourceMap: idDev ? true : false,
  assetsDir: 'static',
  pages: {
    index: {
      entry: 'src/main.ts',
      template: 'public/webpack_index.html',
      filename: 'index.html',
    },
  },

  // https://github.com/mozilla-neutrino/webpack-chain
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'));
    config.module.rule('svg').exclude.add(resolve('src/assets/icons')).end();
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: '[name]',
      })
      .end();
  },
  configureWebpack: (config) => {
    const limitNum = new webpack.optimize.LimitChunkCountPlugin({
      maxChunks: 30, // 控制打包生成js的个数
    });
    const minChunk = new webpack.optimize.MinChunkSizePlugin({
      minChunkSize: 1000,
    });
    config.plugins = [...config.plugins, limitNum, minChunk];
    config.output.filename = './js/[name].[hash]' + Timestamp + '.js';
    config.output.chunkFilename = './js/[name].[hash]' + Timestamp + '.js';
    config.devtool = idDev ? 'eval-source-map' : false;
    // config.plugins.push(new HardSourceWebpackPlugin())
  },
  css: {
    loaderOptions: {
      sass: {
        additionalData: '@import "@/styles/index.scss";',
      },
    },
  },
  // 跨域配置
  devServer: {
    // host: 'localhost',
    port: '8066',
    hot: true,
    open: true,
    overlay: {
      warning: false,
      error: true,
    },
    proxy: {
      [process.env.VUE_APP_BASEURL]: {
        target: process.env.VUE_APP_BASEURL,
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASEURL]: '',
        },
      },
      [process.env.VUE_APP_DOWNLOAD]: {
        target: process.env.VUE_APP_DOWNLOAD,
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          ['^' + process.env.VUE_APP_DOWNLOAD]: '',
        },
      },
    },
  },
};
