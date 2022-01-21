const path = require('path');
module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  runtimeCompiler: true,
  filenameHashing: true,
  productionSourceMap: false,
  css: {
    extract: true,
    loaderOptions: {
      sass: {
        implementation: require('sass'),
      },
    },
  },
  pages: {
    app: {
      entry: 'src/main.js',
      template: '/index.html',
      filename: './index.html',
      chunks: ["chunk-vendor", "chunk-common", "chunk-app-vendors", "app"]
    },
  },
  configureWebpack(config) {
    const IS_VENDOR = /[\\/]node_modules[\\/]/;
    config.optimization.splitChunks = {
      cacheGroups: {
        app: {
          name: `chunk-app-vendors`,
          priority: -11,
          chunks: (chunk) => chunk.name === 'app',
          test: IS_VENDOR,
          enforce: true,
        },
        common: {
          name: 'chunk-common',
          priority: -20,
          chunks: 'initial',
          minChunks: 2,
          reuseExistingChunk: true,
          enforce: true,
        },
      },
    };
    return {
      output: {
        hotUpdateChunkFilename: 'hot/hot-update.js',
        hotUpdateMainFilename: 'hot/hot-update.json',
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src/'),
        },
        extensions: ['.js', '.vue'],
      },
    };
  },
  chainWebpack: config => {
    config.plugins.delete('prefetch-app');
    config.plugin("preload-app").tap((options) => {
      return options;
    });
  }
}
