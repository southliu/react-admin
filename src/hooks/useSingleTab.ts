import type { SideMenu } from '#/public';
import { useTranslation } from 'react-i18next';
import { getMenuName, getOpenMenuByRouter, handleFilterNav } from '@/menus/utils/helper';
import { ADD_TITLE, EDIT_TITLE } from '@/utils/config';
import { setTitle } from '@/utils/helper';
import { useCommonStore } from './useCommonStore';
import { useLocation } from 'react-router-dom';
import { useCallback, useEffect } from 'react';
import { useEffectOnActive } from 'keepalive-for-react';
import { useMenuStore, useTabsStore } from '@/stores';

/**
 * 单标签设置
 * @param fatherPath - 父级路径
 * @param name - 名称
 */
export function useSingleTab(
  fatherPath: string,
  title?: string,
  name = 'id'
  ) {
  const { t, i18n } = useTranslation();
  const { pathname, search } = useLocation();
  const { setOpenKeys, setSelectedKeys } = useMenuStore(state => state);
  const {
    addTabs,
    setNav,
    setActiveKey,
  } = useTabsStore(state => state);
  const {
    menuList,
    isPhone,
    isCollapsed
  } = useCommonStore();
  const uri = pathname + search;

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
  const handleAddTab = useCallback((path = pathname) => {
    // 当值为空时匹配路由
    if (path === '/') return;
    const title = handleGetTitle();
    const nav = handleGetNav();
    const newTab = {
      label: title,
      labelEn: title,
      labelZh: title,
      key: uri,
      nav: handleFilterNav(nav)
    };
    setActiveKey(newTab.key);
    setNav(newTab.nav);
    addTabs(newTab);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, search]);

  useEffect(() => {
    handleAddTab();
  }, [handleAddTab]);

  useEffectOnActive(() => {
    handleAddTab();
  }, false, []);

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
    let result = '', newUpdateTitle = '', newCreateTitle = '';
    const routeName = getNameByRoute();

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

  /** 获取导航栏 */
  const handleGetNav = () => {
    let result: string[] = [];

    const deepData = (list: SideMenu[], path: string, fatherName: string[] = []) => {
      if (result?.length || !list?.length || !path) return result;

      for (let i = 0; i < list?.length; i++) {
        const item = list[i];
        const newNav = fatherName.concat([item.label]);

        if (item.key === path) {
          result = newNav;
          return result;
        }

        if (item.children?.length) {
          const childResult = deepData(item.children, path, newNav);
          if (childResult?.length) {
            result = childResult;
            return result;
          }
        }
      }

      return result;
    };
    deepData(menuList, fatherPath);

    return result;
  };

  return [];
}
