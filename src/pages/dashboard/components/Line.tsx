import type { EChartsCoreOption } from "echarts"
import Echarts from '@/components/Echarts/BasicEcharts'

const option: EChartsCoreOption = {
  title: {
    text: '有效充值占比',
    left: 30,
    top: 5
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['07-11', '07-12', '07-13', '07-14', '07-15', '07-16', '07-17']
  },
  yAxis: {
    type: 'value'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985'
      }
    }
  },
  series: [
    {
      name: '充值数',
      type: 'line',
      areaStyle: {
        color: '#1890ff',
        opacity: 0.2
      },
      emphasis: {
        focus: 'series'
      },
      data: [120, 140, 120, 190, 150, 111, 160]
    },
    {
      name: '用户数数',
      type: 'line',
      areaStyle: {
        color: '#1890ff',
        opacity: 0.3
      },
      emphasis: {
        focus: 'series'
      },
      data: [90, 122, 90, 140, 123, 280, 200]
    },
  ]
}

function Line() {
  return (
    <div className='w-60% border border-gray-200 rounded-10px'>
      <Echarts
        className="w-full mt-10px"
        width="100%"
        height="500px"
        option={option}
      />
    </div>
  )
}

export default Line