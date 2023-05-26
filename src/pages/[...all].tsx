import type { AppDispatch } from '@/stores';
import { defaultMenus } from '@/menus';
import { getFirstMenu, getMenuByKey } from '@/menus/utils/helper';
import { addTabs, setActiveKey } from '@/stores/tabs';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useCommonStore } from '@/hooks/useCommonStore';
import styles from './all.module.less';

function NotFound() {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { permissions } = useCommonStore();

  /** 跳转首页 */
  const goIndex = () => {
    const firstMenu = getFirstMenu(defaultMenus, permissions);
    navigate(firstMenu);
    const menuByKeyProps = { menus: defaultMenus, permissions, key: firstMenu };
    const newItems = getMenuByKey(menuByKeyProps);
    if (newItems?.key) {
      dispatch(setActiveKey(newItems.key));
      dispatch(addTabs(newItems));
    }
  };
  
  return (
    <div className="absolute left-50% top-50% -translate-x-1/2 -translate-y-1/2 text-center">
      <h1 className={`${styles.animation} w-full text-6rem font-bold`}>
        404
      </h1>
      <p className="w-full text-20px font-bold mt-15px text-dark-700">
        当前页面无法访问，可能没权限或已删除
      </p>
      <Button className="mt-25px margin-auto" onClick={goIndex}>
        返回首页
      </Button>
    </div>
  );
}

export default NotFound;