import type { IFormData, IFormList } from '#/form'
import type { Moment } from 'moment'
import type { RangeValue } from '#/public'
import type { DatePickerProps } from 'antd'
import { isMoment } from 'moment'
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
  if (isMoment(value)) {
    return value.format(format)
  }
  return value
}

/**
 * 字符串类型转moment类型
 * @param value - 字符串
 */
export function string2Moment(value: Moment | string): Moment {
  if (isMoment(value)) {
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
    isMoment(value?.[0]) &&
    isMoment(value?.[1])
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

  // 当第一个数据都不为Moment
  if (
    value?.length > 1 &&
    !isMoment(value?.[0]) &&
    isMoment(value?.[1])
  ) {
    return [moment(value[0]), value[1]]
  }

  // 当最后一个数据都不为Moment
  if (
    value?.length > 1 &&
    isMoment(value?.[0]) &&
    !isMoment(value?.[1])
  ) {
    return [value[0], moment(value[1])]
  }

  // 当两个数据都不为Moment
  if (
    value?.length > 1 &&
    !isMoment(value?.[0]) &&
    !isMoment(value?.[1])
  ) {
    return [moment(value[0]), moment(value[1])]
  }
  return value as RangeValue<Moment>
}

/**
 * 获取列表中改键值数据
 * @param list - 列表值
 * @param key - 键值
 */
function getListKeyParam(list: IFormList[], key: string): string {
  for (let i = 0; i < list.length; i++) {
    if (list[i].name === key) {
      return (list[i].componentProps as DatePickerProps)?.format as string
              || DATE_FORMAT
    }
  }

  return DATE_FORMAT
}

/**
 * 将Moment转为字符串
 * @param obj - 检测对象
 * @param list - 列表值
 */
export function filterMoment(obj: IFormData, list: IFormList[]): object {
  for (const key in obj) {
    // 判断是否是时间区间
    if (
      (obj[key] as [Moment, Moment])?.length === 2 &&
      isMoment((obj[key] as [Moment, Moment])[0]) &&
      isMoment((obj[key] as [Moment, Moment])[1]) 
    ) {
      const format = getListKeyParam(list, key)
      obj[key] = momentRang2StringRang(
        obj[key] as [Moment, Moment],
        format
      )
    }

    // 如果是Moment类型则转换成字符串
    if (obj?.[key] && isMoment(obj[key])) {
      const format = getListKeyParam(list, key)
      obj[key] = moment2String(obj[key] as Moment, format)
    }
  }

  return obj
}
