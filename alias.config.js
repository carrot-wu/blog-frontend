const path = require('path')

module.exports = {
  resolve: {
    alias: {
      SRC: path.resolve(__dirname, "src"),
      ASSET: path.resolve(__dirname, "assets"),
      COMPONENT: path.resolve(__dirname, "src/components"),
      CONST: path.resolve(__dirname, "src/constants"),
      MODEL: path.resolve(__dirname, "src/models"),
      PAGE: path.resolve(__dirname, "src/pages"),
      ROUTE: path.resolve(__dirname, "src/routes"),
      SERVICE: path.resolve(__dirname, "src/services"),
      UTIL: path.resolve(__dirname, "src/utils"),
    }
  }
}
