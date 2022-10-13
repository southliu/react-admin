import type { RangePickerProps } from 'antd/lib/date-picker'
import { DatePicker } from 'antd'
import { stringRang2MomentRang } from './utils/helper'

const { RangePicker } = DatePicker

function BasicRangePicker(props: RangePickerProps) {
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

export default BasicRangePicker