import type { ReactNode } from 'react';
import Forbidden from '@/pages/403';

interface Props {
  isPermission?: boolean;
  children: ReactNode;
}

function BaseContent(props: Props) {
  const { isPermission, children } = props;

  return (
    <>
      {isPermission !== false && (
        <div id="content" className="p-10px">
          {children}
        </div>
      )}
      {isPermission === false && (
        <div className="h-full p-10px box-border overflow-auto">
          <Forbidden />
        </div>
      )}
    </>
  );
}

export default BaseContent;
