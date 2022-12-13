import { useTimes } from '@/hooks/useTime'
import { useNavigate } from 'react-router-dom'
import styles from './index.module.less'

const DataHeaderTime = () => {
	const { time } = useTimes()

	return <span className={styles.time}>当前时间：{time}</span>
}

function Header() {
  const navigate = useNavigate()

  /** 返回首页 */
  const goBack = () => {
    navigate('/dashboard')
  }

  return (
    <div className={styles.header}>
      <div className={styles.left}>
        <span className={styles.screening} onClick={goBack}>
          首页
        </span>
      </div>
      <div className={styles.center}>
        <div className={styles.title}>
          <span>智慧旅游可视化大数据展示平台</span>
          <div className={styles.warning}>平台高峰预警信息（1条）</div>
        </div>
      </div>
      
      <div className={styles.right}>
        <span className={styles.download}>统计报告</span>
        <DataHeaderTime />
      </div>
    </div>
  )
}

export default Header