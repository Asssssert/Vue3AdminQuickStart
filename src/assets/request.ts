import axios from "axios";
import type { AxiosResponse, AxiosError } from "axios";
import notice from "./notice";


// 创建 Axios 实例
const request = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 5000,
});

// 定义通用响应类型
interface Response<T = any> {
  code: number;
  msg: string;
  data: T;
}

// 请求拦截器
request.interceptors.request.use(
  (config) => {
    // 在这里可以添加请求前的处理，如携带token等
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.status === 200) {
      return response.data
    }
    return Promise.reject() // 如果响应状态不是200，则返回一个拒绝的Promise
  },
  (error: AxiosError) => {
    notice('error', '错误',"服务器错误")
    return Promise.reject(error)
  }
);

export default request;
