import styles from './index.module.less'
import Forbidden from '@/pages/403'

interface IProps {
  isPermission?: boolean;
  children: JSX.Element;
}

function BasicContent(props: IProps) {
  const { isPermission, children} = props

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
          { children }
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