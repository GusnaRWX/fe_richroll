import axios, { AxiosHeaderValue, AxiosRequestHeaders, AxiosResponse } from 'axios';
import { Logger } from '@/utils/logger';
import { config } from '@config';
import { getStorage, setStorages } from './storage';
import { getTimezone } from './helper';

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

// Function to refresh the access token
async function refreshAccessToken() {
  try {
    // Make an API request to refresh the access token using the refresh token
    const response = await service.post('/authentication/refresh', {
      refreshToken: getStorage('refreshToken'),
    });
    // console.log(response, 'response');
    // Update the access token in the storage
    // setStorages([{ name: 'accessTokenasd', value: response.data.accessToken }]);

    // Update the Authorization header for all subsequent requests
    service.defaults.headers.Authorization = `Bearer ${response.data.accessToken}`;

    // Return the new access token
    return response.data;
  } catch (error) {
    // Handle any error that occurred during the token refresh
    console.error('Error refreshing access token:', error);
    throw error;
  }
}

// Add a request interceptor to handle X-Timezone
service.interceptors.request.use(
  (config) => {
    config.headers['X-Timezone'] = getTimezone();
    return config;
  },
  async (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle unauthorized errors
service.interceptors.response.use(
  (response) => {
    if (config.MODE !== 'production')
      logResponser(response);
    return response;
  },
  async (error) => {
    if (config.MODE !== 'production') logResponser(error);
    console.log(error, 'error');
    // Check if the error status is 401
    if (error.response && error.response.status === 401 && error.response.data.message !== 'incorrect email or password') {
      try {
        const accessToken = await refreshAccessToken();
        // Retry the failed request with the new access token
        error.config.headers.Authorization = `Bearer ${accessToken?.data?.accessToken}`;
        setStorages([
          { name: 'accessToken', value: accessToken.data.accessToken },
          { name: 'refreshToken', value: accessToken.data.refreshToken }
        ]);
        return axios(error.config);

      } catch (refreshError) {
        // Handle any error that occurred during the token refresh
        console.error('Error refreshing access token:', refreshError);
        return Promise.reject(refreshError);
      }
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
export const get = (url: string, params?: string, headers?: AxiosRequestHeaders) => {
  return service.get(`${url}`, {
    params,
    headers
  });
};

/**
 * Func Post / Put / patch
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

export const patch = <T>(url: string, body: T) => {
  return service.patch(`${url}`, body);
};

/**
 * Func Delete
 *
 * @param {String} url
 * @param {*} params
 */
export const del = (url: string, params?: string) => {
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