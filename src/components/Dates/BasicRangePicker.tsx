import type { RangePickerProps } from 'antd/lib/date-picker'
import { DatePicker } from 'antd'
import moment from 'moment'

const { RangePicker } = DatePicker

function BasicRangePicker(props: RangePickerProps) {
  const { value } = props
  const params = {...props}

  // 如果值不是moment类型则进行转换
  if (
    value?.length === 2 &&
    !moment.isMoment(value?.[0]) &&
    !moment.isMoment(value?.[1])
  ) {
    params.value = [moment(value[0]), moment(value[1])]
  }

  return (
    <RangePicker
      {...params}
    />
  )
}

export default BasicRangePicker