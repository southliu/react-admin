import type {
  InputProps,
  InputNumberProps,
  SelectProps,
  TreeSelectProps,
  RadioProps,
  DatePickerProps,
  TimePickerProps,
  UploadProps,
  RateProps,
  CheckboxProps,
  SliderSingleProps,
  TimeRangePickerProps,
  TransferProps
} from "antd"
import type { Key, ReactNode } from "react"
import type { AllTypeData } from './public'
import type { RangePickerProps } from 'antd/lib/date-picker'
import type { DefaultOptionType } from 'antd/lib/select'
import type { RuleObject } from 'antd/lib/form'
import type { BusinessComponents } from '@/components/Business'
import type { EditorProps } from '@/components/WangEditor'

// 数据类型
export type FormData = Record<string, AllTypeData>

// 基础数据组件
type DefaultDataComponents = 'Input' |
                              'InputNumber' |
                              'TextArea' |
                              'InputPassword' |
                              'AutoComplete' |
                              'customize'

// 下拉组件
type SelectComponents = 'Select' | 'TreeSelect' | 'ApiSelect' | 'ApiTreeSelect'

// 复选框组件
type CheckboxComponents = 'Checkbox' | 'CheckboxGroup'

// 单选框组件
type RadioComponents = 'RadioGroup' | 'Switch'

// 时间组件
type TimeComponents = 'DatePicker' | 'RangePicker' | 'TimePicker' | 'TimeRangePicker'

// 上传组件
type UploadComponents = 'Upload'

// 星级组件
type RateComponents = 'Rate'

// 穿梭俊组件
type TransferComponents = 'Transfer'

// 滑动输入条组件
type SliderComponents = 'Slider'

// 自定义组件
type CustomizeComponents = 'Customize'

// 富文本编辑器
type EditorComponents = 'Editor'

// 密码强度组件
type PasswordStrength = 'PasswordStrength'

// 组件集合
export type ComponentType = DefaultDataComponents |
                            SelectComponents |
                            CheckboxComponents |
                            TimeComponents |
                            RadioComponents |
                            CustomizeComponents |
                            UploadComponents |
                            RateComponents |
                            SliderComponents |
                            EditorComponents |
                            PasswordStrength |
                            TransferComponents |
                            BusinessComponents

export interface ApiResult extends Omit<DefaultOptionType, 'value'> {
  label: ReactNode;
  title?: ReactNode;
  key?: Key;
  value?: string | number;
}

export type ApiFn = (params?: object) => Promise<ApiResult[]>

// api参数
interface ApiParam {
  api?: ApiFn;
  params?: object;
}

// ApiSelect
export type ApiSelectProps = ApiParam & SelectProps

// ApiTreeSelect
export type ApiTreeSelectProps = ApiParam & TreeSelectProps

// 组件参数
export type ComponentProps = InputProps |
                              InputNumberProps |
                              SelectProps |
                              TreeSelectProps |
                              CheckboxProps |
                              RadioProps |
                              DatePickerProps |
                              TimePickerProps |
                              UploadProps |
                              RateProps |
                              SliderSingleProps |
                              TimeRangePickerProps |
                              TransferProps |
                              RangePickerProps |
                              ApiSelectProps |
                              ApiTreeSelectProps |
                              EditorProps

// 表单规则
export type FormRule = RuleObject & {
  trigger?: 'blur' | 'change' | ['change', 'blur'];
}

// 表单数据
export type FormList = {
  name: string | string[]; // 表单域字段
  label: string; // 标签
  placeholder?: string; // 占位符
  hidden?: boolean; // 是否隐藏
  rules?: FormRule[]; // 规则
  labelCol?: number; // label宽度
  wrapperCol?: number; // 内容宽度
  component: ComponentType; // 组件
  componentProps?: ComponentProps; // 组件参数
  render?: ReactElement; // 自定义渲染
}
