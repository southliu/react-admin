import styles from './index.module.less'
import Forbidden from '@/pages/403'

interface IProps {
  isPermission?: boolean;
  topSlot?: JSX.Element;
  children: JSX.Element;
  footerSlot?: JSX.Element;
}

function BasicContent(props: IProps) {
  const {
    isPermission,
    topSlot,
    children,
    footerSlot
  } = props

  return (
    <div
      className={`h-full px-2 py-3 box-border ${styles.bg}`}
    >
      {
        isPermission !== false &&
        <div id="container" className="h-full bg-white relative overflow-auto">
          <div id="top">
            { topSlot }
          </div>
    
          <div id="content" className="p-5 overflow-auto">
            { children }
          </div>
    
          <div id="footer">
            { footerSlot }
          </div>
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