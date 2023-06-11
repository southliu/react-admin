import type { AppDispatch } from '@/stores';
import { Icon } from '@iconify/react';
import { useDispatch } from 'react-redux';
import { toggleMaximize } from '@/stores/tabs';
import { useCommonStore } from '@/hooks/useCommonStore';

function TabMaximize() {
  const dispatch: AppDispatch = useDispatch();
  // 是否窗口最大化
  const { isMaximize } = useCommonStore();

  /** 点击最大化/最小化 */
  const onClick = () => {
    dispatch(toggleMaximize(!isMaximize));
  };

  return (
    <Icon
      className={`
        flex
        items-center
        justify-center
        text-lg
        cursor-pointer
      `}
      icon={ isMaximize ? "ant-design:compress-outlined" : "ant-design:expand-outlined" }
      onClick={onClick}
    />
  );
}

export default TabMaximize;