import type { TreeSelectProps } from 'antd';
import { getGames } from '@/servers/platform/game';
import ApiTreeSelect from "@/components/Selects/ApiTreeSelect";

/**
 * @description: 游戏下拉组件
 */
function GameSelect(props: TreeSelectProps) {
  return (
    <>
      <ApiTreeSelect
        {...props}
        multiple={true}
        api={getGames}
        fieldNames={{ label: 'name', value: 'id' }}
      />
    </>
  );
}

export default GameSelect;