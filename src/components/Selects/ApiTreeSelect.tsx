import type { ApiTreeSelectProps } from '#/form';
import type { TreeSelectProps } from 'antd';
import { TreeSelect } from 'antd';
import { useTranslation } from 'react-i18next';
import { useCallback, useEffect, useState } from 'react';
import { MAX_TAG_COUNT } from '@/utils/config';
import Loading from './components/Loading';

/**
 * @description: 根据API获取数据下拉树形组件
 */
function ApiTreeSelect(props: ApiTreeSelectProps) {
  const { t } = useTranslation();
  const [isLoading, setLoading] = useState(false);
  const [options, setOptions] = useState<TreeSelectProps['treeData']>([]);

  // 清除自定义属性
  const params: Partial<ApiTreeSelectProps> = { ...props };
  delete params.api;
  delete params.params;
  delete params.params2;
  delete params.params3;
  delete params.apiResultKey;

  /** 获取接口数据 */
  const getApiData = useCallback(async () => {
    if (!props.api) return;
    try {
      const { api, params, params2, params3, apiResultKey } = props;

      setLoading(true);
      if (api) {
        const { code, data } = await api(params, params2, params3);
        if (Number(code) !== 200) return;
        const result = apiResultKey ? (data as { [apiResultKey: string]: unknown })?.[apiResultKey] : data;
        setOptions(result as TreeSelectProps['treeData']);
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
      placeholder={t('public.inputPleaseSelect')}
      {...params}
      loading={isLoading}
      treeData={options}
      notFoundContent={isLoading && <Loading />}
      onDropdownVisibleChange={onDropdownVisibleChange}
    />
  );
}

export default ApiTreeSelect;