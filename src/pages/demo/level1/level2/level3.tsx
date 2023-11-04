import { useTranslation } from 'react-i18next';

function Page() {
  const { t } = useTranslation();
  return (
    <div className="m-30px">
      { t('content.threeTierStructure') }
    </div>
  );
}

export default Page;