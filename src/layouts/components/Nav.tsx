import type { BreadcrumbProps } from 'antd';
import { Breadcrumb } from 'antd';
import { useCommonStore } from '@/hooks/useCommonStore';

interface Props {
  className?: string;
  list: string[];
}

function Nav(props: Props) {
  const { className, list } = props;
  
  // 是否手机端
  const { isPhone } = useCommonStore();

  // 数据处理
  const handleList = (list: string[]) => {
    const result: BreadcrumbProps['items'] = [];
    if (!list?.length) return [];

    for (let i = 0; i < list?.length; i++) {
      const item = list?.[i];
      result.push({
        title: item
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