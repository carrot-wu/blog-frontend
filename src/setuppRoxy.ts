// @ts-ignore
import proxy from 'http-proxy-middleware'
module.exports = function(app: any) {
  app.use(proxy('/api/', {
    target: 'http://47.96.131.179:8081/',
    secure: false,
    changeOrigin: true
  }))
}
