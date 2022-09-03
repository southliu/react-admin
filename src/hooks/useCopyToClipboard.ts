import { message } from "antd"

/**
 * 剪切板
 * @param text - 复制内容
 */
export const useCopyToClipboard = (text: string) => {
  // 创建一个文本域 
  const textArea = document.createElement('textarea')
  // 隐藏掉这个文本域，使其在页面上不显示	
  textArea.style.position = 'fixed'
  textArea.style.visibility = '-10000px'
  // 将需要复制的内容赋值给文本域
  textArea.value = text
  // 将这个文本域添加到页面上
  document.body.appendChild(textArea)
  // 添加聚焦事件，写了可以鼠标选取要复制的内容
  textArea.focus()
  // 选取文本域内容
  textArea.select()

  if (!document.execCommand('copy')) { // 检测浏览器是否支持这个方法
    message.warn({ content: '浏览器不支持复制功能', key: 'copyWarn' })
    // 复制失败将构造的标签 移除
    document.body.removeChild(textArea)
    return false
  } 
  message.success({ content: "复制成功", key: 'copySuccess' })
  // 复制成功后再将构造的标签 移除
  document.body.removeChild(textArea)
  return true
}