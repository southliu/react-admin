import { useState, useEffect } from 'react';

type CopyHandler = (text: string) => Promise<boolean>;

export function useClipboard(): [boolean, string, CopyHandler] {
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isCopied) {
      timer = setTimeout(() => setIsCopied(false), 1000);
    }
    return () => clearTimeout(timer);
  }, [isCopied]);

  const copyText: CopyHandler = async (text) => {
    try {
      // 现代Clipboard API
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        setIsCopied(true);
        return true;
      }

      // 兼容旧浏览器的execCommand方法
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed'; // 避免滚动
      document.body.appendChild(textArea);
      textArea.select();

      const success = document.execCommand('copy');
      document.body.removeChild(textArea);

      if (success) {
        setIsCopied(true);
        return true;
      }

      throw new Error('复制失败，请手动复制');
    } catch (err) {
      const message = err instanceof Error ? err.message : '复制操作被拒绝';
      setError(message);
      setIsCopied(false);
      return false;
    }
  };

  return [isCopied, error, copyText];
}
