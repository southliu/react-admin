import { Menu } from 'antd'
import {
  RedoOutlined,
  CloseOutlined,
  VerticalAlignTopOutlined,
  VerticalAlignMiddleOutlined
} from '@ant-design/icons'

function DropdownMenu() {
  return (
    <Menu
      items={[
        {
          key: '1',
          label: '重新加载',
          icon: <RedoOutlined className="mr-5px transform rotate-270" />
        },
        {
          key: '2',
          label: '关闭标签',
          icon: <CloseOutlined className="mr-5px" />
        },
        {
          key: '3',
          label: '关闭其他',
          icon: <VerticalAlignMiddleOutlined className="mr-5px transform rotate-90" />
        },
        {
          key: '4',
          label: '关闭左侧',
          icon: <VerticalAlignTopOutlined className="mr-5px transform rotate-270" />
        },
        {
          key: '5',
          label: '关闭右侧',
          icon: <VerticalAlignTopOutlined className="mr-5px transform rotate-90" />
        }
      ]}
    />
  )
}

export default DropdownMenu