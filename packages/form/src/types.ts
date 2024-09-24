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
  TransferProps,
  FormItemProps,
} from "antd";
import type { RuleObject } from 'antd/lib/form';
import type { RangePickerProps } from 'antd/lib/date-picker';
import type { FC } from 'react';

// 数据类型
export type BaseFormData = Record<string, unknown>

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
type EditorComponents = 'RichEditor'

// 密码强度组件
type PasswordStrength = 'PasswordStrength'

// 组件集合
export type BaseComponentType = DefaultDataComponents |
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
                            TransferComponents

// 组件参数
export type BaseComponentProps = InputProps |
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
                              RangePickerProps
                              // ApiSelectProps |
                              // ApiTreeSelectProps |

// 表单规则
export type FormRule = RuleObject & {
  trigger?: 'blur' | 'change' | ['change', 'blur'];
}

// 表单数据
export interface BaseFormList extends Omit<FormItemProps, 'labelCol' | 'wrapperCol'> {
  name: string | string[]; // 表单域字段
  label: string; // 标签
  placeholder?: string; // 占位符
  hidden?: boolean; // 是否隐藏
  unit?: string; // 单位
  rules?: FormRule[]; // 规则
  labelCol?: number; // label宽度
  wrapperCol?: number; // 内容宽度
  component: BaseComponentType; // 组件
  componentProps?: BaseComponentProps; // 组件参数
  render?: FC; // 自定义渲染
}
