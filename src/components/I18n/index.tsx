import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';

type MenuKey = 'zh' | 'en'

function I18n() {
  const { i18n } = useTranslation();

  // 下拉菜单内容
  const items: MenuProps['items'] = [
    {
      key: 'zh',
      label: (<span>中文</span>),
    },
    {
      key: 'en',
      label: (<span>English</span>),
    },
  ];

  /** 点击菜单更换语言 */
  const onClick: MenuProps['onClick'] = e => {
    i18n.changeLanguage(e.key as MenuKey);
  };

  return (
    <Dropdown
      placement="bottom"
      menu={{ items, onClick }}
    >
      <div
        className="ant-dropdown-link flex items-center cursor-pointer"
        onClick={e => e.preventDefault()}
      >
        <Icon
          className="flex items-center justify-center text-lg mr-3 cursor-pointer"
          icon='cil:language'
        />
      </div>
    </Dropdown>
  );
}

export default I18n;