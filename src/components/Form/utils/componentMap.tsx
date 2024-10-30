import type { TFunction } from 'i18next';
import type { ComponentType, FormList } from '#/form';
import { initCompProps } from './helper';
import { CreateBusiness } from '@/components/Business';
import {
  Input,
  InputNumber,
  AutoComplete,
  Checkbox,
  Radio,
  Switch,
  Rate,
  Slider,
  Upload
} from 'antd';
import {
  BaseDatePicker,
  BaseRangePicker,
  BaseTimePicker,
  BaseTimeRangePicker
} from '@/components/Dates';
import {
  BaseSelect,
  BaseTreeSelect,
  ApiSelect,
  ApiTreeSelect
} from '@/components/Selects';
import BaseTransfer from '@/components/Transfer/BaseTransfer';
import PasswordStrength from '@/components/PasswordStrength';
import WangEditor from '@/components/WangEditor';

const componentMap = new Map();

// antd组件注入
componentMap.set('Input', Input);
componentMap.set('TextArea', Input.TextArea);
componentMap.set('InputNumber', InputNumber);
componentMap.set('InputPassword', Input.Password);
componentMap.set('AutoComplete', AutoComplete);
componentMap.set('Select', BaseSelect);
componentMap.set('TreeSelect', BaseTreeSelect);
componentMap.set('Checkbox', Checkbox);
componentMap.set('CheckboxGroup', Checkbox.Group);
componentMap.set('RadioGroup', Radio.Group);
componentMap.set('Switch', Switch);
componentMap.set('Rate', Rate);
componentMap.set('Slider', Slider);
componentMap.set('Upload', Upload);
componentMap.set('Transfer', BaseTransfer);
componentMap.set('DatePicker', BaseDatePicker);
componentMap.set('RangePicker', BaseRangePicker);
componentMap.set('TimePicker', BaseTimePicker);
componentMap.set('TimeRangePicker', BaseTimeRangePicker);
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
