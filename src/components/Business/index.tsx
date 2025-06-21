import { addComponent } from '../Form/utils/componentMap';
import GameSelect from './Selects/GameSelect';
import PartnerSelect from './Selects/PartnerSelect';

// 自定义组件名
export type BusinessComponents = 'GameSelect' | 'PartnerSelect';

/** 组件注入 */
export function CreateBusiness() {
  addComponent('GameSelect', GameSelect);
  addComponent('PartnerSelect', PartnerSelect);
}
