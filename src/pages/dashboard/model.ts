import type { ApiFn, FormList } from "#/form";
import type { TFunction } from "i18next";
import { getGames } from '@/servers/platform/game';
import { getPartnerDemo } from "@/servers/platform/partner";

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
    wrapperWidth: 200,
    component: 'GameSelect',
  },
  {
    label: t('dashboard.cooperativeCompany'),
    name: 'partners',
    wrapperWidth: 200,
    component: 'PartnerSelect'
  },
  {
    label: t('dashboard.gameID') + '2',
    name: 'keyword2',
    wrapperWidth: 200,
    component: 'ApiSelect',
    componentProps: {
      api: getGames as ApiFn,
      params: {
        isAll: true
      },
      fieldNames: {
        label: 'name',
        value: 'id'
      }
    }
  },
  {
    label: t('dashboard.cooperativeCompany') + '2',
    name: 'partners',
    wrapperWidth: 200,
    component: 'ApiSelect',
    componentProps: {
      api: getPartnerDemo as ApiFn,
      params: [
        '/platform/partner',
        {
          isAll: true
        }
      ],
      fieldNames: {
        label: 'name',
        value: 'id'
      }
    }
  },
];
