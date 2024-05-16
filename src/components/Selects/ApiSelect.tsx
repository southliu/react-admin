import type { ApiSelectProps } from '#/form';
import type { DefaultOptionType } from 'antd/es/select';
import { Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { useState, useEffect, useCallback } from 'react';
import { MAX_TAG_COUNT } from '@/utils/config';
import Loading from './components/Loading';

/**
 * @description: 根据API获取数据下拉组件
 */
function ApiSelect(props: ApiSelectProps) {
  const { t } = useTranslation();
  const [isLoading, setLoading] = useState(false);
  const [options, setOptions] = useState<DefaultOptionType[]>([]);

  // 清除自定义属性
  const params: Partial<ApiSelectProps> = { ...props };
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
        setOptions(result as DefaultOptionType[]);
      }
    } finally {
      setLoading(false);
    }
  }, [props]);

  useEffect(() => {
    // 当有值且列表为空时，自动获取接口
    if (props.value && options.length === 0) {
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
    <Select
      allowClear={true}
      maxTagCount={MAX_TAG_COUNT}
      placeholder={t('public.inputPleaseSelect')}
      optionFilterProp='label'
      {...params}
      loading={isLoading}
      options={options}
      notFoundContent={isLoading && <Loading />}
      onDropdownVisibleChange={onDropdownVisibleChange}
    />
  );
}

export default ApiSelect;