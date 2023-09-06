import { Button } from 'antd';
import { useTitle } from '@/hooks/useTitle';
import { useTranslation } from 'react-i18next';
import { useWatermark } from '@/hooks/useWatermark';

function Watermark() {
  const { t } = useTranslation();
  useTitle(t, '水印');
  const [Watermark, RemoveWatermark] = useWatermark();
  
  const openWatermark = () => {
    Watermark({
      content: '这是水印',
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
        打开水印
      </Button>
      <Button danger onClick={hidWatermark}>
        隐藏水印
      </Button>
    </div>
  );
}

export default Watermark;