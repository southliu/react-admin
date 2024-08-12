import type { AppDispatch } from '@/stores';
import { getFirstMenu, getMenuByKey } from '@/menus/utils/helper';
import { addTabs, setActiveKey } from '@/stores/tabs';
import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useCommonStore } from '@/hooks/useCommonStore';
import styles from './all.module.less';

function Forbidden() {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();
  const { t } = useTranslation();
  const { permissions, menuList } = useCommonStore();

  /** 跳转首页 */
  const goIndex = () => {
    const firstMenu = getFirstMenu(menuList, permissions);
    navigate(firstMenu);
    const menuByKeyProps = { menus: menuList, permissions, key: firstMenu };
    const newItems = getMenuByKey(menuByKeyProps);
    if (newItems?.key) {
      dispatch(setActiveKey(newItems.key));
      dispatch(addTabs(newItems));
    }
  };

  return (
    <div className="absolute left-50% top-50% -translate-x-1/2 -translate-y-1/2 text-center">
      <h1 className={`${styles.animation} w-full text-6rem font-bold`}>
        403
      </h1>
      <p className="w-full text-20px font-bold mt-15px text-dark-700">
        { t('public.notPermissionMessage') }
      </p>
      <Button className="mt-25px margin-auto" onClick={goIndex}>
        { t('public.returnHome') }
      </Button>
    </div>
  );
}

export default Forbidden;
