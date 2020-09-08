const { override, addWebpackAlias } = require('customize-cra');
const path = require('path');
const baseSrcPath = path.resolve(__dirname, './src');

module.exports = {
  webpack: override(
    addWebpackAlias({
      '@': baseSrcPath,
      '@components': path.resolve(baseSrcPath, './components'),
      '@/assets': path.resolve(baseSrcPath, './assets'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@hooks': path.resolve(baseSrcPath, './hooks'),
      '@routers': path.resolve(baseSrcPath, './routers'),
      '@store': path.resolve(baseSrcPath, './store'),
      '@type': path.resolve(baseSrcPath, './types'),
      '@views': path.resolve(baseSrcPath, './views'),
      '@services': path.resolve(baseSrcPath, './services'),
      '@iconfont': path.resolve(baseSrcPath, './iconfont'),
      '@reducers': path.resolve(baseSrcPath, './reducers')
    })
  )
};
