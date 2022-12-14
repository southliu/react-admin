import * as echarts from "echarts"
import { useEffect, useRef } from "react"
/**
 * 使用Echarts
 * @param data -  数据
 * @param options -  绘制Echarts的参数(必传)
 * */
export const useEcharts = (options: echarts.EChartsCoreOption, data?: unknown) => {
  const myChart = useRef<echarts.EChartsType>()
  const echartsRef = useRef<HTMLDivElement>(null)

  const echartsResize = () => {
    echartsRef && myChart?.current?.resize()
  }

  useEffect(() => {
    if (data) {
      myChart?.current?.setOption(options)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  useEffect(() => {
    if (echartsRef?.current) {
      myChart.current = echarts.init(echartsRef.current as HTMLDivElement)
    }
    myChart?.current?.setOption(options)
    window.addEventListener("resize", echartsResize, false)
    return () => {
      window.removeEventListener("resize", echartsResize)
      myChart?.current?.dispose()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return [echartsRef]
}
