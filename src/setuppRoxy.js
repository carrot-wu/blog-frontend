const proxy = require('http-proxy-middleware');
const isLocal = process.env.APIENV === 'local';
module.exports = function (app) {
  app.use(
    proxy('/api/', {
      target: isLocal ? 'http://localhost:4000' : 'https://api.carrotwu.com',
      secure: false,
      changeOrigin: true,
      pathRewrite: { '/api': '' }
    })
  );
};
