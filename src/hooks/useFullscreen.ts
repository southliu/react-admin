import { useEffect, useState } from "react"

const key = 'fullscreen'

export function useFullscreen() {
  const [isFullscreen, setFullscreen] = useState(false)

  const local = localStorage.getItem(key)
  const isLocalFullscreen = local ? JSON.parse(local) : false

  useEffect(() => {
    setFullscreen(isLocalFullscreen)
  }, [isLocalFullscreen])

  /** 切换全屏 */
  const toggleFullscreen = () => {
    // 全屏
    if(!isFullscreen && document.documentElement?.requestFullscreen) {
      document.documentElement.requestFullscreen()
      localStorage.setItem(key, 'true')
      setFullscreen(true)
      return true
    }
    // 退出全屏
    if (isFullscreen && document?.exitFullscreen) {
      document.exitFullscreen()
      localStorage.setItem(key, 'false')
      setFullscreen(false)
      return true
    }
  }

  return [isFullscreen, toggleFullscreen] as const
}
