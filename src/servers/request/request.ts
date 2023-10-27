import axios from 'axios';
import type {
  AxiosResponse,
  AxiosInstance,
  InternalAxiosRequestConfig,
  AxiosRequestConfig
} from 'axios';
import type {
  RequestInterceptors,
  CreateRequestConfig,
  ServerResult
} from './types';

class AxiosRequest {
  // axios 实例
  instance: AxiosInstance;
  // 拦截器对象
  interceptorsObj?: RequestInterceptors<AxiosResponse>;
  // 存放取消请求控制器Map
  abortControllerMap: Map<string, AbortController>;

  constructor(config: CreateRequestConfig) {
    this.instance = axios.create(config);
    // 初始化存放取消请求控制器Map
    this.abortControllerMap = new Map();
    this.interceptorsObj = config.interceptors;
    // 拦截器执行顺序 接口请求 -> 实例请求 -> 全局请求 -> 实例响应 -> 全局响应 -> 接口响应
    this.instance.interceptors.request.use(
      (res: InternalAxiosRequestConfig) => {
        const controller = new AbortController();
        let url = res.method || '';
        res.signal = controller.signal;

        if (res.url) url += `^${res.url}`;

        // 如果存在参数
        if (res.params) {
          for (const key in res.params) {
            url += `&${key}=${res.params[key]}`;
          }
        }

        // 如果存在post数据
        if (res.data && res.data?.[0] === '{' && res.data?.[res.data?.length - 1] === '}') {
          const obj = JSON.parse(res.data);
          for (const key in obj) {
            url += `#${key}=${obj[key]}`;
          }
        } 

        // 如果存在则删除该请求
        if (this.abortControllerMap.get(url)) {
          console.warn('取消重复请求：', url);
          this.cancelRequest(url);
        } else {
          this.abortControllerMap.set(url, controller);
        }
        
        return res;
      },
      (err: object) => err,
    );

    // 使用实例拦截器
    this.instance.interceptors.request.use(
      this.interceptorsObj?.requestInterceptors,
      this.interceptorsObj?.requestInterceptorsCatch,
    );
    this.instance.interceptors.response.use(
      this.interceptorsObj?.responseInterceptors,
      this.interceptorsObj?.responseInterceptorsCatch,
    );
    // 全局响应拦截器保证最后执行
    this.instance.interceptors.response.use(
      // 因为我们接口的数据都在res.data下，所以我们直接返回res.data
      (res: AxiosResponse) => {
        const url = res.config.url || '';
        this.abortControllerMap.delete(url);
        return res.data;
      },
      (err: object) => err,
    );
  }
  /**
   * 取消全部请求
   */
  cancelAllRequest() {
    for (const [, controller] of this.abortControllerMap) {
      controller.abort();
    }
    this.abortControllerMap.clear();
  }
  /**
   * 取消指定的请求
   * @param url - 待取消的请求URL
   */
  cancelRequest(url: string | string[]) {
    const urlList = Array.isArray(url) ? url : [url];
    for (const _url of urlList) {
      this.abortControllerMap.get(_url)?.abort();
      this.abortControllerMap.delete(_url);
    }
  }
  /**
   * get请求  
   * @param url - 链接
   * @param options - 参数
   */
  get<T = object>(url: string, options = {}) {
    return this.instance.get(url, options) as Promise<ServerResult<T>>;
  }
  /**
   * post请求
   * @param url - 链接
   * @param options - 参数
   */
  post<T = object>(url: string, options = {}, config?: AxiosRequestConfig<object>) {
    return this.instance.post(url, options, config) as Promise<ServerResult<T>>;
  }
  /**
   * put请求
   * @param url - 链接
   * @param options - 参数
   */
  put<T = object>(url: string, options = {}, config?: AxiosRequestConfig<object>) {
    return this.instance.put(url, options, config) as Promise<ServerResult<T>>;
  }
  /**
   * delete请求
   * @param url - 链接
   * @param options - 参数
   */
  delete<T = object>(url: string, options = {}) {
    return this.instance.delete(url, options) as Promise<ServerResult<T>>;
  }
}

export default AxiosRequest;