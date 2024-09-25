import type { SelectProps } from 'antd';
import { getPartner } from '@/servers/platform/partner';
import { ApiSelect } from '@south/selects';

/**
 * @description: 合作公司下拉组件
 */
function PartnerSelect(props: SelectProps) {
  return (
    <ApiSelect
      {...props}
      api={getPartner}
      mode='multiple'
      fieldNames={{ label: 'name', value: 'id' }}
    />
  );
}

export default PartnerSelect;
