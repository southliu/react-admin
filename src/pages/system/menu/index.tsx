import type { IFormData } from '#/form'
import type { RootState } from '@/stores'
import type { IPagePermission, ITableOptions } from '#/public'
import type { IFormFn } from '@/components/Form/BasicForm'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { searchList, createList, tableColumns } from './data'
import { message } from 'antd'
import { useTitle } from '@/hooks/useTitle'
import { useSelector } from 'react-redux'
import { checkPermission } from '@/utils/permissions'
import { ADD_TITLE, EDIT_TITLE } from '@/utils/config'
import { UpdateBtn, DeleteBtn } from '@/components/Buttons'
import {
  getMenuPage,
  getMenuById,
  createMenu,
  updateMenu,
  deleteMenu
} from '@/servers/system/menu'
import BasicContent from '@/components/Content/BasicContent'
import BasicSearch from '@/components/Search/BasicSearch'
import BasicModal from '@/components/Modal/BasicModal'
import BasicForm from '@/components/Form/BasicForm'
import BasicTable from '@/components/Table/BasicTable'
import BasicPagination from '@/components/Pagination/BasicPagination'

// 当前行数据
export interface IRowData {
  id: string;
}

// 初始化新增数据
const initCreate = {
  status: 1
}

function User() {
  useTitle('菜单管理')
  const createFormRef = useRef<IFormFn>(null)
  const [searchData, setSearchData] = useState<IFormData>({})
  const [isCreateOpen, setCreateOpen] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [isCreateLoading, setCreateLoading] = useState(false)
  const [createTitle, setCreateTitle] = useState(ADD_TITLE)
  const [createId, setCreateId] = useState('')
  const [createData, setCreateData] = useState<IFormData>(initCreate)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [total, setTotal] = useState(1)
  const [tableData, setTableData] = useState<IFormData[]>([])
  const permissions = useSelector((state: RootState) => state.user.permissions)

  // 权限前缀
  const permissionPrefix = '/authority/menu'

  // 权限
  const pagePermission: IPagePermission = useMemo(() => {
    return {
      page: checkPermission(`${permissionPrefix}/index`, permissions),
      create: checkPermission(`${permissionPrefix}/create`, permissions),
      update: checkPermission(`${permissionPrefix}/update`, permissions),
      delete: checkPermission(`${permissionPrefix}/delete`, permissions)
    }
  }, [permissions])

  /**
   * 搜索提交
   * @param values - 表单返回数据
   */
  const handleSearch = useCallback(async (values: IFormData) => {
    setSearchData(values)
    const query = { page, pageSize, ...values }
    try {
      setLoading(true)
      const { data: { data } } = await getMenuPage(query)
      const { items, total } = data
      setTotal(total)
      setTableData(items)
    } finally {
      setLoading(false)
    }
  }, [page, pageSize])

  /** 获取表格数据 */
  const getPage = useCallback(() => {
    handleSearch(searchData)
  }, [handleSearch, searchData])

  useEffect(() => {
    if (pagePermission.page) getPage()
  }, [getPage, pagePermission.page])

  /** 点击新增 */
  const onCreate = () => {
    setCreateOpen(true)
    setCreateTitle(ADD_TITLE)
    setCreateId('')
    setCreateData(initCreate)
  }

  /**
   * 点击编辑
   * @param id - 唯一值
   */
  const onUpdate = async (id: string) => {
    setCreateOpen(true)
    setCreateTitle(EDIT_TITLE(id))
    setCreateId(id)
    setCreateData(initCreate)

    try {
      setCreateLoading(true)
      const { data: { data } } = await getMenuById(id as string)
      setCreateData(data)
    } finally {
      setCreateLoading(false)
    }
  }

  /** 表格提交 */
  const createSubmit = () => {
    createFormRef.current?.handleSubmit()
  }

  /**
   * 新增/编辑提交
   * @param values - 表单返回数据
   */
  const handleCreate = async (values: IFormData) => {
    try {
      setCreateLoading(true)
      const functions = () => createId ? updateMenu(createId, values) : createMenu(values)
      const { data } = await functions()
      getPage()
      setCreateOpen(false)
      createFormRef.current?.handleReset()
      message.success(data?.message || '操作成功')
    } finally {
      setCreateLoading(false)
    }
  }

  /**
   * 点击删除
   * @param id - 唯一值
   */
  const onDelete = async (id: string) => {
    try {
      setLoading(true)
      const { data } = await deleteMenu(id as string)
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
    handleSearch({ ...searchData, page, pageSize })
  }

  /**
   * 渲染操作
   * @param _ - 当前值
   * @param record - 当前行参数
   */
  const optionRender: ITableOptions<IRowData> = (_, record) => (
    <>
      {
        pagePermission.update === true &&
        <UpdateBtn
          className='mr-5px'
          isLoading={isLoading}
          onClick={() => onUpdate(record.id)}
        />
      }
      {
        pagePermission.delete === true &&
        <DeleteBtn
          className='mr-5px'
          isLoading={isLoading}
          handleDelete={() => onDelete(record.id)}
        />
      }
    </>
  )

  return (
    <BasicContent isPermission={pagePermission.page}>
      <>
        <BasicSearch
          list={searchList}
          data={searchData}
          isLoading={isLoading}
          isCreate={pagePermission.create}
          onCreate={onCreate}
          handleFinish={handleSearch}
        />
        
        <BasicTable
          loading={isLoading}
          columns={tableColumns(optionRender)}
          dataSource={tableData}
        />

        <BasicPagination
          disabled={isLoading}
          defaultCurrent={page}
          defaultPageSize={pageSize}
          total={total}
          onChange={onChangePagination}
        />

        <BasicModal
          title={createTitle}
          open={isCreateOpen}
          confirmLoading={isCreateLoading}
          onOk={createSubmit}
          onCancel={() => setCreateOpen(false)}
        >
          <BasicForm
            formRef={createFormRef}
            list={createList(createId)}
            data={createData}
            labelCol={{ span: 6 }}
            handleFinish={handleCreate}
          />
        </BasicModal>
      </>
    </BasicContent>
  )
}

export default User