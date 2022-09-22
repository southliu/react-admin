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
  // const [tableTotal, setTableTotal] = useState(1)
  const [tableData, setTableData] = useState<IFormData[]>([])

  const { isLoading, startLoading, endLoading } = useLoading()
  const { isCreateLoading, startCreateLoading, endCreateLoading } = useCreateLoading()

  useEffect(() => {
    getPage()
  }, [])

  /** 获取表格数据 */
  const getPage = async () => {
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
      console.log('total:', total)
      setTableData(items)
      // tables.data = items
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
  const options: ITableOptions = (value, record) => (
    <>
      <Button className='mr-5px' onClick={onCreate}>
        新增
      </Button>
      <span>{ (record as { id: string }).id }</span>
    </>
  )

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