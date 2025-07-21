import type { TabsData } from '@/stores/tabs';
import { useTranslation } from 'react-i18next';
import { getMenuByKey, getMenuName, getOpenMenuByRouter } from '@/menus/utils/helper';
import { ADD_TITLE, EDIT_TITLE } from '@/utils/config';
import { setTitle } from '@/utils/helper';
import { useCommonStore } from './useCommonStore';
import { useLocation } from 'react-router-dom';
import { useCallback, useEffect } from 'react';
import { useActivate } from 'react-activation';
import { useMenuStore, useTabsStore } from '@/stores';

interface Props {
  fatherPath: string;
  zhTitle: string;
  enTitle: string;
  name?: string;
}

/**
 * 单标签设置
 * @param fatherPath - 父级路径
 * @param title - 标题
 * @param name - 名称
 */
export function useSingleTab(props: Props) {
  const { fatherPath, zhTitle, enTitle, name } = props;
  const { t, i18n } = useTranslation();
  const { pathname, search } = useLocation();
  const { setOpenKeys, setSelectedKeys } = useMenuStore((state) => state);
  const { isPhone, isCollapsed, menuList, permissions } = useCommonStore();
  const { activeKey, addTabs, setNav, setActiveKey } = useTabsStore((state) => state);

  // 处理默认展开
  useEffect(() => {
    const title = handleGetTitle();
    setTitle(t, title);
    const newOpenKey = getOpenMenuByRouter(fatherPath);
    if (!isPhone && !isCollapsed) {
      setOpenKeys(newOpenKey);
      setSelectedKeys(fatherPath);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * 添加标签
   * @param path - 路径
   */
  const handleAddTab = useCallback(
    (path = pathname) => {
      // 当值为空时匹配路由
      if (path === '/' || activeKey !== pathname) return;
      const title = i18n.language === 'zh' ? zhTitle : enTitle;
      const currentTitle = handleGetTitle();
      const menuByKeyProps = {
        menus: menuList,
        permissions,
        key: fatherPath,
      };
      const newNav = getMenuByKey(menuByKeyProps)?.nav || [];
      newNav.push({
        label: title,
        labelZh: zhTitle,
        labelEn: enTitle,
      });

      const newTab: TabsData = {
        label: currentTitle,
        labelEn: enTitle,
        labelZh: zhTitle,
        key: pathname,
        nav: newNav,
        urlParams: search,
      };
      setActiveKey(newTab.key);
      setNav(newTab.nav);
      addTabs(newTab);
      console.log('activeKey:', activeKey);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pathname, search],
  );

  useEffect(() => {
    handleAddTab();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useActivate(() => {
    handleAddTab();
  });

  /** 获取路由对应名称 */
  const getNameByRoute = (): string => {
    const route = search?.substring(1, search.length);
    const list = route?.split('&');

    for (let i = 0; i < list?.length; i++) {
      const item = list[i];
      const arr = item?.split('=');
      const key = arr?.[0];
      const value = arr?.[1];
      if (key === name) {
        return value;
      }
    }

    return '';
  };

  /** 设置标题 */
  const handleGetTitle = () => {
    let result = '',
      newUpdateTitle = '',
      newCreateTitle = '';
    const routeName = getNameByRoute();
    const title = i18n.language === 'zh' ? zhTitle : enTitle;

    if (!title) {
      const menuName = getMenuName(menuList, fatherPath, i18n.language);
      newCreateTitle = `${title || ADD_TITLE(t)}${menuName}`;
      newUpdateTitle = `${EDIT_TITLE(t, routeName, menuName)}`;
    } else {
      const label = routeName ? `(${routeName})` : '';
      newCreateTitle = `${title || ADD_TITLE(t)}${label}`;
      newUpdateTitle = `${title}${label}`;
    }
    result = routeName ? newUpdateTitle : newCreateTitle;
    return result;
  };

  return [];
}
