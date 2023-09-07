import { useTitle } from '@/hooks/useTitle';
import { useTranslation } from 'react-i18next';

function Page() {
  const { t } = useTranslation();
  useTitle(t, t('content.threeTierStructure'));
  return (
    <div className="m-30px">
      { t('content.threeTierStructure') }
    </div>
  );
}

export default Page;