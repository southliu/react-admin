import type { EChartsCoreOption } from "echarts"
import { useEffect, useRef, useCallback, useState } from 'react'
import echarts from './lib/echarts'

interface IProps {
  className?: string;
  width?: number | string;
  height?: number | string;
  option: EChartsCoreOption;
}

function BasicEcharts(props: IProps) {
  let { width, height } = props
  const { className, option } = props
  const chartRef = useRef<HTMLDivElement>(null)
  const [isShow, setShow] = useState(false)

  if (!width) width = '100%'
  if (!height) height = '100%'

  // 100毫秒后显示echarts
  useEffect(() => {
    setTimeout(() => {
      setShow(true)
    }, 100)
  }, [])

  /** 销毁echarts */
  const dispose = () => {
    if (chartRef.current && echarts !== null && echarts !== undefined) {
      echarts?.dispose(chartRef.current)
    }
  }

  /** 初始化 */
  const init = useCallback(() => {
    if (isShow) {
      // 摧毁echarts后在初始化
      dispose()

      // 初始化chart
      const chartInstance = echarts.init(chartRef.current as HTMLDivElement)
      chartInstance.setOption(option)
    }
  }, [isShow, option])

  // 监听操作值
  useEffect(() => {
    if (option && isShow) init()
  }, [init, isShow, option])

  useEffect(() => {
    init()
    window.addEventListener("resize", () => init(), false)

    return () => {
      window.removeEventListener("resize", () => init())
      dispose()
    }
  }, [init])

  return (
    <>
      {
        isShow &&
        <div
          ref={chartRef}
          className={`echarts ${className}`}
          style={{ height, width }}
        ></div>
      }
    </>
  )
}

export default BasicEcharts