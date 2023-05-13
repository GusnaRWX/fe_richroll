import axios, { AxiosHeaderValue, AxiosRequestHeaders, AxiosResponse } from 'axios';
import { Logger } from '@/utils/logger';
import { config } from '@config';
import { getStorage } from './storage';

/**
 * Log Responser
 *
 * @param {*} res
 * @returns
 */
export const logResponser = (res: AxiosResponse): void => {
  if (!res) return;
  const { config: requestConfig, data, } = res;
  const loadTime = performance.now();
  const url = requestConfig.url?.replace(config.API_URL || '', '');

  // Send Response to logger
  Logger(`${requestConfig.method?.toUpperCase()} ${url}`, {
    responseTime: loadTime,
    message: data?.message || ''
  });
};

/**
 * Axios create default config
 */
const service = axios.create({
  baseURL: config.API_URL || 'http://localhost',
  headers: {
    Authorization: {
      toString() {
        return `Bearer ${getStorage('accessToken')}`;
      }
    } as AxiosHeaderValue
  }
});


// Add a response interceptor to handle unauthorized errors
service.interceptors.response.use(
  (response) => {
    if (config.MODE !== 'production')
      logResponser(response);
    return response;
  },
  (error) => {
    if (config.MODE !== 'production') logResponser(error);
    return Promise.reject(error);
  }
);

/**
 * Func Get
 *
 * @param {String} url
 * @param {*} params
 */
export const get = (url: string, params?: string, headers?: AxiosRequestHeaders) => {
  return service.get(`${url}`, {
    params,
    headers
  });
};

/**
 * Func Post / Put
 *
 * @param {String} url
 * @param {*} body
 */
export const post = <T>(url: string, body: T) => {
  return service.post(`${url}`, body);
};

export const put = <T>(url: string, body: T) => {
  return service.put(`${url}`, body);
};

/**
 * Func Delete
 *
 * @param {String} url
 * @param {*} params
 */
export const del = (url: string, params: string) => {
  return service.delete(`${url}`, {
    params
  });
};

/**
 *
 * Custom Function getBlob response
 *
 * @param {String} url
 * @param {*} params
 */
export const getBlob = (url: string, params: string) => {
  return service.get(`${url}`, {
    params,
    responseType: 'blob'
  });
};