import { useTitle } from '@/hooks/useTitle';

function Page() {
  useTitle('三层结构');
  return (
    <div className="m-30px">三层结构</div>
  );
}

export default Page;