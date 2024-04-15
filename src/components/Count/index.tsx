import { useState, useEffect } from 'react';
import { amountFormatter } from '@/utils/helper';

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  prefix?: string;
  start: number;
  end: number;
}

function Count(props: Props) {
  const { prefix, start, end } = props;
  const [num, setNum] = useState(start);
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const count = end - start;
    const time = 2 * 60;
    const add = Math.floor(count / time) || 1;
    setTimer(setInterval(() => {
      setNum(num => num + add);
    }));
  }, [end, start]);

  useEffect(() => {
    if (num >= end) {
      if (timer) {
        clearInterval(timer as NodeJS.Timeout);
        setTimer(null);
      }

      setNum(end);
    }
  }, [end, num, timer]);

  useEffect(() => {
    return () => {
      if (timer) {
        clearInterval(timer as NodeJS.Timeout);
        setTimer(null);
      }
    };
  }, [timer]);

  return (
    <span>{ prefix }{ amountFormatter(num) }</span>
  );
}

export default Count;