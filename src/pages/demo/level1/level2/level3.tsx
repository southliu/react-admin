import BasicContent from '@/components/Content/BasicContent';
import { useCommonStore } from '@/hooks/useCommonStore';
import { checkPermission } from '@/utils/permissions';
import { useTranslation } from 'react-i18next';

function Page() {
  const { t } = useTranslation();
  const { permissions } = useCommonStore();
  const isPermission = checkPermission('/demo/level', permissions);

  return (
    <BasicContent isPermission={isPermission}>
      <div className="m-30px">
        { t('content.threeTierStructure') }
      </div>
    </BasicContent>
  );
}

export default Page;
