import type {
  InputProps,
  SelectProps,
  TreeSelectProps,
  RadioProps,
  DatePickerProps,
  UploadProps,
  RateProps
} from "antd"
import type { IAllDataType } from './public'
import type { DefaultOptionType } from 'antd/lib/select'
import type { RuleObject } from 'antd/lib/form'
// import type { IBusinessComponentType } from '@/components/Business'
// import type { IWangEditorProps } from '@/components/WangEditor/model'

// 数据类型
export type IFormData = Record<string, IAllDataType>

// 基础数据组件
type IDefaultDataComponents = 'Input' |
                              'InputNumber' |
                              'Textarea' |
                              'InputPassword' |
                              'AutoComplete' |
                              'customize'
                              // IBusinessComponentType

// 下拉组件
type ISelectComponents = 'Select' | 'TreeSelect' | 'ApiSelect' | 'ApiTreeSelect'

// 复选框组件
type ICheckboxComponents = 'Checkbox' | 'CheckboxGroup'

// 单选框组件
type IRadioComponents = 'RadioGroup' | 'Switch'

// 时间组件
type ITimeComponents = 'DatePicker' | 'RangePicker'

// 上传组件
type IUploadComponents = 'Upload'

// 星级组件
type IRateComponents = 'Rate'

// 滑动输入条组件
type ISliderComponents = 'Slider'

// 自定义组件
type ICustomizeComponents = 'Customize'

// 富文本编辑器
type IEditorComponents = 'WangEditor'

// 密码强度组件
type IPasswordStrength = 'PasswordStrength'

// 组件集合
export type IComponentType = IDefaultDataComponents |
                          ISelectComponents |
                          ICheckboxComponents |
                          ITimeComponents |
                          IRadioComponents |
                          ICustomizeComponents |
                          IUploadComponents |
                          IRateComponents |
                          ISliderComponents |
                          IEditorComponents |
                          IPasswordStrength

export type IApi = (params?: unknown) => Promise<DefaultOptionType[]>

// api参数
interface IApiParam {
  api?: IApi;
  params?: object;
}

// ApiSelect
export type IApiSelectProps = IApiParam & SelectProps

// ApiTreeSelect
export type IApiTreeSelectProps = IApiParam & TreeSelectProps

// 组件参数
export type IComponentProps = InputProps |
                              SelectProps |
                              TreeSelectProps |
                              // CheckboxGroupProps |
                              RadioProps |
                              DatePickerProps |
                              UploadProps |
                              RateProps |
                              // SliderProps |
                              IApiSelectProps |
                              IApiTreeSelectProps
                              // IWangEditorProps

// 表单规则
export type IFormRule = RuleObject & {
  trigger?: 'blur' | 'change' | ['change', 'blur'];
};

// 表单数据
export type IFormList = {
  name: string | string[]; // 表单域字段
  label: string; // 标签
  placeholder?: string; // 占位符
  hidden?: boolean; // 是否隐藏
  rules?: IFormRule[]; // 规则
  labelCol?: number; // label宽度
  wrapperCol?: number; // 内容宽度
  component: IComponentType; // 组件
  componentProps?: IComponentProps; // 组件参数
  // render?: () => JSX; // 自定义渲染
}
