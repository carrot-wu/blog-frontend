const path = require('path')

module.exports = {
  resolve: {
    alias: {
      'assets': path.resolve(__dirname, "src/assets"),
      'components': path.resolve(__dirname, "src/components"),
      'routers': path.resolve(__dirname, "src/routers"),
      'views': path.resolve(__dirname, "src/views"),
    }
  }
}
