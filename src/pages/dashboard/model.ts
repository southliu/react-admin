import type { FormList } from "#/form";
import type { TFunction } from "i18next";
import { getGames } from '@/servers/platform/game';

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
    label: t('dashboard.gameID') + '2',
    name: 'keyword2',
    wrapperCol: 200,
    component: 'ApiSelect',
    componentProps: {
      api: getGames,
      params: {
        isAll: true
      },
      fieldNames: {
        label: 'name',
        value: 'id'
      }
    }
  },
];
