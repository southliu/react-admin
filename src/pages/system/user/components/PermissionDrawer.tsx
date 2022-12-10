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
}

function PermissionDrawer(props: IProps) {
  const {
    title,
    isVisible,
    treeData,
    checkedKeys,
    onClose
  } = props
  const [treeCheckedKeys, setTreeCheckedKeys] = useState(checkedKeys)

  /** 提交 */
  const onSubmit = () => {
    console.log('yes')
  }

  /** 关闭图标渲染 */
  const closeIconRender = (
    <Button type="primary" onClick={onSubmit}>提交</Button>
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
      closeIcon={closeIconRender}
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