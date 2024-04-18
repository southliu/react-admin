import type { AppDispatch } from '@/stores';
import { useToken } from '@/hooks/useToken';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate, useOutlet } from 'react-router-dom';
import { Skeleton, message } from 'antd';
import { Icon } from '@iconify/react';
import { useDebounceFn } from 'ahooks';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { versionCheck } from './utils/helper';
import { getPermissions } from '@/servers/permissions';
import { useCommonStore } from '@/hooks/useCommonStore';
import { setPermissions, setUserInfo } from '@/stores/user';
import { setMenuList, toggleCollapsed, togglePhone } from '@/stores/menu';
import { getMenuList } from '@/servers/system/menu';
import Menu from './components/Menu';
import Header from './components/Header';
import Tabs from './components/Tabs';
import Forbidden from '@/pages/403';
import KeepAlive from 'react-activation';
import styles from './index.module.less';

function Layout() {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [getToken] = useToken();
  const { pathname, search } = useLocation();
  const uri = pathname + search;
  const token = getToken();
  const outlet = useOutlet();
  const [isLoading, setLoading] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();

  const {
    permissions,
    userId,
    isMaximize,
    isCollapsed,
    isPhone,
    isRefresh
  } = useCommonStore();

  /** 获取用户信息和权限 */
  const getUserInfo = useCallback(async () => {
    try {
      setLoading(true);
      const { code, data } = await getPermissions({ refresh_cache: false });
      if (Number(code) !== 200) return;
      const { user, permissions } = data;
      dispatch(setUserInfo(user));
      dispatch(setPermissions(permissions));
    } catch(err) {
      console.error('获取用户数据失败:', err);
      setPermissions([]);
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** 获取菜单数据 */
  const getMenuData = useCallback(async () => {
    try {
      setLoading(true);
      const { code, data } = await getMenuList();
      if (Number(code) !== 200) return;
      dispatch(setMenuList(data || []));
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // 如果没有token，则返回登录页
    if (!token) {
      navigate('/login');
    }

    // 当用户信息缓存不存在时则重新获取
    if (token && !userId) {
      getUserInfo();
      getMenuData();
    }
  }, [getUserInfo, getMenuData, navigate, token, userId]);
  
  // 监测是否需要刷新
  useEffect(() => {
    versionCheck(messageApi);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  /** 判断是否是手机端 */
  const handleIsPhone = useDebounceFn(() => {
    const isPhone = window.innerWidth <= 768;
    // 手机首次进来收缩菜单
    if (isPhone) dispatch(toggleCollapsed(true));
    dispatch(togglePhone(isPhone));
  }, { wait: 500 });

  // 监听是否是手机端
  useEffect(() => {
    window.addEventListener('resize', handleIsPhone.run());

    return () => {
      window.removeEventListener('resize', handleIsPhone.run());
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div id="layout">
      { contextHolder }
      <Menu />
      <div className={styles.layout_right}>
        <div
          id='header'
          className={`
            border-bottom
            transition-all
            ${styles.header}
            ${isCollapsed ? styles.headerCloseMenu : ''}
            ${isMaximize ? styles.headerNone : ''}
            ${isPhone ? `!left-0 z-999` : ''}
          `}
        >
          <Header />
          <Tabs />
        </div>
        <div
          id="layoutContent"
          className={`
            overflow-auto
            transition-all
            ${styles.con}
            ${isMaximize ? styles.conMaximize : ''}
            ${isCollapsed ? styles.conCloseMenu : ''}
            ${isPhone ? `!left-0 !w-full` : ''}
          `}
        >
          {
            isLoading &&
            permissions.length === 0 &&
            <Skeleton
              active
              className='p-30px'
              paragraph={{ rows: 10 }}
            />
          }
          {
            !isLoading &&
            permissions.length === 0 &&
            <Forbidden />
          }
          {
            isRefresh &&
            <div className={`
              absolute
              left-50%
              top-50%
              -rotate-x-50%
              -rotate-y-50%
            `}>
              <Icon
                className='text-40px animate-spin'
                icon='ri:loader-2-fill'
              />
            </div>
          }
          {
            permissions.length > 0 &&
            !isRefresh &&
            <KeepAlive id={uri} name={uri}>
              { outlet }
            </KeepAlive>
          }
        </div>
      </div>
    </div>
  );
}

export default Layout;