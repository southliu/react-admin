import type { TransferProps } from 'antd'
import type { TransferItem } from 'antd/es/transfer'
import { useState } from 'react'
import { Transfer } from 'antd'

interface IProps extends TransferProps<TransferItem> {
  value: string[];
  dataSource: TransferItem[];
  onChange: (value: string[]) => void;
}

function BasicTransfer(props: IProps) {
  const { value } = props
  const [selectedKeys, setSelectedKeys] = useState(value)
  const [targetKeys, setTargetKeys] = useState(props.targetKeys || [])

  /**
   * 更改数据
   * @param targetKeys - 显示在右侧框数据的 key 集合
   */
  const onChange = (targetKeys: string[]) => {
    setTargetKeys(targetKeys)
    props?.onChange?.(targetKeys)
  }

  const onSelectChange = (sourceSelectedKeys: string[], targetSelectedKeys: string[]) => {
    setSelectedKeys([...sourceSelectedKeys, ...targetSelectedKeys])
  }

  return (
    <Transfer
      {...props}
      targetKeys={targetKeys}
      selectedKeys={selectedKeys}
      onChange={onChange}
      onSelectChange={onSelectChange}
    />
  )
}

export default BasicTransfer