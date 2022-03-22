//  Dependencies
import axios from "axios";
import { useContext } from 'react';

//  Context
import { LSContext } from '../Context/LSContext';

export const useInterceptor = () => {

    const { deleteLS } = useContext(LSContext);
    const interceptor = axios.create();

    interceptor.interceptors.request.use(function(config) {
        // Do something before request is sent
        return config;
    }, function(error) {
        // Do something with request error
        return Promise.reject(error);
    });

    interceptor.interceptors.response.use(function(response) {
        return { statusCode: response.status, ...response.data };
    }, function(error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error

        if (error.response.data.statusCode === 401) {
            deleteLS();
            return Promise.reject(error.response.data);
        } else {
            return Promise.reject(error.response.data);
        }

    });

    return { interceptor }
}