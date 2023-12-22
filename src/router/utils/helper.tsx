import type { RouteObject } from 'react-router-dom';
import type { DefaultComponent } from "@loadable/component";
import { Skeleton } from 'antd';
import { ROUTER_EXCLUDE } from './config';
import loadable from '@loadable/component';

/**
 * 路由添加layout
 * @param routes - 路由数据
 */
export function layoutRoutes(routes: RouteObject[]): RouteObject[] {
  const layouts: RouteObject[] = []; // layout内部组件

  for (let i = 0; i < routes.length; i++) {
    const { path } = routes[i];
    // 路径为登录页不添加layouts
    if (path !== 'login') {
      layouts.push(routes[i]);
    }
  }

  return layouts;
}

/**
 * 处理路由
 * @param routes - 路由数据
 */
export function handleRoutes(routes: Record<string, () => Promise<DefaultComponent<unknown>>>): RouteObject[] {
  const layouts: RouteObject[] = []; // layout内部组件

  for (const key in routes) {
    // 是否在排除名单中
    const isExclude = handleRouterExclude(key);
    if (isExclude) continue;

    const path = getRouterPage(key);
    if (path === '/login') continue;

    const ComponentNode = loadable(routes[key], {
      fallback: <Skeleton
        active
        className='p-30px'
        paragraph={{ rows: 10 }}
       />
    });

    layouts.push({
      path,
      element: <ComponentNode />
    });
  }

  return layouts;
}

/**
 * 匹配路由是否在排查名单中
 * @param path - 路径
 */
function handleRouterExclude(path: string): boolean {
  for (let i = 0; i < ROUTER_EXCLUDE.length; i++) {
    let item = ROUTER_EXCLUDE[i];

    // 如果不是文件类型则转为文件夹
    if (!item.includes('.')) {
      item = `/${item}/`;
    }

    if (path.includes(item)) return true;
  }

  return false;
}

/**
 * 获取路由路径
 * @param path - 路径
 */
function getRouterPage(path: string): string {
  // 获取page数据后面数据
  const pageIndex = path.indexOf('pages') + 5;
  // 文件后缀
  const lastIndex = path.lastIndexOf('.');
  // 去除pages和文件后缀
  let result = path.substring(pageIndex, lastIndex);

  // 如果是首页则直接返回/
  if (result === '/index') return '/';

  // 如果结尾是index则去除
  if (result.includes('index')) {
    const indexIdx = result.lastIndexOf('index') + 5;
    if (indexIdx === result.length) {
      result = result.substring(0, result.length - 6);
    }
  }

  return result;
}
