import type { IFormList } from "#/form"
import type { ITableColumn, ITableOptions } from '#/public'
import { INPUT_REQUIRED, SELECT_REQUIRED } from '@/utils/config'
import { MENU_ACTIONS, MENU_MODULE, MENU_STATUS } from '@/utils/constants'

// 搜索数据
export const searchList: IFormList[] = [
  {
    label: '状态',
    name: 'status',
    component: 'Select',
    componentProps: {
      options: MENU_STATUS
    }
  },
  {
    label: '模块',
    name: 'module',
    wrapperCol: 170,
    component: 'Select',
    componentProps: {
      options: MENU_MODULE
    }
  },
  {
    label: '控制器',
    name: 'controller',
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
      width: 200
    },
    {
      title: '名称',
      dataIndex: 'name',
      width: 200
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 200
    },
    {
      title: '模块',
      dataIndex: 'module',
      width: 200
    },
    {
      title: '控制器',
      dataIndex: 'controller',
      width: 200
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      width: 200
    },
    {
      title: '更新时间',
      dataIndex: 'updated_at',
      width: 200
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
export const createList: (id: string) => IFormList[] = id => [
  {
    label: '名称',
    name: 'name',
    rules: INPUT_REQUIRED,
    component: 'Input'
  },
  {
    label: '状态',
    name: 'status',
    rules: SELECT_REQUIRED,
    component: 'Select',
    componentProps: {
      options: MENU_STATUS
    }
  },
  {
    label: '模块',
    name: 'module',
    rules: SELECT_REQUIRED,
    component: 'Select',
    componentProps: {
      options: MENU_MODULE
    }
  },
  {
    label: '控制器',
    name: 'controller',
    rules: INPUT_REQUIRED,
    component: 'Input'
  },
  {
    label: '创建菜单',
    name: 'actions',
    hidden: !!id,
    component: 'CheckboxGroup',
    componentProps: {
      options: MENU_ACTIONS
    }
  },
]