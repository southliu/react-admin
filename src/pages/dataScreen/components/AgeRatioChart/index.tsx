import { useEcharts } from "@/hooks/useEcharts"
import { EChartsOption } from "echarts"

interface ChartProp {
	value: string;
	name: string;
	percentage: string;
}
const AgeRatioChart = () => {
	const data: ChartProp[] = [
		{
			value: '200',
			name: "10岁以下",
			percentage: "16%"
		},
		{
			value: '110',
			name: "10 - 18岁",
			percentage: "8%"
		},
		{
			value: '150',
			name: "18 - 30岁",
			percentage: "12%"
		},
		{
			value: '310',
			name: "30 - 40岁",
			percentage: "24%"
		},
		{
			value: '250',
			name: "40 - 60岁",
			percentage: "20%"
		},
		{
			value: '260',
			name: "60岁以上",
			percentage: "20%"
		}
	]

	// const colors = ["#F6C95C", "#EF7D33", "#1F9393", "#184EA1", "#81C8EF", "#9270CA"]

	const option: EChartsOption = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 1048, name: '10岁以下' },
          { value: 735, name: '10-18岁' },
          { value: 580, name: '18-30岁' },
          { value: 484, name: '40-60岁' },
          { value: 300, name: '60岁以上' }
        ]
      }
    ]
  }

	const [echartsRef] = useEcharts(option, data)
	return <div ref={echartsRef} style={{ width: "100%", height: "100%" }}></div>
}

export default AgeRatioChart
