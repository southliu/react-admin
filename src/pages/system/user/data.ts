import type { IFormList } from '#/form'
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

// 表格数据
// export const tableColumns: VxeGridPropTypes.Columns = [
//   {
//     title: 'ID',
//     field: 'id'
//   },
//   {
//     title: '用户名',
//     field: 'username'
//   },
//   {
//     title: '姓名',
//     field: 'real_name'
//   },
//   {
//     title: '角色',
//     field: 'roles_name'
//   },
//   {
//     title: '手机号',
//     field: 'phone'
//   },
//   {
//     title: '邮箱',
//     field: 'email'
//   },
//   {
//     title: '状态',
//     field: 'status',
//     slots: {
//       default: ({ row }) => [
//         h('span', { innerHTML: row.status ? '开启' : '关闭' })
//       ]
//     }
//   },
//   {
//     title: '操作',
//     field: 'operate',
//     minWidth: 160,
//     showOverflow: false,
//     slots: { default: 'operate' }
//   },
// ]