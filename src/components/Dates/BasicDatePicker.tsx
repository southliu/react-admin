import type { DatePickerProps } from 'antd'
import { DatePicker } from 'antd'
import moment, { isMoment } from 'moment'

function BasicDatePicker(props: DatePickerProps) {
  const { value } = props
  const params = {...props}

  // 如果值不是moment类型则进行转换
  if (!isMoment(value)) params.value = moment(value)

  return (
    <DatePicker
      {...params}
    />
  )
}

export default BasicDatePicker