import { Button } from 'antd';
import { useTranslation } from 'react-i18next';
import { useWatermark } from '@/hooks/useWatermark';

function Watermark() {
  const { t } = useTranslation();
  const [Watermark, RemoveWatermark] = useWatermark();
  
  const openWatermark = () => {
    Watermark({
      content: t('content.watermark'),
      height: 300,
      width: 350,
      rotate: -20,
      color: '#000',
      fontSize: 30,
      opacity: .07
    });
  };

  const hidWatermark = () => {
    RemoveWatermark();
  };

  return (
    <div className="p-30px">
      <Button onClick={openWatermark}>
        { t('content.openWatermark') }
      </Button>
      <Button danger onClick={hidWatermark}>
        { t('content.hideWatermark') }
      </Button>
    </div>
  );
}

export default Watermark;