import BasicCard from '@/components/Card/BasicCard';
import { useParams } from 'react-router-dom';

function Dynamic() {
  const { id } = useParams();

  return (
    <BasicCard className='mt-10px mx-5px'>
      <div>/demo/123/dynamic中的123为动态参数，可自由修改，文件路径为：/demo/[id]/dynamic。</div>
      <div>id: <span className='font-bold'>{ id }</span></div>
    </BasicCard>
  );
}

export default Dynamic;
