const proxy = require('http-proxy-middleware')
module.exports = function(app) {
  app.use(proxy('/api', {
    target: 'http://47.96.131.179',
    secure: false,
    changeOrigin: true
  }))
}
