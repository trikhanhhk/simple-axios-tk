import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

export const instance = async (
    baseConfig: {
        contentType?: string,
        baseUrl?: string,
        accessToken?: string | null | undefined,
        beforeExpired?: number,
        apiRefreshToke?: string | null | undefined
    },
 error: (error: AxiosError | null) => void;
): Promise<AxiosInstance> => {

    const headers = {
        'Accept': 'application/json',
        'Content-Type': baseConfig.contentType ? baseConfig.contentType : "application/json",
        'Access-Control-Allow-Origin': '*',
    };
    const config: AxiosRequestConfig = {
        headers: headers,
        baseURL: baseConfig.baseUrl ? baseConfig.baseUrl : '',
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
      console.error("Error from api:", error)
      const originalConfig = error.config;
      if (error.response && error.response.status === 403) {
        window.location.href = '/forbidden';
        return false;
      } else {
        if (error && error.response) {
          console.error(error);
        }
        return false;
      }
    }
  );

    return instance;
};