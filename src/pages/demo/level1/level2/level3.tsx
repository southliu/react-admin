import { useTitle } from '@/hooks/useTitle';
import { useTranslation } from 'react-i18next';

function Page() {
  const { t } = useTranslation();
  useTitle(t, '三层结构');
  return (
    <div className="m-30px">三层结构</div>
  );
}

export default Page;