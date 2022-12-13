import { useLayoutEffect, useRef } from 'react'
import Header from './components/Header'
// import AgeRatio from './components/AgeRatio'
// import AttractionRanking from './components/AttractionRanking'
// import MapChina from './components/MapChina'
// import SexRatio from './components/SexRatio'
// import TouristTrends from './components/TouristTrends'
// import VisitorStaistics from './components/VisitorStaistics'
import styles from './index.module.less'

function Page() {
  const screenRef = useRef<HTMLDivElement>(null)

  /**
   * 根据浏览器大小推断比例
   * @param width - 宽度
   * @param height - 高度
   */
  const getScale = (width = 1920, height = 1080) => {
    const currentWidth = window.innerWidth / width
    const currentHeight = window.innerHeight / height
    return currentWidth < currentHeight ? currentWidth : currentHeight
  }

  /** 浏览器监听resize事件 */
  const resize = () => {
    if (screenRef.current) {
      screenRef.current.style.transform = `scale(${getScale()})`
    }
  }

  useLayoutEffect(() => {
    if (screenRef.current) {
      screenRef.current.style.transform = `scale(${getScale()}) translate(-50%, -50%)`
      screenRef.current.style.width = `1920px`
      screenRef.current.style.height = `1080px`
    }
    // 为浏览器绑定事件
    window.addEventListener("resize", resize)
    return () => {
      window.removeEventListener("resize", resize)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className={styles.container}>
      <div ref={screenRef} className={styles.dataScreen}>
        <Header />
        {/* <MapChina />
        <VisitorStaistics />
        <SexRatio />
        <AttractionRanking />
        <AgeRatio />
        <TouristTrends /> */}
      </div>
    </div>
  )
}

export default Page