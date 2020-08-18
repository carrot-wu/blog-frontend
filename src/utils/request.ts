import Request from './http';

const request = new Request({
  defaults: {
    baseURL: '/api',
  },
});
export default request;
