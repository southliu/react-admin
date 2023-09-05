import type { FormList } from "#/form";
import type { TFunction } from "i18next";

// 搜索数据
export const searchList = (t: TFunction): FormList[] => [
  {
    label: t('public.date'),
    name: 'pay_date',
    component: 'RangePicker',
    componentProps: {
      allowClear: false,
    }
  },
  {
    label: t('dashboard.gameID'),
    name: 'game_ids',
    wrapperCol: 200,
    component: 'GameSelect',
  },
  {
    label: t('dashboard.cooperativeCompany'),
    name: 'partners',
    wrapperCol: 200,
    component: 'PartnerSelect'
  },
  {
    label: t('dashboard.fullServerRecharge'),
    name: 'all_pay',
    wrapperCol: 15,
    component: 'Checkbox'
  }
];