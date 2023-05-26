import type { Dayjs } from 'dayjs';
import type { RangePickerProps } from 'antd/es/date-picker/generatePicker';
import { DatePicker } from 'antd';

import { stringRang2DayjsRang } from './utils/helper';

const { RangePicker } = DatePicker;

function BasicRangePicker(props: RangePickerProps<Dayjs>) {
  const { value } = props;
  const params = {...props};

  // 如果值不是dayjs类型则进行转换
  if (value) params.value = stringRang2DayjsRang(value);

  return (
    <RangePicker
      {...params}
    />
  );
}

export default BasicRangePicker;