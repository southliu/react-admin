import { useEffect } from 'react'
import { TITLE_SUFFIX } from '@/utils/config'
import { useActivate } from 'react-activation'

/**
 * 标题
 */
export function useTitle(title: string) {
  const value = TITLE_SUFFIX + title ? `${TITLE_SUFFIX} - ${title}` : ''

  useEffect(() => {
    document.title = value
  }, [title])
  
  // keepalive状态更新标题
  useActivate(() => {
    document.title = value
  })
}
