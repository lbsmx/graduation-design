// index.ts
import RequestInstance from '@/api/request';

const requestInstance = new RequestInstance({
    baseURL: 'http://localhost:8000/',
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
