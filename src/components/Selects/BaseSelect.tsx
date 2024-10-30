import { Select, type SelectProps } from "antd";
import { useTranslation } from "react-i18next";
import { MAX_TAG_COUNT } from './index';

/**
 * @description: 基础下拉组件
 */
function BaseSelect(props: SelectProps) {
  const { t } = useTranslation();

  return (
    <Select
      allowClear
      showSearch
      maxTagCount={MAX_TAG_COUNT}
      placeholder={t('public.inputPleaseSelect')}
      optionFilterProp={props?.fieldNames?.label || 'label'}
      {...props}
    />
  );
}

export default BaseSelect;
