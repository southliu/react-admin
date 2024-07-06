import type { TFunction } from 'i18next';
import type { ComponentType, FormList } from '#/form';
import { initCompProps } from './helper';
import { CreateBusiness } from '@/components/Business';
import {
  Input,
  InputNumber,
  AutoComplete,
  Select,
  TreeSelect,
  Checkbox,
  Radio,
  Switch,
  Rate,
  Slider,
  Upload
} from 'antd';
import ApiSelect from '@/components/Selects/ApiSelect';
import ApiTreeSelect from '@/components/Selects/ApiTreeSelect';
import BasicDatePicker from '@/components/Dates/BasicDatePicker';
import BasicRangePicker from '@/components/Dates/BasicRangePicker';
import BasicTimePicker from '@/components/Dates/BasicTimePicker';
import BasicTimeRangePicker from '@/components/Dates/BasicTimeRangePicker';
import BasicTransfer from '@/components/Transfer/BasicTransfer';
import PasswordStrength from '@/components/PasswordStrength';
import WangEditor from '@/components/WangEditor';

const componentMap = new Map();

// antd组件注入
componentMap.set('Input', Input);
componentMap.set('TextArea', Input.TextArea);
componentMap.set('InputNumber', InputNumber);
componentMap.set('InputPassword', Input.Password);
componentMap.set('AutoComplete', AutoComplete);
componentMap.set('Select', Select);
componentMap.set('TreeSelect', TreeSelect);
componentMap.set('Checkbox', Checkbox);
componentMap.set('CheckboxGroup', Checkbox.Group);
componentMap.set('RadioGroup', Radio.Group);
componentMap.set('Switch', Switch);
componentMap.set('Rate', Rate);
componentMap.set('Slider', Slider);
componentMap.set('Upload', Upload);
componentMap.set('Transfer', BasicTransfer);
componentMap.set('DatePicker', BasicDatePicker);
componentMap.set('RangePicker', BasicRangePicker);
componentMap.set('TimePicker', BasicTimePicker);
componentMap.set('TimeRangePicker', BasicTimeRangePicker);
componentMap.set('ApiSelect', ApiSelect);
componentMap.set('ApiTreeSelect', ApiTreeSelect);
componentMap.set('PasswordStrength', PasswordStrength);
componentMap.set('Editor', WangEditor);

// 业务组件注入
CreateBusiness();

/**
 * 获取组件
 * @param item - 表单项
 */
export function getComponent(t: TFunction, item: FormList, onPressEnter: () => void) {
  const { component, componentProps } = item;

  // 当组件类型为自定义时
  if (component === 'customize') {
    const { render } = item;
    // 获取组件自定义渲染失败直接返回空标签
    if (!render) return <></>;
    addComponent('customize', render);
  }

  const Comp = componentMap.get(component);
  // 获取组件失败直接返回空标签
  if (!Comp) return <></>;

  return (
    <>
      <Comp
        {...initCompProps(t, component, onPressEnter)}
        {...componentProps}
      />
      {
        item.unit &&
        <span className='ml-5px whitespace-nowrap'>
          { item.unit }
        </span>
      }
    </>
  );
}

/**
 * 添加组件
 * @param name - 组件名
 * @param component - 组件
 */
export function addComponent(name: ComponentType, component: unknown): void {
  componentMap.set(name, component);
}

/**
 * 删除组件
 * @param name - 组件名
 */
export function deleteComponent(name: ComponentType): void {
  componentMap.delete(name);
}
