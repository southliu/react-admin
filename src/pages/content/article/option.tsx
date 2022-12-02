import type { IFormData } from '#/form'
import type { IFormFn } from '@/components/Form/BasicForm'
import type { AppDispatch } from '@/stores'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Button, message, Spin } from 'antd'
import { createList } from './model'
import { getUrlParam } from '@/utils/helper'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { useAliveController } from 'react-activation'
import {
  addTabs,
  setNav,
  setActiveKey,
  closeTabGoNext
} from '@/stores/tabs'
import {
 getArticleById,
 createArticle,
 updateArticle,
} from '@/servers/content/article'
import BasicForm from '@/components/Form/BasicForm'

// 初始化新增数据
const initCreate = {
  status: 1
}

// 父路径
const fatherPath = '/content/article'

function Page() {
  const { refresh } = useAliveController()
  const { pathname, search } = useLocation()
  const uri = pathname + search
  const id = getUrlParam(search, 'id')
  const createFormRef = useRef<IFormFn>(null)
  const dispatch: AppDispatch = useDispatch()
  const [isCreateLoading, setCreateLoading] = useState(false)
  const [createId, setCreateId] = useState('')
  const [createData, setCreateData] = useState<IFormData>(initCreate)

  /**
   * 添加标签
   * @param path - 路径
   */
  const handleAddTab = useCallback((path = pathname) => {
    // 当值为空时匹配路由
    if (path === '/') return

    const option = id ? '编辑' : '新增'
    const title = `${option}文章管理${id ? `(${id})` : ''}`
    const newTab = {
      label: title,
      key: uri,
      nav: ['内容管理', '文章管理', title]
    }
    dispatch(setActiveKey(newTab.key))
    dispatch(setNav(newTab.nav))
    dispatch(addTabs(newTab))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, pathname, search])

  useEffect(() => {
    handleAddTab()
  }, [handleAddTab])

  useEffect(() => {
    if (id) {
      onUpdate(id)
    } else {
      onCreate()
    }

    return () => {
      setCreateData(initCreate)
    }
  }, [id])

  /** 点击新增 */
  const onCreate = () => {
    setCreateId('')
    setCreateData(initCreate)
  }

  /**
   * 点击编辑
   * @param id - 唯一值
   */
   const onUpdate = async (id: string) => {
    try {
      setCreateId(id)
      setCreateLoading(true)
      const { data: { data } } = await getArticleById(id as string)
      setCreateData(data)
    } finally {
      setCreateLoading(false)
    }
  }

  /** 表格提交 */
  const createSubmit = () => {
    createFormRef.current?.handleSubmit()
  }

  /** 返回主页 */
  const goBack = () => {
    dispatch(closeTabGoNext({
      key: uri,
      nextPath: fatherPath
    }))
  }

  /**  提交成功，跳转回主页 */
  const sumbitFinish = () => {
    refresh(fatherPath)
    goBack()
  }

  /**
   * 新增/编辑提交
   * @param values - 表单返回数据
   */
  const handleCreate = async (values: IFormData) => {
    try {
      setCreateLoading(true)
      const functions = () => createId ? updateArticle(createId, values) : createArticle(values)
      const { data } = await functions()
      message.success(data?.message || '操作成功')
      createFormRef.current?.handleReset()
      sumbitFinish()
    } finally {
      setCreateLoading(false)
    }
  }

  return (
    <div>
      <div className='mt-30px mb-60px'>
        <Spin spinning={isCreateLoading}>
          <BasicForm
            formRef={createFormRef}
            list={createList}
            data={createData}
            labelCol={{ span: 5 }}
            handleFinish={handleCreate}
          />
        </Spin>
      </div>
        
      <div className={`
        bg
        fixed
        flex
        justify-end
        left-0
        right-0
        bottom-0
        py-5px
        px-30px
        box-border
        shadow
        shadow-gray-500
      `}>
        <Button className='mr-10px' danger onClick={goBack}>
          返回
        </Button>
        <Button type="primary" onClick={createSubmit}>
          提交
        </Button>
      </div>
    </div>
  )
}

export default Page