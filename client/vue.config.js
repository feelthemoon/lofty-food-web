module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  runtimeCompiler: true,
  css: {
    loaderOptions: {
      sass: {
        implementation: require('sass'),
      },
    },
  }
}
