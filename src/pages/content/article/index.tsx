import type { FormData } from '#/form'
import type { AppDispatch, RootState } from '@/stores'
import type { PagePermission, TableOptions } from '#/public'
import type { FormFn } from '@/components/Form/BasicForm'
import { useCallback, useEffect, useRef, useState } from 'react'
import { searchList, tableColumns } from './model'
import { message } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useTitle } from '@/hooks/useTitle'
import { useNavigate } from 'react-router-dom'
import { setRefreshPage } from '@/stores/public'
import { checkPermission } from '@/utils/permissions'
import { useCommonStore } from '@/hooks/useCommonStore'
import { UpdateBtn, DeleteBtn } from '@/components/Buttons'
import { getArticlePage, deleteArticle } from '@/servers/content/article'
import BasicContent from '@/components/Content/BasicContent'
import BasicSearch from '@/components/Search/BasicSearch'
import BasicTable from '@/components/Table/BasicTable'
import BasicPagination from '@/components/Pagination/BasicPagination'

// 当前行数据
interface RowData {
  id: string;
}

// 初始化搜索
const initSearch = {
  page: 1,
  pageSize: 20
}

function Page() {
  useTitle('文章管理')
  const navigate = useNavigate()
  const dispatch: AppDispatch = useDispatch()
  const searchFormRef = useRef<FormFn>(null)
  const { permissions } = useCommonStore()
  const [isLoading, setLoading] = useState(false)
  const [page, setPage] = useState(initSearch.page)
  const [pageSize, setPageSize] = useState(initSearch.pageSize)
  const [total, setTotal] = useState(0)
  const [tableData, setTableData] = useState<FormData[]>([])
  const isRefreshPage = useSelector((state: RootState) => state.public.isRefreshPage)

  // 权限前缀
  const permissionPrefix = '/content/article'

  // 权限
  const pagePermission: PagePermission = {
    page: checkPermission(`${permissionPrefix}/index`, permissions),
    create: checkPermission(`${permissionPrefix}/create`, permissions),
    update: checkPermission(`${permissionPrefix}/update`, permissions),
    delete: checkPermission(`${permissionPrefix}/delete`, permissions)
  }

  /**
   * 点击搜索
   * @param values - 表单返回数据
   */
  const onSearch = (values: FormData) => {
    setPage(1)
    handleSearch({ page: 1, pageSize, ...values })
  }

  /**
   * 搜索提交
   * @param values - 表单返回数据
   */
  const handleSearch = useCallback(async (values: FormData) => {
    try {
      setLoading(true)
      const { code, data } = await getArticlePage(values)

      if (Number(code) === 200) {
        const { items, total } = data
        setTotal(total)
        setTableData(items)
      }
    } finally {
      setLoading(false)
    }
  }, [])

  // 首次进入自动加载接口数据
  useEffect(() => { 
    if (pagePermission.page && !isRefreshPage) handleSearch({ ...initSearch })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagePermission.page])

  // 如果是新增或编辑成功重新加载页面
  useEffect(() => { 
    if (isRefreshPage) {
      dispatch(setRefreshPage(false))
      getPage()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRefreshPage])

  /** 点击新增 */
  const onCreate = () => {
    navigate('/content/article/option?type=create')
  }

  /**
   * 点击编辑
   * @param id - 唯一值
   */
  const onUpdate = (id: string) => {
    navigate(`/content/article/option?type=update&id=${id}`)
  }

  /** 获取表格数据 */
  const getPage = () => {
    const formData = searchFormRef.current?.getFieldsValue() || {}
    const params = { ...formData, page, pageSize }
    handleSearch(params)
  }

  /**
   * 点击删除
   * @param id - 唯一值
   */
  const onDelete = async (id: string) => {
    try {
      setLoading(true)
      const data = await deleteArticle(id as string)
      if (data?.code === 200) {
        message.success(data?.message || '删除成功')
        getPage()
      }
    } finally {
      setLoading(false)
    }
  }

  /**
   * 处理分页
   * @param page - 当前页数
   * @param pageSize - 每页条数
   */
  const onChangePagination = (page: number, pageSize: number) => {
    setPage(page)
    setPageSize(pageSize)
    const formData = searchFormRef.current?.getFieldsValue()
    handleSearch({ ...formData, page, pageSize })
  }

  /**
   * 渲染操作
   * @param _ - 当前值
   * @param record - 当前行参数
   */
  const optionRender: TableOptions<object> = (_, record) => (
    <>
      {
        pagePermission.update === true &&
        <UpdateBtn
          className='mr-5px'
          isLoading={isLoading}
          onClick={() => onUpdate((record as RowData).id)}
        />
      }
      {
        pagePermission.delete === true &&
        <DeleteBtn
          className='mr-5px'
          isLoading={isLoading}
          handleDelete={() => onDelete((record as RowData).id)}
        />
      }
    </>
  )

  return (
    <BasicContent isPermission={pagePermission.page}>
      <>
        <BasicSearch
          formRef={searchFormRef}
          list={searchList}
          data={initSearch}
          isLoading={isLoading}
          isCreate={pagePermission.create}
          onCreate={onCreate}
          handleFinish={onSearch}
        />
        
        <BasicTable
          loading={isLoading}
          columns={tableColumns(optionRender)}
          dataSource={tableData}
        />

        <BasicPagination
          disabled={isLoading}
          current={page}
          pageSize={pageSize}
          total={total}
          onChange={onChangePagination}
        />
      </>
    </BasicContent>
  )
}

export default Page