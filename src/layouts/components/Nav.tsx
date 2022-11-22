import type { RootState } from '@/stores'
import { Breadcrumb } from 'antd'
import { useSelector } from 'react-redux'

const { Item } = Breadcrumb

interface IProps {
  className?: string;
  list: string[];
}

function Nav(props: IProps) {
  const { className, list } = props
  
  // 是否手机端
  const isPhone = useSelector((state: RootState) => state.menu.isPhone)

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
  )
}

export default Nav