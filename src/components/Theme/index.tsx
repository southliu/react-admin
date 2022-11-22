import type { AppDispatch } from '@/stores'
import { IThemeType, setThemeValue } from '@/stores/public'
import { Tooltip } from 'antd'
import { Icon } from '@iconify/react'
import { useEffect, useState } from 'react'
import { THEME_KEY } from '@/utils/config'
import { useDispatch } from 'react-redux'

function Theme() {
  const dispatch: AppDispatch = useDispatch()
  const themeCache = (localStorage.getItem(THEME_KEY) || 'light') as IThemeType
  const [theme, setTheme] = useState<IThemeType>(themeCache)

  useEffect(() => {
    if (!themeCache) {
      localStorage.setItem(THEME_KEY, 'light')
    }
    if (themeCache === 'dark') {
      document.body.className = 'theme-dark'
    }
    dispatch(setThemeValue(themeCache === 'dark' ? 'dark' : 'light'))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [themeCache])

  const onChange = (type: IThemeType) => {
    localStorage.setItem(THEME_KEY, type)
    dispatch(setThemeValue(type))
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