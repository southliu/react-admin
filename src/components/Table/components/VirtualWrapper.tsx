import type { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';
import { useContext } from 'react';
import { ScrollContext } from '../utils/state';

type Props = DetailedHTMLProps<HTMLAttributes<HTMLTableSectionElement>, HTMLTableSectionElement>

 function VirtualWrapper(props: Props): JSX.Element {
  const { children, ...restProps } = props;
  const { renderLen, start, offsetStart } = useContext(ScrollContext);
  let tempNode = null;

  if (children && children !== null) {
    const contents = (children as ReactNode[])?.[1];

    if (Array.isArray(contents) && contents.length) {
      tempNode = [
        (children as ReactNode[])?.[0],
        contents.slice(start, start + renderLen).map(item => {
          if (Array.isArray(item)) {
            // 兼容antd v4.3.5 --- rc-table 7.8.1及以下
            return item[0];
          } 
          // 处理antd ^v4.4.0  --- rc-table ^7.8.2
          return item;
          
        })
      ];
    } else {
      tempNode = children;
    }
  }

  return (
    <tbody
      {...restProps}
      style={{ transform: `translateY(-${offsetStart}px)` }}
    >
      {tempNode}
    </tbody>
  );
}

export default VirtualWrapper;