import { ThemeType, usePublicStore } from '@/stores/public';
import { Tooltip } from 'antd';
import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { THEME_KEY } from '@south/utils';

function Theme() {
  const { t } = useTranslation();
  const themeCache = (localStorage.getItem(THEME_KEY) || 'light') as ThemeType;
  const [theme, setTheme] = useState<ThemeType>(themeCache);
  const setThemeValue = usePublicStore(state => state.setThemeValue);

  useEffect(() => {
    if (!themeCache) {
      localStorage.setItem(THEME_KEY, 'light');
    }
    if (themeCache === 'dark') {
      document.body.className = 'theme-dark';
    }
    setThemeValue(themeCache === 'dark' ? 'dark' : 'light');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [themeCache]);

  /**
   * 处理更新
   * @param type - 主题类型
   */
  const onChange = (type: ThemeType) => {
    localStorage.setItem(THEME_KEY, type);
    setThemeValue(type);
    setTheme(type);

    switch (type) {
      case 'dark':
        document.body.className = 'theme-dark';
        break;

      default:
        document.body.className = 'theme-primary';
        break;
    }

    window.location.reload();
  };

  return (
    <Tooltip title={t('public.themes')}>
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
  );
}

export default Theme;
