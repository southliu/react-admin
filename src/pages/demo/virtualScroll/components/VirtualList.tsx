import type { CSSProperties } from 'react';
import { FixedSizeList as List } from 'react-window';
import { useCommonStore } from '@/hooks/useCommonStore';
import AutoSizer from 'react-virtualized-auto-sizer';

function VirtualList() {
  const { theme } = useCommonStore();

  const Row = (
    { index, style }: { index: number, style: CSSProperties }
  ) => (
    <div
      className={`
        text-center
        ${index % 2 ? "bg-#f8f8f0" : ""}
        ${theme === 'dark' && index % 2 ? "!bg-#141414" : "" }
      `}
      style={style}
    >
      Row {index + 1}
    </div>
  );

  return (
    <AutoSizer>
      {({ height, width }: { height: number, width: number }) => (
        <>
          {
            height &&
            <List
              height={height}
              itemCount={10000}
              itemSize={35}
              width={width}
            >
              {Row}
            </List>
          }
        </>
      )}
    </AutoSizer>
  );
}

export default VirtualList;