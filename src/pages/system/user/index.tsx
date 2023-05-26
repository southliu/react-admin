import type { FormData } from '#/form'
import type { DataNode } from 'antd/es/tree'
import type { Key } from 'antd/es/table/interface'
import type { PagePermission, TableOptions } from '#/public'
import type { FormFn } from '@/components/Form/BasicForm'
import { useCallback, useEffect, useRef, useState } from 'react'
import { createList, searchList, tableColumns } from './model'
import { Button, message } from 'antd'
import { useTitle } from '@/hooks/useTitle'
import { checkPermission } from '@/utils/permissions'
import { useCommonStore } from '@/hooks/useCommonStore'
import { ADD_TITLE, EDIT_TITLE } from '@/utils/config'
import { UpdateBtn, DeleteBtn } from '@/components/Buttons'
import { getPermission, savePermission } from '@/servers/system/menu'
import {
  createUser,
  deleteUser,
  getUserById,
  getUserPage,
  updateUser
} from '@/servers/system/user'
import BasicContent from '@/components/Content/BasicContent'
import BasicSearch from '@/components/Search/BasicSearch'
import BasicModal from '@/components/Modal/BasicModal'
import BasicForm from '@/components/Form/BasicForm'
import BasicTable from '@/components/Table/BasicTable'
import BasicPagination from '@/components/Pagination/BasicPagination'
import PermissionDrawer from './components/PermissionDrawer'

// 当前行数据
interface RowData {
  id: string;
}

// 初始化搜索
const initSearch = {
  page: 1,
  pageSize: 20
}

// 初始化新增数据
const initCreate = {
  status: 1
}

function Page() {
  useTitle('用户管理')
  const searchFormRef = useRef<FormFn>(null)
  const createFormRef = useRef<FormFn>(null)
  const [isLoading, setLoading] = useState(false)
  const [isCreateLoading, setCreateLoading] = useState(false)
  const [isCreateOpen, setCreateOpen] = useState(false)
  const [createTitle, setCreateTitle] = useState(ADD_TITLE)
  const [createId, setCreateId] = useState('')
  const [createData, setCreateData] = useState<FormData>(initCreate)
  const [page, setPage] = useState(initSearch.page)
  const [pageSize, setPageSize] = useState(initSearch.pageSize)
  const [total, setTotal] = useState(0)
  const [tableData, setTableData] = useState<FormData[]>([])

  const [promiseId, setPromiseId] = useState('')
  const [isPromiseVisible, setPromiseVisible] = useState(false)
  const [promiseCheckedKeys, setPromiseCheckedKeys] = useState<Key[]>([])
  const [promiseTreeData, setPromiseTreeData] = useState<DataNode[]>([])

  const { permissions } = useCommonStore()

  // 权限前缀
  const permissionPrefix = '/authority/user'
  
  // 权限
  const pagePermission: PagePermission = {
    page: checkPermission(`${permissionPrefix}/index`, permissions),
    create: checkPermission(`${permissionPrefix}/create`, permissions),
    update: checkPermission(`${permissionPrefix}/update`, permissions),
    delete: checkPermission(`${permissionPrefix}/delete`, permissions),
    permission: checkPermission(`${permissionPrefix}/authority`, permissions)
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
      const { data } = await getUserPage(values)
      const { items, total } = data
      setTotal(total)
      setTableData(items)
    } finally {
      setLoading(false)
    }
  }, [])

  // 首次进入自动加载接口数据
  useEffect(() => {
    if (pagePermission.page) handleSearch({ ...initSearch })
  }, [handleSearch, pagePermission.page])

  /** 开启权限 */
  const openPermission = async (id: string) => {
    try {
      setLoading(true)
      const params = { userId: id }
      const { data } = await getPermission(params)
      const { defaultCheckedKeys, treeData } = data
      setPromiseId(id)
      setPromiseTreeData(treeData)
      setPromiseCheckedKeys(defaultCheckedKeys)
      setPromiseVisible(true)
    } finally {
      setLoading(false)
    }
  }
  
  /** 关闭权限 */
  const closePermission = () => {
    setPromiseVisible(false)
  }
  
  /**
   * 权限提交
   */
  const permissionSubmit = async (checked: Key[]) => {
    try {
      setLoading(true)
      const params = {
        menuIds: checked,
        userId: promiseId
      }
      const data = await savePermission(params)
      message.success(data.message || '授权成功')
      setPromiseVisible(false)
    } finally {
      setLoading(false)
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
    try {
      setCreateOpen(true)
      setCreateTitle(EDIT_TITLE(id))
      setCreateId(id)
      setCreateLoading(true)
      const { data } = await getUserById(id as string)
      setCreateData(data)
    } finally {
      setCreateLoading(false)
    }
  }

  /** 表格提交 */
  const createSubmit = () => {
    createFormRef.current?.handleSubmit()
  }

  /** 关闭新增/修改弹窗 */
  const closeCreate = () => {
    setCreateOpen(false)
  }

  /** 获取表格数据 */
  const getPage = () => {
    const formData = searchFormRef.current?.getFieldsValue() || {}
    const params = { ...formData, page, pageSize }
    handleSearch(params)
  }

  /**
   * 新增/编辑提交
   * @param values - 表单返回数据
   */
  const handleCreate = async (values: FormData) => {
    try {
      setCreateLoading(true)
      const functions = () => createId ? updateUser(createId, values) : createUser(values)
      const { data } = await functions()
      message.success(data?.message || '操作成功')
      setCreateOpen(false)
      getPage()
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
      const data = await deleteUser(id as string)
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
        pagePermission.permission === true &&
        <Button
          className='mr-2'
          loading={isLoading}
          onClick={() => openPermission((record as RowData).id)}
        >
          权限
        </Button>
      }
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

        <BasicModal
          title={createTitle}
          open={isCreateOpen}
          confirmLoading={isCreateLoading}
          onOk={createSubmit}
          onCancel={closeCreate}
        >
          <BasicForm
            formRef={createFormRef}
            list={createList}
            data={createData}
            labelCol={{ span: 6 }}
            handleFinish={handleCreate}
          />
        </BasicModal>

        <PermissionDrawer
          isVisible={isPromiseVisible}
          treeData={promiseTreeData}
          checkedKeys={promiseCheckedKeys}
          onClose={closePermission}
          onSubmit={permissionSubmit}
        />
      </>
    </BasicContent>
  )
}

export default Page