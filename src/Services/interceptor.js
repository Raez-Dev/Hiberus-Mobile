import axios from "axios";
export const instance = axios.create();

instance.interceptors.request.use(function(config) {
    // Do something before request is sent
    return config;
}, function(error) {
    // Do something with request error
    return Promise.reject(error);
});

instance.interceptors.response.use(function(response) {
    return { statusCode: response.status, ...response.data };
}, function(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error.response.data);

});