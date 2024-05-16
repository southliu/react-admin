import { useCallback, useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { useCommonStore } from './useCommonStore';
/**
 * 使用Echarts
 * @param options -  绘制echarts的参数
 * @param data -  数据
 */
export const useEcharts = (options: echarts.EChartsCoreOption, data?: unknown) => {
  const { isRefresh } = useCommonStore();
  const echartsRef = useRef<echarts.EChartsType>();
  const htmlDivRef = useRef<HTMLDivElement>(null);

  /** 销毁echarts */
  const dispose = () => {
    if (htmlDivRef.current) {
      echartsRef.current?.dispose();
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

  // 刷新页面监听操作值
  useEffect(() => {
    if (options && isRefresh) {
      setTimeout(() => {
        init();
      }, 100);
    }
  }, [init, options, isRefresh]);
  
  useEffect(() => {
    init();
    window.addEventListener("resize", init, false);

    return () => {
      window.removeEventListener("resize", init);
      dispose();
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data) {
      echartsRef?.current?.setOption(options);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return [htmlDivRef, init] as const;
};
