/**
 * 键盘按键事件
 * @param options
 */
interface IOptions {
  ArrowUp?: () => void;
  ArrowDown?: () => void;
  ArrowLeft?: () => void;
  ArrowRight?: () => void;
  Enter?: () => void;
}
export function useKeyStroke(options: IOptions) {
  /**
   * 点击按键
   * @param even - 按键事件
   */
  const onKeyDown = (even: KeyboardEvent) => {
    switch (even.key) {
      // 上
      case 'ArrowUp':
        options.ArrowUp?.()
        break

      // 下
      case 'ArrowDown':
        options.ArrowDown?.()
        break

      // 左
      case 'ArrowLeft':
        options.ArrowLeft?.()
        break

      // 右
      case 'ArrowRight':
        options.ArrowRight?.()
        break

      // 回车
      case 'Enter':
        options.Enter?.()
        break

      default:
        break
    }
  }

  return { onKeyDown }
}
