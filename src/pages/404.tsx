import { getFirstMenu, getMenuByKey } from '@/menus/utils/helper';
import { Button } from 'antd';
import { useTabsStore } from '@/stores';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useCommonStore } from '@/hooks/useCommonStore';
import styles from './all.module.less';

function NotFound() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { permissions, menuList } = useCommonStore();
  const { addTabs, setActiveKey } = useTabsStore();

  /** 跳转首页 */
  const goIndex = () => {
    const firstMenu = getFirstMenu(menuList, permissions);
    navigate(firstMenu);
    const menuByKeyProps = { menus: menuList, permissions, key: firstMenu };
    const newItems = getMenuByKey(menuByKeyProps);
    if (newItems?.key) {
      setActiveKey(newItems.key);
      addTabs(newItems);
    }
  };

  return (
    <div className="absolute left-50% top-50% -translate-x-1/2 -translate-y-1/2 text-center">
      <h1 className={`${styles.animation} w-full text-6rem font-bold`}>
        404
      </h1>
      <p className="w-full text-20px font-bold mt-15px">
        { t('public.notFindMessage') }
      </p>
      <Button className="mt-25px margin-auto" onClick={goIndex}>
        { t('public.returnHome') }
      </Button>
    </div>
  );
}

export default NotFound;
