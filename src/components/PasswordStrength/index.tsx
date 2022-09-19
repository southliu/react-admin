import { useEffect, useState } from 'react'
import { useDebounceFn } from 'ahooks'

interface IProps {
  value: string;
}

/**
 * @description: 密码强度组件
 */
function PasswordStrength(props: IProps) {
  const { value } = props
  const [strength, setStrength] = useState(0)
  const arr = new Array(5).fill(0).map((item, index) => index + 1)

  /**
   * 密码强度判断
   * @param value - 值
   */
  const handleStrength = useDebounceFn((value: string) => {
    let level = 0
    if (/\d/.test(value)) level++ // 有数字强度加1
    if (/[a-z]/.test(value)) level++ // 有小写字母强度加1
    if (/[A-Z]/.test(value)) level++ // 有大写字母强度加1
    if (value.length > 10) level++ // 长度大于10强度加1
    if (/[\.\~\@\#\$\^\&\*]/.test(value)) level++ // 有以下特殊字符强度加1
    setStrength(level)
  }, { wait: 500 })

  // 监听传入值变化
  useEffect(() => {
    handleStrength.run(value)
  }, [value])

  return (
    <div className="flex items-center">
      {
        arr.map(item => (
          <div
            key={item}
            className={`
              w-19%
              h-5px
              mt-5px
              mr-1%
              rounded-10px
              bg-light-900
              ${item <= strength && strength > 3 ? '!bg-green-400' : ''}
              ${item <= strength && strength === 3 ? '!bg-yellow-400' : ''}
              ${item <= strength && strength < 3 ? '!bg-red-400' : ''}
            `}
          >
          </div>
        ))
      }
    </div>
  )
}

export default PasswordStrength