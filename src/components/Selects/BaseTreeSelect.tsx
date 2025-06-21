import { TreeSelect, type TreeSelectProps } from 'antd';
import { useTranslation } from 'react-i18next';
import { MAX_TAG_COUNT } from './index';

function BaseTreeSelect(props: TreeSelectProps) {
  const { t } = useTranslation();

  return (
    <TreeSelect
      allowClear
      showSearch
      maxTagCount={MAX_TAG_COUNT}
      treeNodeFilterProp={props?.fieldNames?.label || 'label'}
      placeholder={t('public.inputPleaseSelect')}
      {...props}
    />
  );
}

export default BaseTreeSelect;
