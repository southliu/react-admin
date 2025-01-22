import type { MenuProps } from 'antd';
import type { SideMenu } from '#/public';
import { useCallback, useEffect, useState } from 'react';
import { Menu } from 'antd';
import { Icon } from '@iconify/react';
import { setTitle } from '@/utils/helper';
import { getTabTitle } from '../utils/helper';
import { useTranslation } from 'react-i18next';
import { useCommonStore } from '@/hooks/useCommonStore';
import { useNavigate, useLocation } from 'react-router-dom';
import { useMenuStore, useTabsStore } from '@/stores';
import {
  filterMenus,
  getFirstMenu,
  getMenuByKey,
  getMenuName,
  getOpenMenuByRouter,
  handleFilterMenus,
  splitPath
} from '@/menus/utils/helper';
import styles from '../index.module.less';
import Logo from '@/assets/images/logo.svg';

function LayoutMenu() {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const { pathname, search } = useLocation();
  const [menus, setMenus] = useState<SideMenu[]>([]);
  // 获取当前语言
  const currentLanguage = i18n.language;

  const {
    tabs,
    addTabs,
    setNav,
    setActiveKey
  } = useTabsStore(state => state);
  const {
    setOpenKeys,
    setSelectedKeys,
    toggleCollapsed
  } = useMenuStore(state => state);
  const {
    isMaximize,
    isCollapsed,
    isPhone,
    openKeys,
    selectedKeys,
    permissions,
    menuList
  } = useCommonStore();

  // 处理默认展开
  useEffect(() => {
    const newOpenKey = getOpenMenuByRouter(pathname);
    setOpenKeys(newOpenKey);
    setSelectedKeys(pathname);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  /**
   * 设置浏览器标签
   * @param list - 菜单列表
   * @param path - 路径
   */
  const handleSetTitle = useCallback((list: SideMenu[], path: string) => {
    let title = getMenuName(list, path, i18n.language);
    if (!title) {
      const path = `${pathname}${search || ''}`;
      // 通过路由获取标签名
      title = getTabTitle(tabs, path);
    }
    if (title) setTitle(t, title);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  useEffect(() => {
    handleSetTitle(menuList, pathname);
  }, [pathname, menuList, handleSetTitle]);

  /**
   * 转换菜单icon格式
   * @param menus - 菜单
   */
  const filterMenuIcon = useCallback((menus: SideMenu[]) => {
    for (let i = 0; i < menus.length; i++) {
      if (menus[i]?.icon) {
        menus[i].icon = (
          <Icon icon={menus[i].icon as string} />
        );
      }

      if (menus[i]?.children?.length) {
        filterMenuIcon(menus[i].children as SideMenu[]);
      }
    }
  }, []);

  // 过滤没权限菜单
  useEffect(() => {
    if (permissions.length > 0) {
      const newMenus = filterMenus(menuList, permissions);
      filterMenuIcon(newMenus);
      setMenus(newMenus || []);
    }
  }, [filterMenuIcon, permissions, currentLanguage, menuList]);

  /**
   * 处理跳转
   * @param path - 路径
   */
  const goPath = (path: string) => {
    navigate(path);
    const menuByKeyProps = { menus, permissions, key: path };
    const newTab = getMenuByKey(menuByKeyProps);
    if (newTab) {
      setActiveKey(newTab.key);
      setNav(newTab.nav);
      addTabs(newTab);
    }
  };

  /**
   * 点击菜单
   * @param e - 菜单事件
   */
  const onClick: MenuProps['onClick'] = e => {
    goPath(e.key);
    if (isPhone) hiddenMenu();
  };

  /**
   * 对比当前展开目录是否是同一层级
   * @param arr - 当前展开目录
   * @param lastArr - 最后展开的目录
   */
  const diffOpenMenu = (arr: string[], lastArr: string[]) => {
    let result = true;

    for (let j = 0; j < arr.length; j++) {
      if (arr[j] !== lastArr[j]) {
        result = false;
        break;
      }
    }

    return result;
  };

  /**
   * 展开/关闭回调
   * @param openKeys - 展开键值
   */
  const onOpenChange = (openKeys: string[]) => {
    const newOpenKey: string[] = [];
    let last = ''; // 最后一个目录结构

    // 当目录有展开值
    if (openKeys.length > 0) {
      last = openKeys[openKeys.length - 1];
      const lastArr: string[] = splitPath(last);
      newOpenKey.push(last);

      // 对比当前展开目录是否是同一层级
      for (let i = openKeys.length - 2; i >= 0; i--) {
        const arr = splitPath(openKeys[i]);
        const hasOpenKey = diffOpenMenu(arr, lastArr);
        if (hasOpenKey) newOpenKey.unshift(openKeys[i]);
      }
    }

    setOpenKeys(newOpenKey);
  };

  /** 点击logo */
  const onClickLogo = () => {
    const firstMenu = getFirstMenu(menus, permissions);
    goPath(firstMenu);
    if (isPhone) hiddenMenu();
  };

  /** 隐藏菜单 */
  const hiddenMenu = () => {
    toggleCollapsed(true);
  };

  return (
    <>
      <div
        className={`
          transition-all
          overflow-auto
          z-2
          ${styles.menu}
          ${isCollapsed ? styles['menu-close'] : ''}
          ${isMaximize || (isPhone && isCollapsed) ? styles['menu-none'] : ''}
          ${isPhone ? '!z-1002' : ''}
        `}
      >
        <div
          className={`
            text-white
            flex
            content-center
            px-5
            py-2
            cursor-pointer
            ${isCollapsed ? 'justify-center' : ''}
          `}
          onClick={onClickLogo}
        >
          <img
            src={Logo}
            width={30}
            height={30}
            className="object-contain"
            alt="logo"
          />

          <span className={`
            text-white
            ml-3
            text-xl
            font-bold
            truncate
            ${isCollapsed ? 'hidden' : ''}
          `}>
            { t('public.currentName') }
          </span>
        </div>

        <Menu
          id="layout-menu"
          className="z-1000"
          selectedKeys={[selectedKeys]}
          openKeys={openKeys}
          mode="inline"
          theme="dark"
          inlineCollapsed={isPhone ? false : isCollapsed}
          items={handleFilterMenus(menus)}
          onClick={onClick}
          onOpenChange={onOpenChange}
        />
      </div>

      {
        isPhone && !isCollapsed &&
        <div
          className={`
            ${styles.cover}
            fixed
            w-full
            h-full
            bg-gray-500
            bg-opacity-10
            z-1001
          `}
          onClick={hiddenMenu}
        />
      }
    </>
  );
}

export default LayoutMenu;
