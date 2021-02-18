module.exports = {
  outputDir: 'public',
  pages: {
    index: {
      entry: "src/main.js",
      template: "src/template/index.html"
    }
  },
  css: {
    requireModuleExtension: false,
    loaderOptions: {
      css: {
        modules: {
          localIdentName: "[hash:base64:5]"
        },
        localsConvention: "camelCase"
      }
    }
  }
};
