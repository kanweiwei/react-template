import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import getCode from "@/utils/getCode";

import { NoteRes, ApiRes } from "@/services/dto";
import Cookie from "js-cookie";

const baseOptions = {
  baseURL:
    process.env.PROXY === "true" || process.env.MOCK === "true"
      ? ""
      : "http://116.62.165.39",
  timeout: 30000,
};

const authInstance = axios.create(baseOptions);

authInstance.interceptors.request.use(
  (config) => {
    let token = Cookie.get("token");
    config.headers["Authorization"] = `{token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

authInstance.interceptors.response.use(
  (value: AxiosResponse<ApiRes<any>>) => {
    if (value.data.code !== 200) {
      throw new Error(value.data.msg);
    }
    return value;
  },
  (err: any) => {
    return Promise.reject(err);
  }
);

export const authGet = (url: string, config?: AxiosRequestConfig) => {
  return authInstance.get(url, config);
};

export const authPost = (
  url: string,
  data?: any,
  config?: AxiosRequestConfig
) => {
  return authInstance.post(url, data, config);
};

export const authDelte = (url: string, config?: AxiosRequestConfig) => {
  return authInstance.delete(url, config);
};

export const authPut = (
  url: string,
  data?: any,
  config?: AxiosRequestConfig
) => {
  return authInstance.put(url, data, config);
};

const instance = axios.create(baseOptions);

instance.interceptors.response.use(
  (value: AxiosResponse<ApiRes<any>>) => {
    if (value.data.code !== 200) {
      throw new Error(value.data.msg);
    }
    return value;
  },
  (err: any) => {
    return Promise.reject(err);
  }
);

export const httpPost = (
  url: string,
  data?: any,
  config?: AxiosRequestConfig
) => {
  return instance.post(url, data, config);
};

export const httpGet = (url: string, config?: AxiosRequestConfig) => {
  return instance.get(url, config);
};
