import type { TimePickerProps } from 'antd'
import { TimePicker } from 'antd'
import { string2Moment } from './utils/helper'

function BasicTimePicker(props: TimePickerProps) {
  const { value } = props
  const params = {...props}

  // 如果值不是moment类型则进行转换
  if (value) params.value = string2Moment(value)

  return (
    <TimePicker
      {...params}
    />
  )
}

export default BasicTimePicker