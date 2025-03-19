import { useCallback, useEffect, useRef, useState } from 'react';
import * as echarts from 'echarts';
import { useCommonStore } from './useCommonStore';
/**
 * 使用Echarts
 * @param options -  绘制echarts的参数
 * @param data -  数据
 */
export const useEcharts = (options: echarts.EChartsCoreOption, data?: unknown) => {
  const { isRefresh } = useCommonStore();
  const [isInit, setInit] = useState(false);
  const echartsRef = useRef<echarts.EChartsType>(null);
  const htmlDivRef = useRef<HTMLDivElement>(null);

  /** 销毁echarts */
  const dispose = () => {
    if (htmlDivRef.current) {
      echartsRef.current?.dispose();
    }
  };

  /** 初始化 */
  const init = useCallback(() => {
    if (!htmlDivRef.current || !options) return;

    try {
      // 销毁旧实例
      dispose();
      // 创建新实例
      echartsRef.current = echarts.init(htmlDivRef.current);
      // 设置初始配置
      echartsRef.current.setOption(options, true);
      // 自动调整尺寸
      echartsRef.current.resize();
    } catch (error) {
      console.error('ECharts初始化失败:', error);
    }
    setInit(false);
  }, [options]);

  /** 重置 */
  const reset = () => {
    if (echartsRef.current) {
      // 摧毁echarts后在初始化
      dispose();
      init();
    }
  };

  useEffect(() => {
    if (isInit && htmlDivRef.current) init();
  }, [init, isInit, htmlDivRef]);

  // 刷新页面监听操作值
  useEffect(() => {
    if (options && isRefresh) {
      setInit(true);
    }
  }, [options, isRefresh]);

  useEffect(() => {
    const chartInstance = echartsRef.current;
    const resizeHandler = () => chartInstance?.resize();

    if (htmlDivRef.current) {
      init();
      window.addEventListener("resize", resizeHandler);
    }

    return () => {
      window.removeEventListener("resize", resizeHandler);
      dispose();
    };
  }, [init]);

  useEffect(() => {
    if (data) {
      echartsRef?.current?.setOption(options, true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return [htmlDivRef, reset] as const;
};
