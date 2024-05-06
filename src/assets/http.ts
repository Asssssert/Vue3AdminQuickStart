import axios from "axios";
import type { AxiosResponse, AxiosError } from "axios";

const http = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 5000,
});

// 定义通用响应类型
interface Response<T = any> {
  code: number;
  msg: string;
  data: T;
}

//请求拦截器
http.interceptors.request.use(
  (config)=>{
    //可以添加token之类的
    return config
  }
  ,(error)=>{
    return Promise.reject(error)
  }
)

//响应拦截器
http.interceptors.response.use(
  (response)=>{
    if(response.status === 200){
      return response.data
    }
    return response
  }
  ,(error)=>{
    return Promise.reject(error)
  }
)

const methods = {
    get<T>(url: string, params?: object): Promise<Response<T>> {
      return http.get(url, { params });
    },
    post<T>(url: string, data?: object): Promise<Response<T>> {
      return http.post(url, data);
    },
    put<T>(url: string, data?: object): Promise<Response<T>> {
      return http.put(url, data);
      },
    delete<T>(url: string, params?: object): Promise<Response<T>> {
      return http.delete(url, { params });
    },
    patch<T>(url: string, data?: object): Promise<Response<T>> {
      return http.patch(url, data);
    },

}

export default methods