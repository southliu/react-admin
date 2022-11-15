import { useState, useEffect } from 'react'
import { amountFormatter } from '@/utils/helper'

interface IProps extends React.HTMLAttributes<HTMLDivElement> {
  prefix?: string;
  start: number;
  end: number;
}

function Count(props: IProps) {
  const { prefix, start, end } = props
  const [num, setNum] = useState(start)

  useEffect(() => {
    const count = end - start
    const time = 2 * 60
    const add = Math.floor(count / time) || 1
    setInterval(() => {
      setNum(num => num + add)
    })
  }, [end, start])

  useEffect(() => {
    if (num >= end) {
      setNum(end)
    }
  }, [end, num])

  return (
    <span>{ prefix }{ amountFormatter(num) }</span>
  )
}

export default Count