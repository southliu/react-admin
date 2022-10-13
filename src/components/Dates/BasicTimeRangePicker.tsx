import type { TimeRangePickerProps } from 'antd'
import { TimePicker } from 'antd'
import { stringRang2MomentRang } from './utils/helper'

const { RangePicker } = TimePicker

function BasicTimePicker(props: TimeRangePickerProps) {
  const { value } = props
  const params = {...props}

  // 如果值不是moment类型则进行转换
  if (value) params.value = stringRang2MomentRang(value)

  return (
    <RangePicker
      {...params}
    />
  )
}

export default BasicTimePicker