import { Select, type SelectProps } from 'antd';
import { useTranslation } from 'react-i18next';
import { MAX_TAG_COUNT } from './index';

/**
 * @description: 基础下拉组件
 */
function BaseSelect(props: SelectProps) {
  const { options } = props;
  const { t } = useTranslation();
  const [currentOptions, setCurrentOptions] = useState<SelectProps['options']>([]);

  useEffect(() => {
    if (!options) {
      setCurrentOptions([]);
      return;
    }

    for (let i = 0; i < options?.length; i++) {
      const item = options[i];

      // 如果数组不是对象，则拼接数组
      if (typeof item !== 'object') {
        options[i] = { label: item, value: item };
      }
    }

    setCurrentOptions(options);
  }, [options]);

  return (
    <Select
      allowClear
      showSearch
      maxTagCount={MAX_TAG_COUNT}
      placeholder={t('public.inputPleaseSelect')}
      optionFilterProp={props?.fieldNames?.label || 'label'}
      {...props}
      options={currentOptions}
    />
  );
}

export default BaseSelect;
