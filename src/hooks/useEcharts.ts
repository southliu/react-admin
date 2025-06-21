import { useCallback, useEffect, useRef } from 'react';
import { debounce } from 'lodash';
import * as echarts from 'echarts';
/**
 * 使用Echarts
 * @param options -  绘制echarts的参数
 * @param data -  数据
 */
export const useEcharts = (options: echarts.EChartsCoreOption, data?: unknown) => {
  const echartsRef = useRef<echarts.EChartsType | null>(null);
  const htmlDivRef = useRef<HTMLDivElement>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);

  /** 销毁echarts */
  const dispose = () => {
    if (htmlDivRef.current) {
      echartsRef.current?.dispose();
      echartsRef.current = null;
    }
    if (resizeObserverRef.current) {
      resizeObserverRef.current.disconnect();
      resizeObserverRef.current = null;
    }
  };

  /** 初始化 */
  const init = useCallback(() => {
    if (options && htmlDivRef.current) {
      // 摧毁echarts后在初始化
      dispose();

      // 初始化chart
      echartsRef.current = echarts.init(htmlDivRef.current);
      echartsRef.current.setOption(options);

      // 使用 ResizeObserver 监听容器尺寸变化
      resizeObserverRef.current = new ResizeObserver(
        debounce(() => {
          echartsRef.current?.resize({
            animation: {
              duration: 500,
            },
          });
        }, 50),
      );
      resizeObserverRef.current.observe(htmlDivRef.current);
    }
  }, [options]);

  useEffect(() => {
    if (htmlDivRef.current) {
      init();

      return () => {
        dispose();
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (data && echartsRef.current) {
      echartsRef?.current?.setOption(options);
    }
  }, [data, options]);

  return [htmlDivRef, echartsRef.current] as const;
};
