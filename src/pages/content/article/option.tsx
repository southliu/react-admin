import { type FormInstance, message, Spin } from 'antd';
import { createList } from './model';
import { getUrlParam } from '@/utils/helper';
import { useShallow } from 'zustand/react/shallow';
import { useAliveController } from 'react-activation';
import {
  getArticleById,
  createArticle,
  updateArticle,
} from '@/servers/content/article';

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
  const navigate = useNavigate();
  const uri = pathname + search;
  const id = getUrlParam(search, 'id');
  const createFormRef = useRef<FormInstance>(null);
  const [isLoading, setLoading] = useState(false);
  const [createId, setCreateId] = useState('');
  const [createData, setCreateData] = useState<BaseFormData>(initCreate);
  const [messageApi, contextHolder] = message.useMessage();
  const { permissions } = useCommonStore();
  const { refresh } = useAliveController();
  const closeTabGoNext = useTabsStore(useShallow(state => state.closeTabGoNext));
  const setRefreshPage = usePublicStore(useShallow(state => state.setRefreshPage));
  useSingleTab(fatherPath, id ? '编辑文章管理' : '新增文章管理');

  // 权限前缀
  const permissionPrefix = '/content/article';

  // 权限
  const pagePermission: PagePermission = {
    create: checkPermission(`${permissionPrefix}/create`, permissions),
    update: checkPermission(`${permissionPrefix}/update`, permissions),
  };

  useEffect(() => {
    if (id) {
      handleUpdate(id);
    } else {
      handleCreate();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 异步添加富文本组件
  useLayoutEffect(() => {
    addComponent('RichEditor', WangEditor);
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
      const { code, data } = await getArticleById(id);
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
    if (isRefresh) setRefreshPage(true);
    closeTabGoNext({
      key: uri,
      nextPath: fatherPath,
      navigate,
      refresh
    });
  };

  /**
   * 新增/编辑提交
   * @param values - 表单返回数据
   */
  const handleFinish = async (values: BaseFormData) => {
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
    <BaseContent isPermission={id ? pagePermission.update : pagePermission.create}>
      { contextHolder }
      <BaseCard>
        <div className='mb-50px'>
          <Spin spinning={isLoading}>
            <BaseForm
              ref={createFormRef}
              list={createList(t)}
              data={createData}
              labelCol={{ span: 5 }}
              handleFinish={handleFinish}
            />
          </Spin>
        </div>
      </BaseCard>

      <SubmitBottom
        isLoading={isLoading}
        goBack={() => goBack()}
        handleSubmit={handleSubmit}
      />
    </BaseContent>
  );
}

export default Page;
