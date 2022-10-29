import { useLocation } from 'react-router-dom'
import Forbidden from '@/pages/403'
import KeepAlive from 'react-activation'
import styles from './index.module.less'

interface IProps {
  isPermission?: boolean;
  children: JSX.Element;
}

function BasicContent(props: IProps) {
  const { isPermission, children} = props
  const { pathname } = useLocation()

  return (
    <div className={`h-full p-10px box-border ${styles.bg}`}>
      {
        isPermission !== false &&
        <div
          id="content"
          className={`
            h-full
            bg-white
            relative
            overflow-auto
            box-border
            px-5
            pt-5
            pb-2
          `}
        >
          <KeepAlive id={pathname} name={pathname}>
            { children }
          </KeepAlive>
        </div>
      }
      {
        isPermission === false &&
        <Forbidden />
      }
    </div>
  )
}

export default BasicContent