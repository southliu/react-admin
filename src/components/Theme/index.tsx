import type { AppDispatch } from '@/stores';
import { ThemeType, setThemeValue } from '@/stores/public';
import { Tooltip } from 'antd';
import { Icon } from '@iconify/react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { THEME_KEY } from '@/utils/config';
import { useDispatch } from 'react-redux';
import { useAliveController } from 'react-activation';

function Theme() {
  const { t } = useTranslation();
  const { clear, refresh, getCachingNodes } = useAliveController();
  const dispatch: AppDispatch = useDispatch();
  const themeCache = (localStorage.getItem(THEME_KEY) || 'light') as ThemeType;
  const [theme, setTheme] = useState<ThemeType>(themeCache);

  useEffect(() => {
    if (!themeCache) {
      localStorage.setItem(THEME_KEY, 'light');
    }
    if (themeCache === 'dark') {
      document.body.className = 'theme-dark';
    }
    dispatch(setThemeValue(themeCache === 'dark' ? 'dark' : 'light'));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [themeCache]);

  /** 刷新全部keepalive */
  const refreshAllKeepalive = () => {
    const cacheNodes = getCachingNodes();

    for (let i = 0; i < cacheNodes?.length; i++) {
      const { name } = cacheNodes[i];
      if (name) refresh(name);
    }
  };

  /**
   * 处理更新
   * @param type - 主题类型
   */
  const onChange = (type: ThemeType) => {
    localStorage.setItem(THEME_KEY, type);
    dispatch(setThemeValue(type));
    setTheme(type);

    clear();
    refreshAllKeepalive();

    switch (type) {
      case 'dark':
        document.body.className = 'theme-dark';
        break;

      default:
        document.body.className = 'theme-primary';
        break;
    }
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