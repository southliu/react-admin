import type { FormData } from '#/form';
import type { PagePermission, TableOptions } from '#/public';
import type { FormFn } from '@/components/Form/BasicForm';
import { useCallback, useEffect, useRef, useState } from 'react';
import { searchList, createList, tableColumns } from './model';
import { message } from 'antd';
import { useTitle } from '@/hooks/useTitle';
import { useTranslation } from 'react-i18next';
import { checkPermission } from '@/utils/permissions';
import { useCommonStore } from '@/hooks/useCommonStore';
import { ADD_TITLE, EDIT_TITLE } from '@/utils/config';
import { UpdateBtn, DeleteBtn } from '@/components/Buttons';
import {
  getMenuPage,
  getMenuById,
  createMenu,
  updateMenu,
  deleteMenu
} from '@/servers/system/menu';
import BasicContent from '@/components/Content/BasicContent';
import BasicSearch from '@/components/Search/BasicSearch';
import BasicModal from '@/components/Modal/BasicModal';
import BasicForm from '@/components/Form/BasicForm';
import BasicTable from '@/components/Table/BasicTable';
import BasicPagination from '@/components/Pagination/BasicPagination';

// 当前行数据
interface RowData {
  id: string;
}

// 初始化搜索数据
const initSearch = {
  page: 1,
  pageSize: 20
};

// 初始化新增数据
const initCreate = {
  status: 1
};

function Page() {
  const { t } = useTranslation();
  useTitle(t, t('system.menuTitle'));
  const searchFormRef = useRef<FormFn>(null);
  const createFormRef = useRef<FormFn>(null);
  const [isCreateOpen, setCreateOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isCreateLoading, setCreateLoading] = useState(false);
  const [createTitle, setCreateTitle] = useState(ADD_TITLE(t));
  const [createId, setCreateId] = useState('');
  const [createData, setCreateData] = useState<FormData>(initCreate);
  const [page, setPage] = useState(initSearch.page);
  const [pageSize, setPageSize] = useState(initSearch.pageSize);
  const [total, setTotal] = useState(0);
  const [tableData, setTableData] = useState<FormData[]>([]);
  const [messageApi, contextHolder] = message.useMessage();
  const { permissions } = useCommonStore();

  // 权限前缀
  const permissionPrefix = '/authority/menu';

  // 权限
  const pagePermission: PagePermission = {
    page: checkPermission(`${permissionPrefix}/index`, permissions),
    create: checkPermission(`${permissionPrefix}/create`, permissions),
    update: checkPermission(`${permissionPrefix}/update`, permissions),
    delete: checkPermission(`${permissionPrefix}/delete`, permissions)
  };

  /**
   * 点击搜索
   * @param values - 表单返回数据
   */
  const onSearch = (values: FormData) => {
    setPage(1);
    handleSearch({ page: 1, pageSize, ...values });
  };

  /**
   * 处理搜索
   * @param values - 表单返回数据
   */
  const handleSearch = useCallback(async (values: FormData) => {
    try {
      setLoading(true);
      const res = await getMenuPage(values);
      const { code, data } = res;
      if (Number(code) !== 200) return;
      const { items, total } = data;
      setTotal(total);
      setTableData(items);
    } finally {
      setLoading(false);
    }
  }, []);

  // 首次进入自动加载接口数据
  useEffect(() => { 
    if (pagePermission.page) handleSearch({ ...initSearch });
    // TODO: 重复请求测试，可删
    if (pagePermission.page) handleSearch({ ...initSearch });
  }, [handleSearch, pagePermission.page]);

  /** 点击新增 */
  const onCreate = () => {
    setCreateOpen(true);
    setCreateTitle(ADD_TITLE(t));
    setCreateId('');
    setCreateData(initCreate);
  };

  /**
   * 点击编辑
   * @param id - 唯一值
   */
  const onUpdate = async (id: string) => {
    try {
      setCreateOpen(true);
      setCreateTitle(EDIT_TITLE(t, id));
      setCreateId(id);
      setCreateLoading(true);
      const { code, data } = await getMenuById(id as string);
      if (Number(code) !== 200) return;
      setCreateData(data);
    } finally {
      setCreateLoading(false);
    }
  };

  /** 表单提交 */
  const createSubmit = () => {
    createFormRef.current?.handleSubmit();
  };

  /** 关闭新增/修改弹窗 */
  const closeCreate = () => {
    setCreateOpen(false);
  };

  /** 获取表格数据 */
  const getPage = () => {
    const formData = searchFormRef.current?.getFieldsValue() || {};
    const params = { ...formData, page, pageSize };
    handleSearch(params);
  };

  /**
   * 新增/编辑提交
   * @param values - 表单返回数据
   */
  const handleCreate = async (values: FormData) => {
    try {
      setCreateLoading(true);
      const functions = () => createId ? updateMenu(createId, values) : createMenu(values);
      const { code, message } = await functions();
      if (Number(code) !== 200) return;
      messageApi.success(message || t('public.successfulOperation'));
      setCreateOpen(false);
      getPage();
    } finally {
      setCreateLoading(false);
    }
  };

  /**
   * 点击删除
   * @param id - 唯一值
   */
  const onDelete = async (id: string) => {
    try {
      setLoading(true);
      const { code, message } = await deleteMenu(id as string);
      if (Number(code) === 200) {
        messageApi.success(message || t('public.successfullyDeleted'));
        getPage();
      }
    } finally {
      setLoading(false);
    }
  };

  /**
   * 处理分页
   * @param page - 当前页数
   * @param pageSize - 每页条数
   */
  const onChangePagination = useCallback((page: number, pageSize: number) => {
    setPage(page);
    setPageSize(pageSize);
    const formData = searchFormRef.current?.getFieldsValue();
    handleSearch({ ...formData, page, pageSize });
  }, [handleSearch]);

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
  );

  return (
    <BasicContent isPermission={pagePermission.page}>
      <>
        { contextHolder }
        <BasicSearch
          formRef={searchFormRef}
          list={searchList(t)}
          data={initSearch}
          isLoading={isLoading}
          isCreate={pagePermission.create}
          onCreate={onCreate}
          handleFinish={onSearch}
        />
        
        <BasicTable
          loading={isLoading}
          columns={tableColumns(t, optionRender)}
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
          width={600}
          title={createTitle}
          open={isCreateOpen}
          confirmLoading={isCreateLoading}
          onOk={createSubmit}
          onCancel={closeCreate}
        >
          <BasicForm
            formRef={createFormRef}
            list={createList(t, createId)}
            data={createData}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 19 }}
            handleFinish={handleCreate}
          />
        </BasicModal>
      </>
    </BasicContent>
  );
}

export default Page;