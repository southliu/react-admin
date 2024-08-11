import type { FormList, SearchList } from "#/form";
import type { TFunction } from "i18next";
import type { TableColumn, TableOptions } from '#/public';
import { FORM_REQUIRED } from '@/utils/config';
import { MENU_ACTIONS, MENU_MODULE, MENU_STATUS } from '@/utils/constants';
import { valueToLabel } from "@/utils/helper";

// 搜索数据
export const searchList = (t: TFunction): SearchList[] => [
  {
    label: t('system.state'),
    name: 'status',
    wrapperCol: 100,
    component: 'Select',
    componentProps: {
      options: MENU_STATUS(t)
    }
  },
  {
    label: t('system.module'),
    name: 'module',
    wrapperCol: 170,
    component: 'Select',
    componentProps: {
      options: MENU_MODULE(t)
    }
  },
  {
    label: t('system.controller'),
    name: 'controller',
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
      width: 200
    },
    {
      title: t('public.name'),
      dataIndex: 'name',
      width: 200
    },
    {
      title: t('system.state'),
      dataIndex: 'status',
      width: 200,
      render: (value: number) => (
        <span>{ valueToLabel(value, MENU_STATUS(t)) }</span>
      )
    },
    {
      title: t('system.module'),
      dataIndex: 'module',
      width: 200
    },
    {
      title: t('system.controller'),
      dataIndex: 'controller',
      width: 200
    },
    {
      title: t('public.creationTime'),
      dataIndex: 'created_at',
      width: 200
    },
    {
      title: t('public.updateTime'),
      dataIndex: 'updated_at',
      width: 200
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
export const createList = (t: TFunction, id: string): FormList[] => [
  {
    label: t('public.name'),
    name: 'name',
    rules: FORM_REQUIRED,
    component: 'Input'
  },
  {
    label: t('system.state'),
    name: 'status',
    rules: FORM_REQUIRED,
    component: 'Select',
    componentProps: {
      options: MENU_STATUS(t)
    }
  },
  {
    label: t('system.module'),
    name: 'module',
    rules: FORM_REQUIRED,
    component: 'Select',
    componentProps: {
      options: MENU_MODULE(t)
    }
  },
  {
    label: t('system.controller'),
    name: 'controller',
    rules: FORM_REQUIRED,
    component: 'Input'
  },
  {
    label: t('system.createMenu'),
    name: 'actions',
    hidden: !!id,
    component: 'CheckboxGroup',
    componentProps: {
      options: MENU_ACTIONS(t)
    }
  }
];
