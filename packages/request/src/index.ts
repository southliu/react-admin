import { message } from '@south/message';
import { getLocalInfo, removeLocalInfo } from '@south/utils';
import axios from 'axios';
import AxiosRequest from './request';

/**
 * 创建请求
 * @param url - 链接地址
 */
function creteRequest(url: string, token: string) {
  return new AxiosRequest({
    baseURL: url,
    timeout: 180 * 1000,
    interceptors: {
      // 接口请求拦截
      requestInterceptors(res) {
        const tokenLocal = getLocalInfo(token) || '';
        if (res?.headers && tokenLocal) {
          res.headers.Authorization = `Bearer ${tokenLocal}`;
        }
        return res;
      },
      // 请求拦截超时
      requestInterceptorsCatch(err) {
        message.error('请求超时！');
        return err;
      },
      // 接口响应拦截
      responseInterceptors(res) {
        const { data } = res;
        // 权限不足
        if (data?.code === 401) {
          message.error('权限不足，请重新登录！');
          removeLocalInfo(token);
          setTimeout(() => {
            window.location.href = "/";
          }, 1000);
          handleError(data?.message);
          return res;
        }

        // 错误处理
        if (data?.code !== 200) {
          handleError(data?.message);
          return res;
        }

        return res;
      },
      responseInterceptorsCatch(err) {
        // 取消重复请求则不报错
        if(axios.isCancel(err)) {
          err.data = err.data || {};
          return err;
        }

        handleError('服务器错误！');
        return err;
      }
    }
  });
}

/**
 * 异常处理
 * @param error - 错误信息
 * @param content - 自定义内容
 */
const handleError = (error: string, content?: string) => {
  console.error('错误信息:', error);
  message.error({
    content: content || error || '服务器错误',
    key: 'error'
  });
};

export { creteRequest };
export type * from './types';
