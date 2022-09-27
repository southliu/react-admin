import type { IFormList } from "#/form"
import { DATE_FORMAT } from "@/utils/constants"

// 搜索数据
export const searchList: IFormList[] = [
  {
    label: '日期',
    name: 'pay_date',
    component: 'DatePicker',
    componentProps: {
      allowClear: false,
      format: DATE_FORMAT
    }
  },
  {
    label: '游戏ID',
    name: 'game_ids',
    wrapperCol: 250,
    component: 'GameSelect',
  },
  {
    label: '合作公司',
    name: 'partners',
    wrapperCol: 300,
    component: 'PartnerSelect'
  },
  {
    label: '全服充值',
    name: 'all_pay',
    wrapperCol: 15,
    component: 'Checkbox'
  },
  {
    label: '注册',
    name: 'register',
    wrapperCol: 15,
    component: 'Checkbox'
  }
]