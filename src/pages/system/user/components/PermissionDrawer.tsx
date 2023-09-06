import type { DataNode, TreeProps } from 'antd/es/tree';
import type { Key } from 'antd/lib/table/interface';
import { Drawer, Tree, Button } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  isVisible: boolean;
  treeData: DataNode[];
  checkedKeys: Key[];
  title?: string;
  onClose: () => void;
  onSubmit: (checked: Key[]) => Promise<void>
}

function PermissionDrawer(props: Props) {
  const {
    title,
    isVisible,
    treeData,
    checkedKeys,
    onClose,
    onSubmit
  } = props;
  const { t } = useTranslation();
  const [treeCheckedKeys, setTreeCheckedKeys] = useState(checkedKeys);

  useEffect(() => {
    setTreeCheckedKeys(props.checkedKeys);
  }, [props.checkedKeys]);

  /** 提交 */
  const handleSubmit = () => {
    onSubmit(treeCheckedKeys);
  };

  /** 右上角渲染 */
  const extraRender = (
    <Button type="primary" onClick={handleSubmit}>
      { t('public.submit') }
    </Button>
  );

  /**
   * 处理勾选
   * @param checked - 勾选值
   */
  const handleCheck: TreeProps['onCheck'] = checked => {
    setTreeCheckedKeys(checked as Key[]);
  };

  return (
    <Drawer
      open={isVisible}
      title={title || t('system.rightsProfile')}
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
  );
}

export default PermissionDrawer;