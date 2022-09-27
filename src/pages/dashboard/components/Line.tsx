import type { ECBasicOption } from 'echarts/types/dist/shared'
import Echarts from '@/components/Echarts/BasicEcharts'

const option: ECBasicOption = {
  title: {
    text: '今日数据趋势',
    left: 'center',
    top: 20,
  },
  xAxis: {
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: [150, 230, 224, 218, 135, 147, 260],
      type: 'line'
    }
  ]
}

function Line() {
  return (
    <Echarts
      className="w-full mt-10px"
      width="100%"
      height="500px"
      option={option}
    />
  )
}

export default Line