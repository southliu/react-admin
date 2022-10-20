import { useEffect } from 'react'
import { TITLE_SUFFIX } from '@/utils/config'

/**
 * 标题
 */
export function useTitle(title: string) {
  useEffect(() => {
    const velue = title + title ? `${TITLE_SUFFIX} - ${title}` : ''
    document.title = velue
  }, [title])
}
