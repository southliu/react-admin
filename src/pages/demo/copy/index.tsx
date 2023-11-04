import { useTranslation } from 'react-i18next';
import CopyInput from '@/components/Copy/CopyInput';
import CopyBtn from '@/components/Copy/CopyBtn';

function CopyPage() {
  const { t } = useTranslation();
  return (
    <div className="max-w-350px m-10px p-5 rounded-5 bg-white">
      <h1>{ t('content.clipboard') }：</h1>
      <CopyInput className="w-350px" />

      <div className="flex items-center mt-50px">
        <span className="text-lg">{ t('content.clipboardMessage') }：</span>
        <CopyBtn text={t('public.copy')} value="admin" />
      </div>
    </div>
  );
}

export default CopyPage;