import { TreeSelect, type TreeSelectProps } from 'antd';
import { useTranslation } from 'react-i18next';
import { MAX_TAG_COUNT } from './index';

function BaseTreeSelect(props: TreeSelectProps) {
  const { treeData } = props;
  const { t } = useTranslation();
  const [currentTreeData, setCurrentTreeData] = useState<TreeSelectProps['treeData']>([]);

  useEffect(() => {
    if (!treeData) {
      setCurrentTreeData([]);
      return;
    }

    for (let i = 0; i < treeData?.length; i++) {
      const item = treeData[i];

      // 如果数组不是对象，则拼接数组
      if (typeof item !== 'object') {
        treeData[i] = { label: item, value: item };
      }
    }

    setCurrentTreeData(treeData);
  }, [treeData]);

  return (
    <TreeSelect
      allowClear
      showSearch
      maxTagCount={MAX_TAG_COUNT}
      treeNodeFilterProp={props?.fieldNames?.label || 'label'}
      placeholder={t('public.inputPleaseSelect')}
      {...props}
      treeData={currentTreeData}
    />
  );
}

export default BaseTreeSelect;
