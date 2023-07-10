import type { FormData } from '#/form';
import type { PagePermission } from '#/public';
import type { AppDispatch } from '@/stores';
import type { FormFn } from '@/components/Form/BasicForm';
import { message, Spin } from 'antd';
import { createList } from './model';
import { getUrlParam } from '@/utils/helper';
import { useTitle } from '@/hooks/useTitle';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { checkPermission } from '@/utils/permissions';
import { getOpenMenuByRouter } from '@/menus/utils/helper';
import { setOpenKeys, setSelectedKeys } from '@/stores/menu';
import { useActivate } from 'react-activation';
import { setRefreshPage } from '@/stores/public';
import { useCommonStore } from '@/hooks/useCommonStore';
import { ADD_TITLE, EDIT_TITLE } from '@/utils/config';
import {
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';
import {
  addTabs,
  setNav,
  setActiveKey,
  closeTabGoNext
} from '@/stores/tabs';
import {
  getArticleById,
  createArticle,
  updateArticle,
} from '@/servers/content/article';
import BasicForm from '@/components/Form/BasicForm';
import BasicContent from '@/components/Content/BasicContent';
import SubmitBottom from '@/components/Bottom/SubmitBottom';

interface RecordType {
  key: string;
  title: string;
  description: string;
}

const mockData: RecordType[] = Array.from({ length: 20 }).map((_, i) => ({
  key: i.toString(),
  title: `content${i + 1}`,
  description: `description of content${i + 1}`,
}));

const initialTargetKeys = mockData.filter((item) => Number(item.key) > 10).map((item) => item.key);

// 初始化新增数据
const initCreate = {
  content: '<h4>初始化内容</h4>',
  transfer: initialTargetKeys
};

// 父路径
const fatherPath = '/content/article';

function Page() {
  const { pathname, search } = useLocation();
  const uri = pathname + search;
  const id = getUrlParam(search, 'id');
  const createFormRef = useRef<FormFn>(null);
  const dispatch: AppDispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const [createId, setCreateId] = useState('');
  const [createData, setCreateData] = useState<FormData>(initCreate);
  const [messageApi, contextHolder] = message.useMessage();

  const {
    permissions,
    isCollapsed,
    isPhone
  } = useCommonStore();
  
  const title = '文章管理';
  const createTitle = `${ADD_TITLE}${title}`;
  const updateTitle = `${EDIT_TITLE(id, title)}`;
  useTitle(id ? updateTitle : createTitle);

  // 权限前缀
  const permissionPrefix = '/content/article';

  // 权限
  const pagePermission: PagePermission = {
    create: checkPermission(`${permissionPrefix}/create`, permissions),
    update: checkPermission(`${permissionPrefix}/update`, permissions),
  };

  // 处理默认展开
  useEffect(() => {
    const newOpenKey = getOpenMenuByRouter(fatherPath);
    if (!isPhone && !isCollapsed) {
      dispatch(setOpenKeys(newOpenKey));
      dispatch(setSelectedKeys(fatherPath));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * 添加标签
   * @param path - 路径
   */
  const handleAddTab = useCallback((path = pathname) => {
    // 当值为空时匹配路由
    if (path === '/') return;

    const title = id ? updateTitle : createTitle;
    const newTab = {
      label: title,
      key: uri,
      nav: ['内容管理', '文章管理', title]
    };
    dispatch(setActiveKey(newTab.key));
    dispatch(setNav(newTab.nav));
    dispatch(addTabs(newTab));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, pathname, search]);

  useEffect(() => {
    handleAddTab();
  }, [handleAddTab]);

  useActivate(() => {
    handleAddTab();
  });

  useEffect(() => {
    id ? handleUpdate(id) : handleCreate();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** 处理新增 */
  const handleCreate = () => {
    setCreateId('');
    setCreateData(initCreate);
  };

  /**
   * 处理编辑
   * @param id - 唯一值
   */
   const handleUpdate = async (id: string) => {
    try {
      setCreateId(id);
      setLoading(true);
      const { data } = await getArticleById(id as string);
      setCreateData(data);
    } finally {
      setLoading(false);
    }
  };

  /** 表格提交 */
  const handleSubmit = () => {
    createFormRef.current?.handleSubmit();
  };

  /**
   * 返回主页
   * @param isRefresh - 返回页面是否重新加载接口
   */
  const goBack = (isRefresh?: boolean) => {
    createFormRef.current?.handleReset();
    if (isRefresh) dispatch(setRefreshPage(true));
    dispatch(closeTabGoNext({
      key: uri,
      nextPath: fatherPath
    }));
  };

  /**
   * 新增/编辑提交
   * @param values - 表单返回数据
   */
  const handleFinish = async (values: FormData) => {
    try {
      setLoading(true);
      const functions = () => createId ? updateArticle(createId, values) : createArticle(values);
      const { message } = await functions();
      messageApi.success(message || '操作成功');
      createFormRef.current?.handleReset();
      goBack(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BasicContent isPermission={id ? pagePermission.update : pagePermission.create}>
      <>
        { contextHolder }
        <div className='mb-50px'>
          <Spin spinning={isLoading}>
            <BasicForm
              formRef={createFormRef}
              list={createList}
              data={createData}
              labelCol={{ span: 5 }}
              handleFinish={handleFinish}
            />
          </Spin>
        </div>

        <SubmitBottom
          isLoading={isLoading}
          goBack={() => goBack()}
          handleSubmit={handleSubmit}
        />
      </>
    </BasicContent>
  );
}

export default Page;