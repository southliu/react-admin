import type { TransferProps } from 'antd'
import type { TransferItem } from 'antd/es/transfer'
import { useState } from 'react'
import { Transfer } from 'antd'

interface Props extends TransferProps<TransferItem> {
  value: string[];
  onChange: (value: string[]) => void;
}

function BasicTransfer(props: Props) {
  const { value } = props
  const [targetKeys, setTargetKeys] = useState(value || [])

  /**
   * 更改数据
   * @param targetKeys - 显示在右侧框数据的key集合
   */
  const onChange = (targetKeys: string[]) => {
    setTargetKeys(targetKeys)
    props?.onChange?.(targetKeys)
  }

  return (
    <Transfer
      {...props}
      targetKeys={targetKeys}
      onChange={onChange}
    />
  )
}

export default BasicTransfer