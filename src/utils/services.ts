import axios, { AxiosResponse } from 'axios';
import { Logger } from '@/utils/logger';
import { Services } from '@/types/axios';
import { config } from '@config';

/**
 * Log Responser
 *
 * @param {*} res
 * @returns
 */
export const logResponser = <T>(res: AxiosResponse<Services.ApiResponse<T>>): void => {
  if (!res) return;
  const { config } = res;
  const loadTime = performance.now();
  const url = config.url?.replace(process.env.NEXT_PUBLIC_API_URL || '', '');

  // * Send Response to logger
  Logger(`${config?.method?.toUpperCase()} ${url}`, {
    responseTime: loadTime,
    status: res.status,
    statusText: res.statusText,
    message: res?.data?.message || ''
  });
};

/**
 * Axios create default config
 */
const service = axios.create({
  baseURL: config.API_URL || 'http://localhost'
});


// Add a response interceptor to handle unauthorized errors
axios.interceptors.response.use(
  (response) => {
    if (config.MODE !== 'production')
      logResponser(response);
    return response;
  },
  (error) => {
    // Handle unauthorized errors
    if (error.response.status === 401) {
      // Clear the cookies
      // Redirect to login page
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

/**
 * Func Get
 *
 * @param {String} url
 * @param {*} params
 */
export const get = (url: string, params?: string) => {
  return service.get(`${url}`, {
    params
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