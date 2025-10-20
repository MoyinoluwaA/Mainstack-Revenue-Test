import axios, { type AxiosRequestConfig } from 'axios';
import { notifications } from '@mantine/notifications';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error?.response?.data?.message || error.message || 'An error occurred';
    notifications.show({
      title: 'API Error',
      message,
      color: 'red',
      position: 'top-right',
      withCloseButton: true,
    });
    return Promise.reject(error);
  }
);

export default class Client {
  static async get<T>(url: string, options?: AxiosRequestConfig<unknown>) {
    const response = await instance.get<T>(url, options);
    return response.data;
  }
  static async post<T>(url: string, data?: unknown, options?: AxiosRequestConfig<unknown>) {
    const response = await instance.post<T>(url, data, options);
    return response.data;
  }
  static async put<T>(url: string, data?: unknown) {
    const response = await instance.put<T>(url, data);
    return response.data;
  }
  static async patch<T>(url: string, data?: unknown, options?: AxiosRequestConfig<unknown>) {
    const response = await instance.patch<T>(url, data, options);
    return response.data;
  }
  static async delete<T>(url: string, options?: AxiosRequestConfig<unknown>) {
    const response = await instance.delete<T>(url, options);
    return response.data;
  }
}
