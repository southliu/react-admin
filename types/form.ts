import type { Key, ReactNode } from "react";
import type { DefaultOptionType } from 'antd/lib/select';
import type { EditorProps } from '@/components/WangEditor';
import type { BusinessComponents } from '@/components/Business';
import type { ApiSelectProps, ApiTreeSelectProps } from '@south/selects';
import type { BaseFormList, BaseFormData, BaseComponentType, BaseComponentProps } from '@south/form';

export interface ApiResult extends Omit<DefaultOptionType, 'value'> {
  label: ReactNode;
  title?: ReactNode;
  key?: Key;
  value?: string | number;
}


// 表单数据类型
export type FormData = BaseFormData

// 额外组件类型
export type ComponentType = BaseComponentType | BusinessComponents

// 额外组件参数
export type ComponentProps = BaseComponentProps | EditorProps | ApiSelectProps | ApiTreeSelectProps

// 表单数据
export interface FormList extends Omit<BaseFormList, 'component' | 'componentProps'> {
  component: ComponentType; // 组件
  componentProps?: ComponentProps; // 组件参数
}

// 搜索数据
export interface SearchList extends FormList {
  // TODO...
}
