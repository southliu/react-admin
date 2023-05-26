import { useEffect } from 'react';
import { TITLE_SUFFIX } from '@/utils/config';
import { useActivate } from 'react-activation';

/**
 * 标题
 */
export function useTitle(title: string) {
  const value = TITLE_SUFFIX + title ? `${title} - ${TITLE_SUFFIX}` : '';

  useEffect(() => {
    document.title = value;
  }, [value]);

  useActivate(() => {
    document.title = value;
  });
}
