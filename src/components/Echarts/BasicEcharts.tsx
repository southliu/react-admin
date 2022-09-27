import type { ECBasicOption } from 'echarts/types/dist/shared'
import { useEffect, useRef } from 'react'
import echarts from './lib/echarts'

interface IProps {
  className?: string;
  width: number | string;
  height: number | string;
  option: ECBasicOption;
}

function BasicEcharts(props: IProps) {
  const { width, height, className } = props
  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // 初始化chart
    const chartInstance = echarts.init(chartRef.current as HTMLDivElement)
    chartInstance.setOption(props.option)
  }, [])

  // 监听操作值
  useEffect(() => {
    if (props.option) {
      // 摧毁echarts后在初始化
      if (chartRef.current && echarts !== null && echarts !== undefined) {
        echarts?.dispose(chartRef.current)
      }
      // 初始化chart
      const chartInstance = echarts.init(chartRef.current as HTMLDivElement)
      chartInstance.setOption(props.option)
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