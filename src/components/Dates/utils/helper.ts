import type { Moment } from 'moment'
import type { RangeValue } from '#/public'
import { DATE_FORMAT } from '@/utils/constants'
import moment from 'moment'

/**
 * moment类型转字符串类型
 * @param value - moment时间类型值
 */
 export function moment2String(
  value: Moment | string,
  format = DATE_FORMAT
): string {
  if (moment.isMoment(value)) {
    return value.format(format)
  }
  return value
}

/**
 * 字符串类型转moment类型
 * @param value - 字符串
 */
export function string2Moment(value: Moment | string): Moment {
  if (moment.isMoment(value)) {
    return value
  }
  return moment(value)
}

/**
 * moment数组类型转字符串类型
 * @param value - moment时间类型值
 */
export function momentRang2StringRang(
  value: RangeValue<Moment>,
  format = DATE_FORMAT
) {
  if (!value) return undefined

  if (
    value?.length > 1 &&
    moment.isMoment(value?.[0]) &&
    moment.isMoment(value?.[1])
  ) {
    return [
      value[0].format(format),
      value[1].format(format)
    ]
  }
  return value
}

/**
 * 字符串类型转moment类型
 * @param value - 字符串
 */
export function stringRang2MomentRang(
  value: RangeValue<string> | RangeValue<Moment>
): RangeValue<Moment> | undefined {
  if (!value) return undefined

  if (
    value?.length > 1 &&
    !moment.isMoment(value?.[0]) &&
    !moment.isMoment(value?.[1])
  ) {
    return [moment(value[0]), moment(value[1])]
  }
  return value as RangeValue<Moment>
}
