// 基础类型
export type IBasicData = string | number | boolean

// 数组
export type IArrayData = string[] | number[] | boolean[]

// 对象
export type IObjectData = object | object[] | Record<string, IBasicData | IArrayData | IEmptyData>

// 空值
export type IEmptyData = null | undefined

// 唯一值
export type ISymbolData = symbol | symbol[]

// 全部数据类型
export type IAllDataType = IBasicData | IArrayData | IEmptyData | IObjectData | ISymbolData