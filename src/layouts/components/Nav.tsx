import { Breadcrumb } from 'antd'

const { Item } = Breadcrumb

interface IProps {
  className?: string;
  list: string[];
}

function Nav(props: IProps) {
  const { className, list } = props

  return (
    <div className={className}>
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
  )
}

export default Nav