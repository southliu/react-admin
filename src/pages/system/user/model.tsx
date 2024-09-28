import type { FormList, SearchList } from '#/form';
import type { TFunction } from 'i18next';
import type { TableColumn, TableOptions } from '#/public';
import { FORM_REQUIRED } from '@/utils/config';
import { OPEN_CLOSE } from '@/utils/constants';

const otherSearch: SearchList[] = [];

for (let i = 0; i < 32; i++) {
  otherSearch.push({
    label: `名称${i + 1}`,
    name: `label${i + 1}`,
    component: 'Input',
    componentProps: {
      maxLength: 200
    }
  });
}

// 搜索数据
export const searchList = (t: TFunction): SearchList[] => [
  {
    label: t('system.age'),
    name: 'age',
    component: 'InputNumber'
  },
  {
    label: t('public.name'),
    name: 'keyword',
    component: 'Input'
  },
  ...otherSearch,
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
      width: 200,
      fixed: 'left'
    },
    {
      title: t('login.username'),
      dataIndex: 'username',
      width: 200,
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
