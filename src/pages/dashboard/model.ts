import type { FormList } from "#/form"

// 搜索数据
export const searchList: FormList[] = [
  {
    label: '日期',
    name: 'pay_date',
    component: 'RangePicker',
    componentProps: {
      allowClear: false,
    }
  },
  {
    label: '游戏ID',
    name: 'game_ids',
    wrapperCol: 200,
    component: 'GameSelect',
  },
  {
    label: '合作公司',
    name: 'partners',
    wrapperCol: 200,
    component: 'PartnerSelect'
  },
  {
    label: '全服充值',
    name: 'all_pay',
    wrapperCol: 15,
    component: 'Checkbox'
  }
]