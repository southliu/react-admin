import axios from 'axios'
// import { router } from '@/router'
import { message } from 'antd'
import { useToken } from '@/hooks/useToken'

// 生成环境所用的接口
const prefixUrl = (import.meta.env.VITE_BASE_URL as string)

// 请求列表(防重复提交)
const requestList: string[] = []
const CancelToken = axios.CancelToken
const source = CancelToken.source()

// 请求配置
const request = axios.create({
  baseURL: process.env.NODE_ENV !== 'development' ? prefixUrl : '/api',
  timeout: 180 * 1000
})

/**
 * 异常处理
 * @param error - 错误信息
 * @param content - 自定义内容
 */
const handleError = (error: string, content?: string) => {
  console.error('错误信息:', error)
  message.error({
    content: content || error || '服务器错误',
    key: 'error'
  })
}

/** 权限不足 */
const handleNotPermission = () => {
  useToken().removeToken()
  // router.push('/login')
}

// 请求拦截
request.interceptors.request.use(
  (config) => {
    const token = useToken().getToken() || ''
    if (config?.headers && token) {
      config.headers.Authorization = `Bearer ${token}`
    }

    // 防止重复提交（如果本次是重复操作，则取消，否则将该操作标记到requestList中）
    const requestFlag = JSON.stringify(config.url) + JSON.stringify(config.data) + '&' + config.method
    if (requestList.includes(requestFlag)) { // 请求标记已经存在，则取消本次请求，否则在请求列表中加入请求标记
      source.cancel()//取消本次请求
    } else {
      requestList.push(requestFlag)
    }
    
    return config
  },
  (error) => {
    handleError(error, '服务器错误')
    return Promise.reject(error)
  }
)

// 响应拦截
request.interceptors.response.use(
  (response) => {
    const res = response.data
    // 请求返回后，将请求标记从requestList中移除
    const requestFlag = JSON.stringify(response.config.url) + JSON.stringify(response.config.data) + '&' + response.config.method
    const index = requestList.findIndex(item => item === requestFlag)
    requestList.splice(index, 1)

    // 后端框架错误提醒
    if (res?.code === 0) {
      handleError(res?.message, '权限不足，请重新登录')
      handleNotPermission()
      return Promise.reject(response)
    }

    // 权限不足
    if (res?.code === 601) {
      handleError(res?.message)
      handleNotPermission()
      return Promise.reject(response)
    }

    // 错误处理
    if (res?.code !== 200) {
      handleError(res?.message)
      return Promise.reject(response)
    }

    return Promise.resolve(response)
  },
  (error) => {
    //置空请求列表
    requestList.length = 0
    handleError(error, '服务器错误')
    return Promise.reject(error)
  }
)

export { request }
