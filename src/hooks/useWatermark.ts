// import { shallowRef } from "vue";

interface IOption {
  content: string;
  height: number;
  width: number;
  rotate: number;
  color: string;
  fontSize: number;
  opacity: number;
}

/**
 * 水印
 * @param content - 内容
 * @param height - 水印行高
 * @param width - 水印宽度
 * @param rotate - 旋转度数（可为负值）
 * @param color - 水印字体颜色
 * @param fontSize - 水印字体的大小
 * @param opacity - 水印透明度（0~1之间取值）
 */
export function useWatermark() {
  /**
   * 水印
   * @param text - 水印显示值
   */
  const Watermark = (options: IOption) => {
    const {
      content,
      height,
      width,
      rotate,
      color,
      fontSize,
      opacity
    } = options

    // 判断水印是否存在，如果存在，那么不执行
    if (document.getElementById('south_watermark') !== null) {
      return
    }
    const TpLine = Math.floor(document.body.clientWidth / width) * 2 // 一行显示几列
    let StrLine = ''
    for (let i = 0; i < TpLine; i++) {
      const style = `
        display: inline-block;
        line-height: ${height}px;
        width: ${width}px;
        text-align: center;
        transform:rotate( ${rotate}deg);
        color: ${color};
        font-size: ${fontSize}px;
        opacity: ${opacity};
        `
      StrLine += `
        <span style="${style}">
          ${content}
        </span>
      `
    }
    const DivLine = document.createElement('div')
    DivLine.innerHTML = StrLine

    const TpColumn = Math.floor(document.body.clientHeight / height) * 2 // 一列显示几行
    let StrColumn = ''
    for (let i = 0; i < TpColumn; i++) {
      StrColumn += `<div style="white-space: nowrap;">${DivLine.innerHTML}</div>`
    }
    const DivLayer = document.createElement('div')
    DivLayer.innerHTML = StrColumn
    DivLayer.id = 'south_watermark' // 给水印盒子添加类名
    DivLayer.style.position = 'fixed'
    DivLayer.style.top = '0px' // 整体水印距离顶部距离
    DivLayer.style.left = '-100px' // 改变整体水印的left值
    DivLayer.style.zIndex = '99999' // 水印页面层级
    DivLayer.style.pointerEvents = 'none'
    DivLayer.style.userSelect = 'none'

    document.body.appendChild(DivLayer) // 到页面中
  }

  /** 删除水印 */
  const RemoveWatermark = () => {
    // 判断水印是否存在，如果存在，那么执行
    if (document.getElementById('south_watermark') === null) {
      return
    } 
    if (document.getElementById('south_watermark') !== null) {
      const element = document.getElementById('south_watermark')
      document.body.removeChild(element as HTMLElement)
    }
  }

  return { Watermark, RemoveWatermark }
}