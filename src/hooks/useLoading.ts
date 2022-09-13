import { useState } from "react"

/**
 * loading加载
 * @param initValue - 初始化状态
 */
export function useLoading(initValue = false) {
  const [isLoading, setLoading] = useState(Boolean(initValue))

  const startLoading = () => {
    setLoading(true)
  }

  const endLoading = () => {
    setLoading(false)
  }

  const toggleLoading = () => {
    setLoading(!isLoading)
  }

  return {
    isLoading,
    startLoading,
    endLoading,
    toggleLoading
  }
}
