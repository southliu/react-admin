import type { EChartsCoreOption } from 'echarts';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useEcharts } from '@/hooks/useEcharts';
import { useCommonStore } from '@/hooks/useCommonStore';

const data = [
  962,
  1023,
  1112,
  1123,
  1239,
  1382,
  1420,
  1523,
  1622,
  1643,
  1782,
  1928,
];

function Bar() {
  const { t } = useTranslation();
  const { permissions } = useCommonStore();
  const option: EChartsCoreOption = {
    title: {
      text: t('dashboard.rechargeRankingDay'),
      left: 30,
      top: 5
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'value',
      boundaryGap: [0, 0.01]
    },
    yAxis: {
      type: 'category',
      data: [
        '孤独的霸气',
        '凌云齐天',
        '夏至未至',
        '叶璃溪',
        '良辰美景奈何天',
        '凹凸曼',
        '六月离别',
        '离歌',
        '终极战犯',
        '水洗晴空',
        '安城如沫',
        '渣渣灰',
      ]
    },
    series: [
      {
        name: t('dashboard.rechargeAmount'),
        type: 'bar',
        data
      }
    ]
  };

  const [echartsRef, init] = useEcharts(option, data);

  useEffect(() => {
    if (permissions.length && echartsRef.current) {
      init();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [echartsRef]);
  
  return (
    <div className='w-38% h-550px border border-gray-200 rounded-10px'>
      <div ref={echartsRef} className='w-full h-full'></div>
    </div>
  );
}

export default Bar;