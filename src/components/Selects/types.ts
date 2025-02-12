import type { SelectProps, TreeSelectProps } from "antd";
import type { ServerResult } from "@south/request";

export type ApiFn = (params?: object | unknown[]) => Promise<ServerResult<unknown>>

// api参数
interface ApiParam {
  api?: ApiFn;
  params?: object | unknown[];
  apiResultKey?: string;
}

// ApiSelect
export type ApiSelectProps = ApiParam & SelectProps

// ApiTreeSelect
export type ApiTreeSelectProps = ApiParam & TreeSelectProps
