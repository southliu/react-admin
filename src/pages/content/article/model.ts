import type { IFormList } from "#/form"
import type { ITableColumn, ITableOptions } from '#/public'
import type { TransferProps } from "antd"
import { INPUT_REQUIRED } from '@/utils/config'
import CustomizeInput from './components/CustomizeInput'

// 搜索数据
export const searchList: IFormList[] = [
  {
    label: '用户名',
    name: 'username',
    component: 'Input'
  },
  {
    label: '标题',
    name: 'title',
    component: 'Input'
  }
]

/**
 * 表格数据
 * @param optionRender - 渲染操作函数
 */
export const tableColumns = (optionRender: ITableOptions<object>): ITableColumn => {
  return [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 400,
      fixed: 'left'
    },
    {
      title: '用户名',
      dataIndex: 'username',
      width: 400,
      fixed: 'left'
    },
    {
      title: '标题',
      dataIndex: 'title',
      width: 400
    },
    {
      title: '内容',
      dataIndex: 'content',
      width: 400
    },
    {
      title: '操作',
      dataIndex: 'operate',
      width: 200,
      fixed: 'right',
      render: (value: unknown, record: object) => optionRender(value, record)
    },
  ]
}

// 新增数据
export const createList = (transferProps: TransferProps<{ title: string }>): IFormList[] => [
  {
    label: '用户名',
    name: 'username',
    rules: INPUT_REQUIRED,
    component: 'Input'
  },
  {
    label: '嵌套数据',
    name: ['user', 'name', 'test'],
    rules: INPUT_REQUIRED,
    component: 'Input'
  },
  {
    label: '标题',
    name: 'title',
    rules: INPUT_REQUIRED,
    component: 'customize',
    render: CustomizeInput
  },
  {
    label: '数据传输',
    name: 'transfer',
    component: 'Transfer',
    componentProps: transferProps
  },
  {
    label: '内容',
    name: 'content',
    component: 'Editor'
  }
]