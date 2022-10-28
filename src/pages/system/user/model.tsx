import type { IFormList } from '#/form'
import type { ITableColumn, ITableOptions } from '#/public'
import type { IRowData } from './index'
import { INPUT_REQUIRED, SELECT_REQUIRED } from '@/utils/config'
import { OPEN_CLOSE } from '@/utils/constants'

// 搜索数据
export const searchList: IFormList[] = [
  {
    label: '年龄',
    name: 'age',
    component: 'InputNumber'
  },
  {
    label: '名字',
    name: 'keyword',
    component: 'Input'
  }
]

// 新增数据
export const createList: IFormList[] = [
  {
    label: '嵌套数据',
    name: ['user', 'name', 'test'],
    rules: INPUT_REQUIRED,
    component: 'Input'
  },
  {
    label: '用户名',
    name: 'username',
    rules: INPUT_REQUIRED,
    component: 'Input'
  },
  {
    label: '姓名',
    name: 'real_name',
    rules: INPUT_REQUIRED,
    component: 'Input'
  },
  {
    label: '角色',
    name: 'roles_name',
    rules: INPUT_REQUIRED,
    component: 'Input'
  },
  {
    label: '状态',
    name: 'status',
    rules: SELECT_REQUIRED,
    component: 'Select',
    componentProps: {
      options: OPEN_CLOSE
    }
  }
]

/**
 * 表格数据
 * @param optionRender - 渲染操作函数
 */
export const tableColumns = (optionRender: ITableOptions<IRowData>): ITableColumn => {
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
      title: '姓名',
      dataIndex: 'real_name',
      width: 400
    },
    {
      title: '角色',
      dataIndex: 'roles_name',
      width: 400
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      width: 400
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      width: 400
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 200,
      render: (value: boolean) => (
        <span>{ value ? '开启' : '关闭' }</span>
      )
    },
    {
      title: '操作',
      dataIndex: 'operate',
      width: 200,
      fixed: 'right',
      render: (value, record) => optionRender(value, record as IRowData)
    },
  ]
}