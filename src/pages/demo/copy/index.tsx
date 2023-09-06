import { useTitle } from '@/hooks/useTitle';
import { useTranslation } from 'react-i18next';
import CopyInput from '@/components/Copy/CopyInput';
import CopyBtn from '@/components/Copy/CopyBtn';

function CopyPage() {
  const { t } = useTranslation();
  useTitle(t, '剪切板');
  return (
    <div className="max-w-350px m-10px p-5 rounded-5 bg-white">
      <h1>剪切板：</h1>
      <CopyInput className="w-350px" />

      <div className="flex items-center mt-50px">
        <span className="text-lg">将“admin”传入复制按钮中：</span>
        <CopyBtn text={t('public.copy')} value="admin" />
      </div>
    </div>
  );
}

export default CopyPage;