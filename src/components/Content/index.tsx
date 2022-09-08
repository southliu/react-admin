import styles from './index.module.less'

interface IProps {
  topSlot?: JSX.Element;
  contentSlot: JSX.Element;
  footerSlot?: JSX.Element;
}

function Content(props: IProps) {
  const { topSlot, contentSlot, footerSlot } = props

  return (
    <div
      className={`h-full px-2 py-3 box-border ${styles.bg}`}
    >
      <div id="container" className="h-full bg-white relative overflow-auto">
        <div id="top">
          { topSlot }
        </div>
  
        <div id="content" className="p-5 overflow-auto">
          { contentSlot }
        </div>
  
        <div id="footer">
          { footerSlot }
        </div>
      </div>
    </div>
  )
}

export default Content