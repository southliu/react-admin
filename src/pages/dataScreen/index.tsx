import { useLayoutEffect, useRef } from 'react'
import Header from './components/Header'
import styles from './index.module.less'
import dataScreenTitle from './images/title.png'
import RealTimeAccessChart from './components/RealTimeAccessChart'
import MaleFemaleRatioChart from './components/MaleFemaleRatioChart'
import AgeRatioChart from './components/AgeRatioChart'

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

        <div className={styles.main}>
          <div className={styles.left}>
            <div className={styles.top}>
              <div className={styles.title}>
                <span>实时游客统计</span>
                <img src={dataScreenTitle} alt="title" />
              </div>
              <div className={styles.mainChart}>
                <RealTimeAccessChart />
              </div>
            </div>

            <div className={styles.center}>
              <div className={styles.title}>
                <span>男女比例</span>
                <img src={dataScreenTitle} alt="" />
              </div>
              <div className={styles.mainChart}>
                <MaleFemaleRatioChart />
              </div>
            </div>

            <div className={styles.bottom}>
              <div className={styles.title}>
                <span>年龄比例</span>
                <img src={dataScreenTitle} alt="" />
              </div>
              <div className={styles.mainChart}>
                <AgeRatioChart />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page