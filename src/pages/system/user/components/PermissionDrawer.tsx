import type { DataNode, TreeProps } from 'antd/es/tree'
import type { Key } from 'antd/lib/table/interface'
import { Drawer, Tree, Button } from 'antd'
import { useState } from 'react'

interface IProps {
  isVisible: boolean;
  treeData: DataNode[];
  checkedKeys: Key[];
  title?: string;
  onClose: () => void;
  onSubmit: (checked: Key[]) => Promise<void>
}

function PermissionDrawer(props: IProps) {
  const {
    title,
    isVisible,
    treeData,
    checkedKeys,
    onClose,
    onSubmit
  } = props
  const [treeCheckedKeys, setTreeCheckedKeys] = useState(checkedKeys)

  /** 提交 */
  const handleSubmit = () => {
    console.log('yes')
    onSubmit(treeCheckedKeys)
  }

  /** 右上角渲染 */
  const extraRender = (
    <Button type="primary" onClick={handleSubmit}>提交</Button>
  )

  /**
   * 处理勾选
   * @param checked - 勾选值
   */
  const handleCheck: TreeProps['onCheck'] = checked => {
    setTreeCheckedKeys(checked as Key[])
  }

  return (
    <Drawer
      visible={isVisible}
      title={title || '权限配置'}
      placement="right"
      extra={extraRender}
      onClose={onClose}
    >
      <Tree
        checkable
        checkedKeys={treeCheckedKeys}
        treeData={treeData}
        onCheck={handleCheck}
      />
    </Drawer>
  )
}

export default PermissionDrawer