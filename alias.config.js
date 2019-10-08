const path = require('path')

module.exports = {
  resolve: {
    alias: {
      '@': path.resolve(__dirname, "src"),
      'ASSET': path.resolve(__dirname, "assets"),
      'COMPONENT': path.resolve(__dirname, "src/components"),
      'CONST': path.resolve(__dirname, "src/constants"),
      'ROUTE': path.resolve(__dirname, "src/routes"),
      'SERVICE': path.resolve(__dirname, "src/services"),
      'UTIL': path.resolve(__dirname, "src/utils"),
      'VIEW': path.resolve(__dirname, "src/view"),
    }
  }
}
