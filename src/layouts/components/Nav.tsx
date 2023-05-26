import { Breadcrumb } from 'antd';
import { useCommonStore } from '@/hooks/useCommonStore';

const { Item } = Breadcrumb;

interface Props {
  className?: string;
  list: string[];
}

function Nav(props: Props) {
  const { className, list } = props;
  
  // 是否手机端
  const { isPhone } = useCommonStore();

  return (
    <>
      {
        !isPhone &&
        <div className={`${className} flex items-center`}>
          <Breadcrumb>
            {
              list?.map(item => (
                <Item
                  key={item}
                  className='whitespace-nowrap'
                >
                  { item }
                </Item>
              ))
            }
          </Breadcrumb>
        </div>
      }
    </>
  );
}

export default Nav;