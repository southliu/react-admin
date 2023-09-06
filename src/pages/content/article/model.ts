import type { FormList } from "#/form";
import type { TFunction } from "i18next";
import type { TableColumn, TableOptions } from '#/public';
import { INPUT_REQUIRED } from '@/utils/config';
import CustomizeInput from './components/CustomizeInput';

// 搜索数据
export const searchList = (t: TFunction): FormList[] => [
  {
    label: t('login.username'),
    name: 'username',
    component: 'Input'
  },
  {
    label: t('content.title'),
    name: 'title',
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
      title: t('content.title'),
      dataIndex: 'title',
      width: 400
    },
    {
      title: t('content.content'),
      dataIndex: 'content',
      width: 400
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
    rules: INPUT_REQUIRED(t),
    component: 'Input'
  },
  {
    label: '嵌套数据',
    name: ['user', 'name', 'test'],
    rules: INPUT_REQUIRED(t),
    component: 'Input'
  },
  {
    label: t('content.title'),
    name: 'title',
    rules: INPUT_REQUIRED(t),
    component: 'customize',
    render: CustomizeInput
  },
  {
    label: t('content.content'),
    name: 'content',
    component: 'Editor'
  }
];