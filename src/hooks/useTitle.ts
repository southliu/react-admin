import type { TFunction } from "i18next";
import { useEffect } from 'react';
import { TITLE_SUFFIX } from '@/utils/config';
import { useActivate } from 'react-activation';

/**
 * 标题
 */
export function useTitle(t: TFunction, title: string) {
  const value = TITLE_SUFFIX(t) + title ? `${title} - ${TITLE_SUFFIX(t)}` : '';

  useEffect(() => {
    document.title = value;
  }, [value]);

  useActivate(() => {
    document.title = value;
  });
}
