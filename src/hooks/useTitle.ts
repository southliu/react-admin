import { useEffect } from 'react'
import { TITLE_SUFFIX } from '@/utils/config'

/**
 * 标题
 */
export function useTitle(title: string) {
  const value = TITLE_SUFFIX + title ? `${TITLE_SUFFIX} - ${title}` : ''

  useEffect(() => {
    document.title = value
  }, [value])
}
