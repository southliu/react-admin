import type { IFormList } from '#/form'
import type { ITableColumn, ITableOptions } from '#/public'
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
      render: (value: unknown, record: object) => optionRender(value, record)
    },
  ]
}

// 新增数据
export const createList: IFormList[] = [
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