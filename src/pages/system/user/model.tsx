import type { TFunction } from 'i18next';
import { OPEN_CLOSE } from '@/utils/constants';
import { getUserPageSelect } from '@/servers/system/user';

const otherSearch: BaseSearchList[] = [];

for (let i = 0; i < 32; i++) {
  otherSearch.push({
    label: `名称${i + 1}`,
    name: `label${i + 1}`,
    component: 'Input',
    componentProps: {
      maxLength: 200,
    },
  });
}

// 搜索数据
export const searchList = (t: TFunction): BaseSearchList[] => [
  {
    label: t('login.username'),
    name: 'username',
    wrapperWidth: 200,
    component: 'ApiPageSelect',
    componentProps: {
      api: getUserPageSelect as ApiFn,
      params: [
        {
          page: 1,
          pageSize: 10,
        },
      ],
    },
  },
  {
    label: t('system.age'),
    name: 'age',
    component: 'InputNumber',
  },
  {
    label: t('public.name'),
    name: 'keyword',
    component: 'Input',
  },
  ...otherSearch,
];

/**
 * 表格数据
 * @param optionRender - 渲染操作函数
 */
export const tableColumns = (t: TFunction, optionRender: TableOptions<object>): TableColumn[] => {
  return [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 80,
      fixed: 'left',
    },
    {
      title: t('login.username'),
      dataIndex: 'username',
      width: 100,
      fixed: 'left',
    },
    {
      title: t('public.name'),
      dataIndex: 'real_name',
      width: 200,
    },
    {
      title: 'URL',
      dataIndex: 'url',
      width: 400,
    },
    {
      title: t('system.role'),
      dataIndex: 'roles_name',
      width: 200,
    },
    {
      title: t('system.phone'),
      dataIndex: 'phone',
      width: 200,
    },
    {
      title: t('system.state'),
      dataIndex: 'status',
      width: 200,
      enum: [
        { label: '启用', value: 1, color: 'green' },
        { label: '禁用', value: 0, color: 'red' },
      ],
    },
    {
      title: t('system.module'),
      dataIndex: 'module',
      width: 200,
      enum: {
        user: '用户模块',
        menu: '菜单模块',
        role: '角色模块',
      },
    },
    {
      title: t('public.operate'),
      dataIndex: 'operate',
      width: 240,
      fixed: 'right',
      render: (value: unknown, record: object) => optionRender(value, record),
    },
  ];
};

// 新增数据
export const createList = (t: TFunction): BaseFormList[] => [
  {
    label: t('login.username'),
    name: 'username',
    rules: FORM_REQUIRED,
    component: 'Input',
  },
  {
    label: t('public.name'),
    name: 'real_name',
    rules: FORM_REQUIRED,
    component: 'Input',
  },
  {
    label: t('system.role'),
    name: 'roles_name',
    rules: FORM_REQUIRED,
    component: 'Input',
  },
  {
    label: t('system.state'),
    name: 'status',
    rules: FORM_REQUIRED,
    component: 'Select',
    componentProps: {
      options: OPEN_CLOSE(t),
    },
  },
];
