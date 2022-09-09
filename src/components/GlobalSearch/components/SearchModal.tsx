import type { ISearchMenuValue } from '@/menus/utils/helper'
import { InputRef } from 'antd'
import { ChangeEventHandler, useEffect, useRef, useState } from 'react'
import { Modal, Input } from 'antd'
import { Icon } from '@iconify/react'
import { useDebounceFn } from 'ahooks'
import { menus } from '@/menus'
import { useNavigate } from 'react-router-dom'
import { useKeyStroke } from '@/hooks/useKeyStroke'
import { searchMenuValue } from '@/menus/utils/helper'
import SearchResult from './SearchResult'
import SearchFooter from './SearchFooter'

interface IProps {
  visible: boolean;
  toggle: () => void;
}

function SearchModal(props: IProps) {
  const navigate = useNavigate()
  const inputRef = useRef<InputRef>(null)
  const { visible, toggle } = props
  const [value, setValue] = useState('') // 输入框值
  const [active, setActive] = useState('') // 选中值
  const [list, setList] = useState<ISearchMenuValue[]>([])

  // 聚焦输入框
  useEffect(() => {
    if (visible) {
      // 转为宏任务聚焦输入框
      setTimeout(() => {
        inputRef.current?.focus({
          cursor: 'end'
        })
      }, 0)
    }

    // 退出时清空数据
    return (() => {
      setValue('')
      setActive('')
      setList([])
    })
  }, [visible])

  /**
   * 更改选中值
   * @param value - 选中值
   */
  const changActive = (value: string) => {
    setActive(value)
  }

  /** 点击回车 */
  const onPressEnter = () => {
    if (active) {
      navigate(active)
      toggle()
    }
  }

  /**
   * 防抖处理搜索结果
   * @param value - 搜索值
   */
  const debounceSearch = useDebounceFn((value: string) => {
    const searchValue = searchMenuValue(menus, value)
    if (searchValue?.length) {
      setActive((searchValue as ISearchMenuValue[])[0].key)
      setList(searchValue as ISearchMenuValue[])
    }
  }, { wait: 200 })

  /**
   * 防抖处理值变化值变化
   * @param event - 输入框参数
   */
  const onChange: ChangeEventHandler<HTMLInputElement> = event => {
    const { value } = event.target
    setValue(value)
    debounceSearch.run(value)
  }

  /**
   * 键盘上事件
   */
  const onArrowUp = () => {
    console.log('onArrowUp', list.length, visible)
    // 列表为空则退出
    if (!list.length || !visible) return null
    const index = list.findIndex(item => item.key === active)
    console.log('up:', index, active)
    // 最上层则不操作
    if (index === 0) return null
    const newActive = list[index - 1].key
    setActive(newActive)
  }

  /**
   * 键盘下事件
   */
  const onArrowDown = () => {
    console.log('onArrowDown', list.length, visible)
    // 列表为空则退出
    if (!list.length || !visible) return null
    const len = list.length - 1
    const index = list.findIndex(item => item.key === active)
    console.log('down:', index, active)
    // 最下层则不操作
    if (index === len) return null
    const newActive = list[index + 1].key
    setActive(newActive)
  }

  // 监听按键
  useKeyStroke({
    ArrowUp: onArrowUp,
    ArrowDown: onArrowDown,
    Enter: onPressEnter,
  })

  return (
    <Modal
      className="rounded-100px"
      visible={visible}
      closable={false}
      onCancel={toggle}
      footer={<SearchFooter />}
    >
      <Input
        ref={inputRef}
        value={value}
        placeholder="请输入关键词搜索"
        allowClear={true}
        prefix={<Icon
          className="text-lg text-warm-gray-400"
          icon="ant-design:search-outlined"
        />}
        onChange={onChange}
        onPressEnter={onPressEnter}
      />
  
      <SearchResult
        list={list}
        active={active}
        onCancel={toggle}
        changActive={changActive}
      />
    </Modal>
  )
}

export default SearchModal