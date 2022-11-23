import type { MenuProps } from 'antd'
import type { AppDispatch, RootState } from '@/stores'
import { useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  closeLeft,
  closeOther,
  closeRight,
  closeTabs
} from '@/stores/tabs'
import {
  RedoOutlined,
  CloseOutlined,
  VerticalAlignTopOutlined,
  VerticalAlignMiddleOutlined
} from '@ant-design/icons'

enum ITabEnums {
  REFRESH = 'refresh', // 重新加载
  CLOSE_CURRENT = 'close_current', // 关闭当前
  CLOSE_OTHER = 'close_other', // 关闭其他
  CLOSE_LEFT = 'close_left', // 关闭左侧
  CLOSE_RIGHT = 'close_right' // 关闭右侧
}

interface IProps {
  activeKey: string;
  onOpenChange?: (open: boolean) => void;
  handleRefresh: (activeKey: string) => void;
}

export function useDropdownMenu(props: IProps) {
  const { activeKey, onOpenChange, handleRefresh } = props
  const { pathname } = useLocation()
  const dispatch: AppDispatch = useDispatch()
  const tabs = useSelector((state: RootState) => state.tabs.tabs)
  const index = tabs.findIndex(item => item.key === activeKey)

  // 菜单项
  const items: MenuProps['items'] = [
    {
      key: ITabEnums.REFRESH,
      label: '重新加载',
      disabled: activeKey !== pathname,
      icon: <RedoOutlined className="mr-5px transform rotate-270" />
    },
    {
      key: ITabEnums.CLOSE_CURRENT,
      label: '关闭标签',
      disabled: tabs.length <= 1,
      icon: <CloseOutlined className="mr-5px" />
    },
    {
      key: ITabEnums.CLOSE_OTHER,
      label: '关闭其他',
      disabled: tabs.length <= 1,
      icon: <VerticalAlignMiddleOutlined className="mr-5px transform rotate-90" />
    },
    {
      key: ITabEnums.CLOSE_LEFT,
      label: '关闭左侧',
      disabled: index === 0,
      icon: <VerticalAlignTopOutlined className="mr-5px transform rotate-270" />
    },
    {
      key: ITabEnums.CLOSE_RIGHT,
      label: '关闭右侧',
      disabled: index === tabs.length - 1,
      icon: <VerticalAlignTopOutlined className="mr-5px transform rotate-90" />
    }
  ]

  /** 点击菜单 */
  const onClick: MenuProps['onClick'] = e => {
    // 复原箭头
    onOpenChange?.(false)

    switch (e.key) {
      // 重新加载
      case ITabEnums.REFRESH:
        handleRefresh(activeKey)
        break

      // 关闭当前
      case ITabEnums.CLOSE_CURRENT:
        dispatch(closeTabs(activeKey))
        break

      // 关闭其他
      case ITabEnums.CLOSE_OTHER:
        dispatch(closeOther(activeKey))
        break

      // 关闭左侧
      case ITabEnums.CLOSE_LEFT:
        dispatch(closeLeft(activeKey))
        break

      // 关闭右侧
      case ITabEnums.CLOSE_RIGHT:
        dispatch(closeRight(activeKey))
        break

      default:
        break
    }
  }

  return [items, onClick] as const
}
