import type { IFormData } from '#/form'
import type { RootState } from '@/stores'
import type { IPagePermission, ITableOptions } from '#/public'
import type { IFormFn } from '@/components/Form/BasicForm'
import { useEffect, useMemo, useRef, useState } from 'react'
import { createList, searchList, tableColumns } from './data'
import { message } from 'antd'
import { useLoading } from '@/hooks/useLoading'
import { useCreateLoading } from '@/hooks/useCreateLoading'
import { useSelector } from 'react-redux'
import { checkPermission } from '@/utils/permissions'
import { ADD_TITLE, EDIT_TITLE } from '@/utils/config'
import { UpdateBtn, DeleteBtn } from '@/components/Buttons'
import {
  createUser,
  deleteUser,
  getUserById,
  getUserPage,
  updateUser
} from '@/servers/systems/user'
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
  const createFormRef = useRef<IFormFn>(null)
  const [searchData, setSearchData] = useState<IFormData>({})
  const [isCreateOpen, setCreateOpen] = useState(false)
  const [createTitle, setCreateTitle] = useState(ADD_TITLE)
  const [createId, setCreateId] = useState('')
  const [createData, setCreateData] = useState<IFormData>(initCreate)
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(20)
  const [total, setTotal] = useState(1)
  const [tableData, setTableData] = useState<IFormData[]>([])
  const permissions = useSelector((state: RootState) => state.user.permissions)

  const { isLoading, startLoading, endLoading } = useLoading()
  const { isCreateLoading, startCreateLoading, endCreateLoading } = useCreateLoading()

  // 权限前缀
  const permissionPrefix = '/authority/user'
  
  // 权限
  const pagePermission: IPagePermission = useMemo(() => {
    return {
      page: checkPermission(`${permissionPrefix}/index`, permissions),
      create: checkPermission(`${permissionPrefix}/create`, permissions),
      update: checkPermission(`${permissionPrefix}/update`, permissions),
      delete: checkPermission(`${permissionPrefix}/delete`, permissions)
    }
  }, [permissions])

  useEffect(() => {
    if (pagePermission.page) getPage()
  }, [permissions])

  /** 获取表格数据 */
  const getPage = () => {
    handleSearch(searchData)
  }

  /**
   * 搜索提交
   * @param values - 表单返回数据
   */
  const handleSearch = async (values: IFormData) => {
    setSearchData(values)
    const query = { page, pageSize, ...values }
    try {
      startLoading()
      const { data: { data } } = await getUserPage(query)
      const { items, total } = data
      setTotal(total)
      setTableData(items)
    } finally {
      endLoading()
    }
  }

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
      startCreateLoading()
      const { data: { data } } = await getUserById(id as string)
      setCreateData(data)
    } finally {
      endCreateLoading()
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
      startCreateLoading()
      const functions = () => createId ? updateUser(createId, values) : createUser(values)
      const { data } = await functions()
      getPage()
      setCreateOpen(false)
      createFormRef.current?.handleReset()
      message.success(data?.message || '操作成功')
    } finally {
      endCreateLoading()
    }
  }

  /**
   * 点击删除
   * @param id - 唯一值
   */
  const onDelete = async (id: string) => {
    try {
      startLoading()
      const { data } = await deleteUser(id as string)
      if (data?.code === 200) {
        message.success(data?.message || '删除成功')
        getPage()
      }
    } finally {
      endLoading()
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
          columns={tableColumns(optionRender)}
          dataSource={tableData}
        />

        <BasicPagination
          isLoading={isLoading}
          defaultCurrent={page}
          defaultPageSize={pageSize}
          total={total}
          onChange={onChangePagination}
        />

        <BasicModal
          title={createTitle}
          isOpen={isCreateOpen}
          confirmLoading={isCreateLoading}
          onOk={createSubmit}
          onCancel={() => setCreateOpen(false)}
        >
          <BasicForm
            formRef={createFormRef}
            list={createList}
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