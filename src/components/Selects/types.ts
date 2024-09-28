import type { SelectProps, TreeSelectProps } from "antd";
import type { ServerResult } from "@south/request";

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
