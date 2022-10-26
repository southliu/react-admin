import type { ECBasicOption } from 'echarts/types/dist/shared'
import { useEffect, useRef } from 'react'
import echarts from './lib/echarts'

interface IProps {
  className?: string;
  width?: number | string;
  height?: number | string;
  option: ECBasicOption;
}

function BasicEcharts(props: IProps) {
  let { width, height } = props
  const { className } = props
  const chartRef = useRef<HTMLDivElement>(null)

  if (width === undefined) width = '100%'
  if (height === undefined) height = '100%'

  useEffect(() => {
    // 初始化chart
    const chartInstance = echarts.init(chartRef.current as HTMLDivElement)
    chartInstance.setOption(props.option)
  }, [props.option])

  // 监听操作值
  useEffect(() => {
    if (props.option) {
      // 摧毁echarts后在初始化
      if (chartRef.current && echarts !== null && echarts !== undefined) {
        echarts?.dispose(chartRef.current)
      }
      // 转为宏任务防止宽度100%转为100px
      setTimeout(() => {
        // 初始化chart
        const chartInstance = echarts.init(chartRef.current as HTMLDivElement)
        chartInstance.setOption(props.option)
      }, 0)
    }
  }, [props.option])

  return (
    <div
      ref={chartRef}
      className={className}
      style={{ height, width }}
    ></div>
  )
}

export default BasicEcharts