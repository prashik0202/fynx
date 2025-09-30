import { StatusCode } from '@/constants/statusCode';
import axios, { type AxiosResponse } from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL,
  withCredentials: true,
  timeout: 10000,
});

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error) => {
    const originalRequest = error.config;

    if ((error.response?.status === StatusCode.UNAUTHORIZED ) && !originalRequest._retry) {
      originalRequest._retry = true;

      try {        
        // refresh the access token
        await axiosInstance.get('/auth/refresh-token');
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Refresh failed, handle logout redirect to Login page again
        window.location.href = '/auth/sign-in';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);


const getApi = async <T>(url: string): Promise<AxiosResponse<T>> => {
  const response = await axiosInstance.get<T>(url);
  return response;
};

const postApi = async <T, D = unknown>(url: string, data?: D): Promise<AxiosResponse<T>> => {
  const response = await axiosInstance.post<T>(url, data);
  return response;
};

const putApi = async <T, D = unknown>(url: string, data: D): Promise<AxiosResponse<T>> => {
  const response = await axiosInstance.put<T>(url, data);
  return response;
};

const delApi = async <T>(url: string): Promise<AxiosResponse<T>> => {
  const response = await axiosInstance.delete<T>(url);
  return response;
};

export const apiService = {
  get: getApi,
  post: postApi,
  put: putApi,
  delete: delApi,
};

export default axiosInstance;