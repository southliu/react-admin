import type { FormData } from '#/form';
import type { PagePermission } from '#/public';
import type { AppDispatch } from '@/stores';
import { type FormInstance, message, Spin } from 'antd';
import { createList } from './model';
import { getUrlParam } from '@/utils/helper';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { checkPermission } from '@/utils/permissions';
import { setRefreshPage } from '@/stores/public';
import { useCommonStore } from '@/hooks/useCommonStore';
import {
  useEffect,
  useRef,
  useState
} from 'react';
import { closeTabGoNext } from '@/stores/tabs';
import {
  getArticleById,
  createArticle,
  updateArticle,
} from '@/servers/content/article';
import BasicForm from '@/components/Form/BasicForm';
import BasicContent from '@/components/Content/BasicContent';
import SubmitBottom from '@/components/Bottom/SubmitBottom';
import { useSingleTab } from '@/hooks/useSingleTab';
import BasicCard from '@/components/Card/BasicCard';

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
  const { t } = useTranslation();
  const { pathname, search } = useLocation();
  const uri = pathname + search;
  const id = getUrlParam(search, 'id');
  const createFormRef = useRef<FormInstance>(null);
  const dispatch: AppDispatch = useDispatch();
  const [isLoading, setLoading] = useState(false);
  const [createId, setCreateId] = useState('');
  const [createData, setCreateData] = useState<FormData>(initCreate);
  const [messageApi, contextHolder] = message.useMessage();
  const { permissions } = useCommonStore();
  useSingleTab(fatherPath);

  // 权限前缀
  const permissionPrefix = '/content/article';

  // 权限
  const pagePermission: PagePermission = {
    create: checkPermission(`${permissionPrefix}/create`, permissions),
    update: checkPermission(`${permissionPrefix}/update`, permissions),
  };

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
      const { code, data } = await getArticleById(id as string);
      if (Number(code) !== 200) return;
      setCreateData(data);
    } finally {
      setLoading(false);
    }
  };

  /** 表格提交 */
  const handleSubmit = () => {
    createFormRef.current?.submit();
  };

  /**
   * 返回主页
   * @param isRefresh - 返回页面是否重新加载接口
   */
  const goBack = (isRefresh?: boolean) => {
    createFormRef.current?.resetFields();
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
      const { code, message } = await functions();
      if (Number(code) !== 200) return;
      messageApi.success(message || t('public.successfulOperation'));
      createFormRef.current?.resetFields();
      goBack(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BasicContent isPermission={id ? pagePermission.update : pagePermission.create}>
      { contextHolder }
      <BasicCard>
        <div className='mb-50px'>
          <Spin spinning={isLoading}>
            <BasicForm
              ref={createFormRef}
              list={createList(t)}
              data={createData}
              labelCol={{ span: 5 }}
              handleFinish={handleFinish}
            />
          </Spin>
        </div>
      </BasicCard>

      <SubmitBottom
        isLoading={isLoading}
        goBack={() => goBack()}
        handleSubmit={handleSubmit}
      />
    </BasicContent>
  );
}

export default Page;
