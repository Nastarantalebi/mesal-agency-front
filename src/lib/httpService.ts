import type { AxiosRequestConfig } from "axios";
import axios from "./axios";
import type { config } from "zod";

// type Config = {
//   params?: Record<string, unknown>;
//   headers?: Record<string, unknown>;
//   timeout?: number;
// };

export const Request = {
  get: (url: string, params?: Record<string, unknown>) => {
    return params ? axios.get(url, { params }) : axios.get(url);
  },

  post: (url: string, body = {}, config: AxiosRequestConfig<object> = {}) =>
    axios.post(url, body, config),

  put: (url: string, body = {}, config: AxiosRequestConfig<object> = {}) =>
    axios.put(url, body, config),

  delete: (url: string, params = {}) => axios.delete(url, { params }),

  patch: (url: string, body={}, config:AxiosRequestConfig<object> = {} ) => 
    axios.patch(url, body, config)
};
