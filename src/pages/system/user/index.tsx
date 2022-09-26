import type { IFormData } from '#/form'
import type { IFormFn } from '@/components/Form/BasicForm'
import type { ITableOptions } from '#/global'
import { useEffect, useRef, useState } from 'react'
import { createList, searchList, tableColumns } from './data'
import { Button, message } from 'antd'
import { useLoading } from '@/hooks/useLoading'
import { useCreateLoading } from '@/hooks/useCreateLoading'
import { createSystemUser, getSystemUserPage, updateSystemUser } from '@/servers/systems/user'
import { ADD_TITLE } from '@/utils/config'
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
  status: 1,
  user: { name: { test: '1234' } }
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

  const { isLoading, startLoading, endLoading } = useLoading()
  const { isCreateLoading, startCreateLoading, endCreateLoading } = useCreateLoading()

  useEffect(() => {
    getPage()
  }, [])

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
      const { data: { data } } = await getSystemUserPage(query)
      const { items, total } = data
      console.log('items:', items)
      setTotal(total || 50)
      const arr = new Array(1000).fill(0).map((item, index) => {
        return {
          id: index + 1,
          username: 'test',
          children: new Array(100).fill(0).map((_, i) => {
            return {
              id: i * 1000,
              username: 'children'
            }
          })
        }
      })
      setTableData(arr)
      // setTableData(items)
      // tables.total = total
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
      const functions = () => createId ? updateSystemUser(createId, values) : createSystemUser(values)
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
   * 操作
   */
  const options: ITableOptions<IRowData> = (value, record) => (
    <>
      <Button className='mr-5px' onClick={onCreate}>
        新增
      </Button>
      <span>{ record.id }</span>
    </>
  )

  /**
   * 处理分页
   */
  const onChangePagination = (page: number, pageSize: number) => {
    setPage(page)
    setPageSize(pageSize)
    handleSearch({ ...searchData, page, pageSize })
  }

  return (
    <>
      <BasicSearch
        list={searchList}
        data={searchData}
        isLoading={isLoading}
        onCreate={onCreate}
        handleFinish={handleSearch}
      />
      
      <BasicTable
        columns={tableColumns(options)}
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
        confirmLoading={isLoading}
        isLoading={isCreateLoading}
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
  )
}

export default User