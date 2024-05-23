import axios, { AxiosRequestConfig } from 'axios';
import { startCheckingTokenExpiration } from './tokenUtils';

export const httpClient = async (contentType: string = "application/json") => {
  const headers = {
    'Accept': 'aplication/json',
    'Content-Type': contentType,
    'Access-Control-Allow-Origin': '*',
  };
  const config: AxiosRequestConfig = {
    headers: headers,
    baseURL: `Your base url to call api`, //example: 'https://api.example.com/api/v1
  };

  const instance = axios.create(config);

  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('access_token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }

      return config;
    },

    (error) => {
      console.error(error)
      return Promise.reject(error);
    }
  );

  instance.interceptors.response.use(
    async (response) => {
      return await response;
    },

    async (error) => {
      if (error.response && error.response.status === 403) {
        //do something
      } else {
        //do something
        //you can throw (error)
      }
    }
  );



  return instance;
};

startCheckingTokenExpiration();