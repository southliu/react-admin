import { TOKEN } from '@/utils/config'
import { setLocalInfo, getLocalInfo, removeLocalInfo } from '@/utils/local'

/**
 * token存取方法
 */
 export function useToken() {
  /** 获取token */
  const getToken = () => {
    return getLocalInfo(TOKEN)
  }

  /**
   * 设置token
   * @param value token值
   */
  const setToken = (value: string) => {
    setLocalInfo(TOKEN, value)
  }

  /** 删除token */
   const removeToken = () => {
    removeLocalInfo(TOKEN)
  }

  return {
    getToken,
    setToken,
    removeToken
  }
}
