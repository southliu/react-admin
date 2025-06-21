import type { SelectProps, TreeSelectProps } from 'antd';
import type { ServerResult } from '@south/request';

export type ApiFn = (params?: object | unknown[]) => Promise<ServerResult<unknown>>;

// api参数
interface ApiParam {
  api?: ApiFn;
  params?: object | unknown[];
  apiResultKey?: string;
}

// 带分页的api参数
interface ApiPageParam extends Omit<ApiParam, 'params'> {
  pageSizeKey?: string;
  pageKey?: string;
  pageSize?: number;
  params?: object & {
    [key: string]: number;
  };
}

export type ApiSelectProps = ApiParam & SelectProps;

export type ApiTreeSelectProps = ApiParam & TreeSelectProps;

export type ApiPageSelectProps = ApiPageParam & SelectProps;
