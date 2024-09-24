import type { Key, ReactNode } from "react";
import type { ServerResult } from "@south/request";
import type { DefaultOptionType } from 'antd/lib/select';
import type { EditorProps } from '@/components/WangEditor';
import type { SelectProps, TreeSelectProps } from "antd";
import type { BusinessComponents } from '@/components/Business';
import type { BaseFormList, BaseFormData, BaseComponentType, BaseComponentProps } from '@south/form';

export interface ApiResult extends Omit<DefaultOptionType, 'value'> {
  label: ReactNode;
  title?: ReactNode;
  key?: Key;
  value?: string | number;
}

export type ApiFn = (params?: object, params2?: object, params3?: object) => Promise<ServerResult<unknown>>

// api参数
interface ApiParam {
  api?: ApiFn;
  params?: object;
  params2?: object;
  params3?: object;
  apiResultKey?: string;
}

// ApiSelect
export type ApiSelectProps = ApiParam & SelectProps

// ApiTreeSelect
export type ApiTreeSelectProps = ApiParam & TreeSelectProps

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
