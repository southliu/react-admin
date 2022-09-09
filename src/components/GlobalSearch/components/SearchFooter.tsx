import { Icon } from '@iconify/react'
import styles from '../index.module.less'

function SearchFooter() {
  return (
    <div className="flex items-center text-dark-50">
      <span className="mr-14px flex items-center">
        <Icon className={`${styles.icon} text-20px p-2px mr-5px`} icon="ant-design:enter-outlined" />
        <span>确认</span>
      </span>
      <span className="mr-14px flex items-center">
        <Icon className={`${styles.icon} text-20px p-2px mr-5px`} icon="mdi-arrow-up-thin" />
        <Icon className={`${styles.icon} text-20px p-2px mr-5px`} icon="mdi-arrow-down-thin" />
        <span>切换</span>
      </span>
      <span className="flex items-center">
        <Icon className={`${styles.icon} text-20px p-2px mr-5px`} icon="mdi:keyboard-esc" />
        <span>关闭</span>
      </span>
    </div>
  )
}

export default SearchFooter