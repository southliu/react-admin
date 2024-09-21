import { creteRequest } from '@south/request';
import { TOKEN } from '@/utils/config';

// 生成环境所用的接口
const prefixUrl = import.meta.env.VITE_BASE_URL as string;
const baseURL = process.env.NODE_ENV !== 'development' ? prefixUrl : '/api';

// 请求配置
export const request = creteRequest(baseURL, TOKEN);

// TODO：创建多个请求
// export const newRequest = creteRequest('/test', TOKEN);

/**
 * 取消请求
 * @param url - 链接
 */
export const cancelRequest = (url: string | string[]) => {
  return request.cancelRequest(url);
};

/** 取消全部请求 */
export const cancelAllRequest = () => {
  return request.cancelAllRequest();
};
