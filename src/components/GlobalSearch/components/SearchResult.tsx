import type { ISearchMenuValue } from '@/menus/utils/helper'
import { Icon } from '@iconify/react'
import { useNavigate } from 'react-router-dom'

interface IProps {
  list: ISearchMenuValue[]; // 列表
  active: string; // 选中值
  onCancel: () => void; // 关闭模态框
  changActive: (value: string) => void; // 更改选中值
}

function SearchResult(props: IProps) {
  const { list, active, onCancel, changActive } = props
  const navigate = useNavigate()

  /**
   * 点击菜单跳转页面
   * @param key - 唯一值
   */
  const onclick = (key: string) => {
    navigate(key)
    onCancel()
  }

  /**
   * 鼠标进入事件
   * @param key - 唯一值
   */
  const onMouseEnter = (key: string) => {
    changActive(key)
  }

  return (
    <>
      {
        !list?.length &&
        <div
          className="flex flex-col items-center pt-5 text-warm-gray-400"
        >
          <Icon
            className="text-40px"
            icon="mdi:archive-cancel-outline"
          />
          <span className="mt-1">暂无搜索结构</span>
        </div>
      }

      {
        list?.length > 0 &&
        <div className="mt-5">
          {
            list.map(item => (
            <div
              key={item.key}
              className={`
                h-56px
                mt-8px
                px-14px
                rounded-4px
                cursor-pointer
                flex
                items-center
                justify-between
                shadow-md
                border
                border-light-500
                ${active === item.key ? 'bg-blue-500 text-white' : ''}
              `}
              onClick={() => onclick(item.key)}
              onMouseEnter={() => onMouseEnter(item.key)}
            >
            <div className="flex items-center">
              <Icon className="text-lg mr-1" icon="gg:menu-boxed" />
              <span>{ item.label }</span>
              </div>
              <Icon className="icon text-20px p-2px mr-5px" icon="ant-design:enter-outlined" />
            </div>
          )) }
        </div>
      }
    </>
  )
}

export default SearchResult