import { Icon } from '@iconify/react';
import { useCommonStore } from '@/hooks/useCommonStore';
import { useTabsStore } from '@/stores';

function TabMaximize() {
  // 是否窗口最大化
  const { isMaximize } = useCommonStore();
  const toggleMaximize = useTabsStore(state => state.toggleMaximize);

  /** 点击最大化/最小化 */
  const onClick = () => {
    toggleMaximize(!isMaximize);
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
