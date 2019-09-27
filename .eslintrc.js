module.exports = {
  'parser': '@typescript-eslint/parser', //定义ESLint的解析器
  'extends': ['react-app'],//定义文件继承的子规范
  'plugins': ['@typescript-eslint'],//定义了该eslint文件所依赖的插件
  'env': {                          //指定代码的运行环境
    'browser': true
  },
  'rules': {
    //缩进双空格
    '@typescript-eslint/indent': ['error', 2],
    //接口命名允许以I开头
    '@typescript-eslint/interface-name-prefix': 0,
    //允许不添加分号
    'semi': 0,
    // 不检测花括号后是否要换行
    'object-curly-newline': 0,
    'comma-dangle': ['error', 'only-multiline']
  }
};
