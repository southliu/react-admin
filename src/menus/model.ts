// 菜单数据
export interface IMenus {
  title: string;
  path: string;
  element: () => JSX.Element;
}
