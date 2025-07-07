import { useState, useEffect, useRef } from 'react';
import { amountFormatter } from '@/utils/helper';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  prefix?: string;
  start: number;
  end: number;
}

function Count(props: Props) {
  const { prefix, start, end } = props;
  const [num, setNum] = useState(start);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // 清除之前的定时器
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    // 设置新的定时器
    const count = end - start;
    const time = 2 * 60;
    const add = Math.floor(count / time) || 1;

    timerRef.current = setInterval(() => {
      setNum((prevNum) => {
        const nextNum = prevNum + add;
        // 如果达到或超过目标值，清除定时器并设置为最终值
        if (nextNum >= end) {
          if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
          }
          return end;
        }
        return nextNum;
      });
    });

    // 组件卸载时清除定时器
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [end, start]);

  return (
    <span>
      {prefix}
      {amountFormatter(num)}
    </span>
  );
}

export default Count;
