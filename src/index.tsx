import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import './iconfont/iconfont.css';
import 'github-markdown-css';
import '@utils/prism';
import App from './App';
import * as serviceWorker from './serviceWorker';
import RuqiIo from '@utils/webio';
new RuqiIo({
  projectId: '123',
  reportApi: 'http://localhost:3000/api',
  isHandleBackgroundImageError: true
});
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
