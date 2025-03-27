import { useCallback, useEffect, useRef } from 'react';
import * as echarts from 'echarts';
/**
 * 使用Echarts
 * @param options -  绘制echarts的参数
 * @param data -  数据
 */
export const useEcharts = (options: echarts.EChartsCoreOption, data?: unknown) => {
  const echartsRef = useRef<echarts.EChartsType | null>(null);
  const htmlDivRef = useRef<HTMLDivElement>(null);

  /** 销毁echarts */
  const dispose = () => {
    if (htmlDivRef.current) {
      echartsRef.current?.dispose();
      echartsRef.current = null;
    }
  };

  /** 初始化 */
  const init = useCallback(() => {
    if (options) {
      // 摧毁echarts后在初始化
      dispose();

      // 初始化chart
      if (htmlDivRef.current) {
        echartsRef.current = echarts.init(htmlDivRef.current);
        echartsRef.current.setOption(options);
      }
    }
  }, [options]);

  /** 监听窗口大小变化，自适应图表 */
  const resizeHandler = () => {
    setTimeout(() => {
      echartsRef.current?.resize();
    }, 500);
  };

  useEffect(() => {
    if (htmlDivRef.current) {
      init();
      window.addEventListener("resize", resizeHandler, false);
      resizeHandler();

      return () => {
        window.removeEventListener("resize", resizeHandler);
        dispose();
      };
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [htmlDivRef.current]);

  useEffect(() => {
    if (data) {
      echartsRef?.current?.setOption(options);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return [htmlDivRef] as const;
};
