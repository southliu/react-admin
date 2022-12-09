import { Tooltip } from 'antd'
import { Icon } from '@iconify/react'

interface IProps {
  isRefresh: boolean;
  onClick: () => void;
}

function TabRefresh(props: IProps) {
  const { isRefresh, onClick } = props

  return (
    <Tooltip title="重新加载" placement="bottom">
      <Icon
        className={`
          change
          flex
          items-center
          justify-center
          text-lg
          cursor-pointer
          ${isRefresh ? 'animate-spin pointer-events-none' : ''}
        `}
        onClick={() => onClick()}
        icon="ant-design:reload-outlined"
      />
    </Tooltip>
  )
}

export default TabRefresh