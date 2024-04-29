import type { FormList } from '#/form';
import type { TFunction } from 'i18next';
import type { TableColumn, TableOptions } from '#/public';
import { FORM_REQUIRED } from '@/utils/config';
import { OPEN_CLOSE } from '@/utils/constants';

// 搜索数据
export const searchList = (t: TFunction): FormList[] => [
  {
    label: t('system.age'),
    name: 'age',
    component: 'InputNumber'
  },
  {
    label: t('public.name'),
    name: 'keyword',
    component: 'Input'
  }
];

/**
 * 表格数据
 * @param optionRender - 渲染操作函数
 */
 export const tableColumns = (t: TFunction, optionRender: TableOptions<object>): TableColumn => {
  return [
    {
      title: 'ID',
      dataIndex: 'id',
      width: 400,
      fixed: 'left'
    },
    {
      title: t('login.username'),
      dataIndex: 'username',
      width: 400,
      fixed: 'left'
    },
    {
      title: t('public.name'),
      dataIndex: 'real_name',
      width: 400
    },
    {
      title: t('system.role'),
      dataIndex: 'roles_name',
      width: 400
    },
    {
      title: t('system.phone'),
      dataIndex: 'phone',
      width: 400
    },
    {
      title: t('system.state'),
      dataIndex: 'status',
      width: 200,
      render: (value: boolean) => (
        <span>{ value ? t('public.open') : t('public.close') }</span>
      )
    },
    {
      title: t('public.operate'),
      dataIndex: 'operate',
      width: 200,
      fixed: 'right',
      render: (value: unknown, record: object) => optionRender(value, record)
    },
  ];
};

// 新增数据
export const createList = (t: TFunction): FormList[] => [
  {
    label: t('login.username'),
    name: 'username',
    rules: FORM_REQUIRED,
    component: 'Input'
  },
  {
    label: t('public.name'),
    name: 'real_name',
    rules: FORM_REQUIRED,
    component: 'Input'
  },
  {
    label: t('system.role'),
    name: 'roles_name',
    rules: FORM_REQUIRED,
    component: 'Input'
  },
  {
    label: t('system.state'),
    name: 'status',
    rules: FORM_REQUIRED,
    component: 'Select',
    componentProps: {
      options: OPEN_CLOSE(t)
    }
  }
];