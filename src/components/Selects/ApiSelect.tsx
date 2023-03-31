import type { IApi } from '#/form'
import type { SelectProps } from 'antd'
import type { DefaultOptionType } from 'antd/es/select'
import { Select } from 'antd'
import { useState, useEffect, useCallback } from 'react'
import { MAX_TAG_COUNT, PLEASE_SELECT } from '@/utils/config'
import Loading from './components/Loading'

interface IProps extends SelectProps {
  api: IApi;
  params?: object;
}

/**
 * @description: 根据API获取数据下拉组件
 */
function ApiSelect(props: IProps) {
  const [isLoading, setLoading] = useState(false)
  const [options, setOptions] = useState<DefaultOptionType[]>([])

  // 清除自定义属性
  const params: Partial<IProps> = { ...props }
  delete params.api
  delete params.params

  /** 获取接口数据 */
  const getApiData = useCallback(async () => {
    try {
      setLoading(true)
      const data = await props.api?.(props?.params)
      setOptions(data || [])
    } finally {
      setLoading(false)
    }
  }, [props])

  useEffect(() => {
    // 当有值且列表为空时，自动获取接口
    if (props.value && options.length === 0) {
      getApiData()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.value])

  /**
   * 展开下拉回调
   * @param open - 是否展开
   */
  const onDropdownVisibleChange = (open: boolean) => {
    if (open) getApiData()

    props.onDropdownVisibleChange?.(open)
  }

  return (
    <Select
      allowClear={true}
      maxTagCount={MAX_TAG_COUNT}
      placeholder={PLEASE_SELECT}
      optionFilterProp='label'
      {...params}
      loading={isLoading}
      options={options}
      notFoundContent={isLoading && <Loading />}
      onDropdownVisibleChange={onDropdownVisibleChange}
    />
  )
}

export default ApiSelect