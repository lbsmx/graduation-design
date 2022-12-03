// index.ts
import RequestInstance from './request';

const requestInstance = new RequestInstance({
  baseURL: 'xxx',
  timeout: 3000,
  interceptorHooks: {
    requestInterceptor: (config) => {
      return config;
    },
    requestInterceptorCatch: (err) => {
      return err;
    },
    responseInterceptor: (res) => {
      return res.data;
    },
    responseInterceptorCatch: (err) => {
      return err;
    },
  },
});

export { requestInstance };
