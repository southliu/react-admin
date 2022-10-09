import type { TimeRangePickerProps } from 'antd'
import { TimePicker } from 'antd'
import moment, { isMoment } from 'moment'

const { RangePicker } = TimePicker

function BasicTimePicker(props: TimeRangePickerProps) {
  const { value } = props
  const params = {...props}

  // 如果值不是moment类型则进行转换
  if (
    value?.length === 2 &&
    !isMoment(value?.[0]) &&
    !isMoment(value?.[1])
  ) {
    params.value = [moment(value[0]), moment(value[1])]
  }

  return (
    <RangePicker
      {...params}
    />
  )
}

export default BasicTimePicker