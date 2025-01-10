import type { TabsProps } from 'antd';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { getMenuByKey } from '@/menus/utils/helper';
import { message, Tabs, Dropdown } from 'antd';
import { useLocation, useNavigate } from 'react-router-dom';
import { useKeepAliveContext } from 'keepalive-for-react';
import { useDropdownMenu } from '../hooks/useDropdownMenu';
import { useCommonStore } from '@/hooks/useCommonStore';
import { useTranslation } from 'react-i18next';
import { useTabsStore } from '@/stores/tabs';
import { usePublicStore } from '@/stores';
import styles from '../index.module.less';
import TabRefresh from './TabRefresh';
import TabMaximize from './TabMaximize';
import TabOptions from './TabOptions';

function LayoutTabs() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const uri = pathname + search;
  const { refresh } = useKeepAliveContext();
  const [messageApi, contextHolder] = message.useMessage();
  const [time, setTime] = useState<null | NodeJS.Timeout>(null);
  const [isChangeLang, setChangeLang] = useState(false); // 是否切换语言
  const [refreshTime, seRefreshTime] = useState<null | NodeJS.Timeout>(null);
  const setRefresh = usePublicStore(state => state.setRefresh);
  const {
    tabs,
    isLock,
    activeKey, // 选中的标签值
    setActiveKey,
    addTabs,
    closeTabs,
    setNav,
    toggleLock,
    switchTabsLang,
  } = useTabsStore(state => state);

  // 获取当前语言
  const currentLanguage = i18n.language;

  const {
    permissions,
    isMaximize,
    menuList
  } = useCommonStore();

  /**
   * 添加标签
   * @param path - 路径
   */
  const handleAddTab = useCallback((path = uri) => {
    // 当值为空时匹配路由
    if (permissions.length > 0) {
      if (path === '/') return;
      const menuByKeyProps = {
        menus: menuList,
        permissions,
        key: path
      };
      const newItems = getMenuByKey(menuByKeyProps);
      if (newItems?.key) {
        setActiveKey(newItems.key);
        setNav(newItems.nav);
        addTabs(newItems);
        // 初始化Tabs时，更新文案语言类型
        setChangeLang(true);
      } else {
        setActiveKey(path);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [permissions, menuList]);

  useEffect(() => {
    handleAddTab();
  }, [handleAddTab, permissions, menuList]);

  useEffect(() => {
    switchTabsLang(currentLanguage);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLanguage]);

  useEffect(() => {
    if (isChangeLang) {
      switchTabsLang(currentLanguage);
      setChangeLang(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChangeLang]);

  useEffect(() => {
    return () => {
      if (time) {
        clearTimeout(time);
        setTime(null);
      }

      if (refreshTime) {
        clearTimeout(refreshTime);
        seRefreshTime(null);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // 当选中贴标签不等于当前路由则跳转
    if (activeKey !== uri) {
      const key = isLock ? activeKey : uri;
      handleAddTab(key);

      if (isLock) {
        navigate(key);
        toggleLock(false);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeKey, uri]);

  /**
   * 处理更改
   * @param key - 唯一值
   */
  const onChange = (key: string) => {
    navigate(key);
  };

  /**
   * 删除标签
   * @param targetKey - 目标key值
   */
  const remove = (targetKey: string) => {
    closeTabs(targetKey);
  };

  /**
   * 处理编辑
   * @param targetKey - 目标key值
   * @param action - 动作
   */
  const onEdit: TabsProps['onEdit'] = (targetKey, action) => {
    if (action === 'remove') {
      remove(targetKey as string);
    }
  };

  /**
   * 点击重新加载
   * @param key - 点击值
   */
   const onClickRefresh = useCallback((key = activeKey) => {
    // 如果key不是字符串格式则退出
    if (typeof key !== 'string') return;

    // 定时器没有执行时运行
    if (!time) {
      setRefresh(true);
      refresh(key);

      setTime(
        setTimeout(() => {
          messageApi.success({
            content: t('public.refreshSuccessfully'),
            key: 'refresh'
          });
          setRefresh(false);
          setTime(null);
        }, 100)
      );

      seRefreshTime(
        setTimeout(() => {
          seRefreshTime(null);
        }, 1000)
      );
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeKey, time]);

  // 渲染重新加载
  const RefreshRender = useMemo(() => {
    return (
      <TabRefresh
        isRefresh={!!refreshTime}
        onClick={onClickRefresh}
      />
    );
  }, [refreshTime, onClickRefresh]);

  // 渲染标签操作
  const TabOptionsRender = useMemo(() => {
    return (
      <TabOptions
        activeKey={activeKey}
        handleRefresh={onClickRefresh}
      />
    );
  }, [activeKey, onClickRefresh]);

  // 渲染最大化操作
  const TabMaximizeRender = useMemo(() => {
    return <TabMaximize />;
  }, []);

  // 标签栏功能
  const tabOptions = [
    { element: RefreshRender },
    { element: TabOptionsRender },
    { element: TabMaximizeRender }
  ];

  // 下拉菜单
  const dropdownMenuParams = { activeKey, handleRefresh: onClickRefresh };
  const [items, onClick] = useDropdownMenu(dropdownMenuParams);

  /** 二次封装标签 */
  const renderTabBar: TabsProps['renderTabBar'] = (tabBarProps, DefaultTabBar) => (
    <DefaultTabBar {...tabBarProps}>
      { node => (
        <Dropdown
          key={node.key}
          menu={{
            items: items(node.key as string),
            onClick: e => onClick(e.key, node.key as string)
          }}
          trigger={['contextMenu']}
        >
          <div className='mr-1px'>
            { node }
          </div>
        </Dropdown>
      ) }
    </DefaultTabBar>
  );

  return (
    <div className={`
      w-[calc(100%-5px)]
      flex
      items-center
      justify-between
      mx-2
      transition-all
      ${isMaximize ? styles['con-maximize'] : ''}
    `}>
      { contextHolder }
      {
        tabs.length > 0 ?
        <Tabs
          hideAdd
          className={`w-[calc(100%-110px)] h-30px py-0 ${styles['layout-tabs']}`}
          items={[...tabs]}
          onChange={onChange}
          activeKey={activeKey}
          type="editable-card"
          onEdit={onEdit}
          renderTabBar={renderTabBar}
        />
        : <span></span>
      }

      <div className='flex'>
        {
          tabOptions?.map((item, index) => (
            <div
              key={index}
              className={`
                left-divide-tab
                change
                divide-solid
                w-36px
                h-36px
                hover:opacity-70
                flex
                place-content-center
                items-center
              `}
            >
              { item.element }
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default LayoutTabs;
