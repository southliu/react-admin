import type { CSSProperties } from 'react'
import { FixedSizeList as List } from 'react-window'
import AutoSizer from 'react-virtualized-auto-sizer'

function VirtualScroll() {
  const Row = (
    { index, style }: { index: number, style: CSSProperties }
  ) => (
    <div className={index % 2 ? "bg-#f8f8f0" : ""} style={style}>
      Row {index}
    </div>
  )

  return (
    <div className="h-500px w-300px m-30px border border-cool-gray-100">
      <AutoSizer>
        {({ height, width }) => (
          <List
            height={height}
            itemCount={1000}
            itemSize={35}
            width={width}
          >
            {Row}
          </List>
        )}
      </AutoSizer>
    </div>
  )
}

export default VirtualScroll