import { Tooltip } from 'antd'
import { Icon } from '@iconify/react'
import { useEffect, useState } from 'react'

type IType = 'dark' | 'light'

const key = 'theme'

function Theme() {
  const themeCache = (localStorage.getItem(key) || 'light') as IType
  const [theme, setTheme] = useState<IType>(themeCache)

  useEffect(() => {
    if (!themeCache) {
      localStorage.setItem(key, 'light')
    }
    if (themeCache === 'dark') {
      document.body.className = 'theme-dark'
    }
  }, [themeCache])

  const onChange = (type: IType) => {
    localStorage.setItem(key, type)
    setTheme(type)

    switch (type) {
      case 'dark':
        document.body.className = 'theme-dark'
        break

      default:
        document.body.className = 'theme-primary'
        break
    }
  }

  return (
    <Tooltip title='主题模式'>
      <div className="flex items-center justify-center text-lg mr-4 cursor-pointer">
        {
          theme === 'light' &&
          <Icon
            icon="mdi-white-balance-sunny"
            onClick={() => onChange('dark')}
          />
        }
        {
          theme !== 'light' &&
          <Icon
            icon="mdi-moon-waning-crescent"
            onClick={() => onChange('light')}
          />
        }
      </div>
    </Tooltip>
  )
}

export default Theme