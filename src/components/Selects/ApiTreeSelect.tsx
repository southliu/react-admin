import type { ApiFn } from '#/form';
import type { TreeSelectProps } from 'antd';
import { TreeSelect } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { MAX_TAG_COUNT, PLEASE_SELECT } from '@/utils/config';
import Loading from './components/Loading';

interface Props extends TreeSelectProps {
  api: ApiFn;
  params?: object;
}

/**
 * @description: 根据API获取数据下拉树形组件
 */
function ApiTreeSelect(props: Props) {
  const [isLoading, setLoading] = useState(false);
  const [options, setOptions] = useState<TreeSelectProps['treeData']>([]);

  // 清除自定义属性
  const params: Partial<Props> = { ...props };
  delete params.api;
  delete params.params;

  /** 获取接口数据 */
  const getApiData = useCallback(async () => {
    try {
      setLoading(true);
      if (props.api) {
        const { code, data } = await props.api(props?.params);
        Number(code) === 200 && setOptions((data || []) as TreeSelectProps['treeData']);
      }
    } finally {
        setLoading(false);
    }
  }, [props]);

  useEffect(() => {
    // 当有值且列表为空时，自动获取接口
    if (props.value && options?.length === 0) {
      getApiData();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.value]);

  /**
   * 展开下拉回调
   * @param open - 是否展开
   */
  const onDropdownVisibleChange = (open: boolean) => {
    if (open) getApiData();

    props.onDropdownVisibleChange?.(open);
  };

  return (
    <TreeSelect
      allowClear={true}
      maxTagCount={MAX_TAG_COUNT}
      placeholder={PLEASE_SELECT}
      {...params}
      loading={isLoading}
      treeData={options}
      notFoundContent={isLoading && <Loading />}
      onDropdownVisibleChange={onDropdownVisibleChange}
    />
  );
}

export default ApiTreeSelect;