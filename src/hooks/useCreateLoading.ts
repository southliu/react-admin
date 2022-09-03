import { useState } from "react"

/**
 * loading加载
 * @param initValue - 初始化状态
 */
export function useCreateLoading(initValue = false) {
  const [createLoading, setCreateLoading] = useState(Boolean(initValue))

  const startCreateLoading = () => {
    setCreateLoading(true)
  }

  const endCreateLoading = () => {
    setCreateLoading(false)
  }

  const toggleCreateLoading = () => {
    setCreateLoading(!createLoading)
  }

  return {
    createLoading,
    startCreateLoading,
    endCreateLoading,
    toggleCreateLoading
  }
}
