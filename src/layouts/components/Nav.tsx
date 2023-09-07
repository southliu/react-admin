import type { BreadcrumbProps } from 'antd';
import type { NavData } from '@/menus/utils/helper';
import { Breadcrumb } from 'antd';
import { useTranslation } from 'react-i18next';
import { useCommonStore } from '@/hooks/useCommonStore';

interface Props {
  className?: string;
  list: NavData[];
}

function Nav(props: Props) {
  const { className, list } = props;
  const { i18n } = useTranslation();
  
  // 是否手机端
  const { isPhone } = useCommonStore();

  // 数据处理
  const handleList = (list: NavData[]) => {
    const result: BreadcrumbProps['items'] = [];
    if (!list?.length) return [];
    // 获取当前语言
    const currentLanguage = i18n.language;

    for (let i = 0; i < list?.length; i++) {
      const item = list?.[i];
      const data = currentLanguage === 'en' ? item.labelEn : item.labelZh;
      result.push({
        title: data || ''
      });
    }

    return result;
  };

  return (
    <>
      {
        !isPhone &&
        <div className={`${className} flex items-center`}>
          <Breadcrumb
            items={handleList(list)}
          />
        </div>
      }
    </>
  );
}

export default Nav;