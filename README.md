<div align="center">
	<h1>React Admin</h1>
</div>

[![license](https://img.shields.io/badge/license-MIT-green.svg)](./LICENSE) ![](https://img.shields.io/github/stars/southliu/south-admin)

## ✨ 简介

使用`React18`,`Typescript`,`Vite`,`Antd5.0`等主流技术开发的开箱即用的中后台前端项目，`Vite`实现自动生成路由，支持`KeepAlive`功能，`zustand`状态管理，支持虚拟滚动表格，`UnoCss`开发样式。

## 🚀 项目演示
[演示地址](https://southliu.github.io/)

![01.gif](https://github.com/southliu/github-static/blob/main/react-admin/01.gif)

![02.gif](https://github.com/southliu/github-static/blob/main/react-admin/02.gif)

| ![03.gif](https://github.com/southliu/github-static/blob/main/react-admin/03.gif) | ![04.gif](https://github.com/southliu/github-static/blob/main/react-admin/04.gif) |
| --- | --- |

## 💻 安装使用

- 获取项目代码

```bash
git clone https://github.com/southliu/react-admin.git
```

- 选择目录

```bash
cd react-admin
```

- 安装全局依赖依赖，存在则不用安装

```bash
npm i -g pnpm
```

- 安装依赖
```bash
pnpm install -w
```
##### 如果使用pnpm安装依赖出现安装失败问题，请使用梯子、yarn安装或切换淘宝源。
```bash
pnpm config set registry https://registry.npmmirror.com
```

- 运行

```bash
pnpm dev
```

- 打包

```bash
pnpm build
```

## 🧩 图标(iconify)

- 参考 [iconify官方地址](https://icon-sets.iconify.design/)
- VS Code安装Iconify IntelliSense - 图标内联显示和自动补全

## 🎗️ Git 提交示例
### Git提交不规范会导致无法提交，`feat`关键字可以按照下面`Git 贡献提交规范`来替换。
```
git add .
git commit -m "feat: 新增功能"
git push
```
### 按照以上规范依旧无法提交代码，请在终端执行`npx husky install`之后重新提交。

## 🎯 Git 贡献提交规范

- 参考 [vue](https://github.com/vuejs/vue/blob/dev/.github/COMMIT_CONVENTION.md) 规范

  - `feat` 增加新功能
  - `fix` 修复问题/BUG
  - `style` 代码风格相关无影响运行结果的
  - `perf` 优化/性能提升
  - `refactor` 重构
  - `revert` 撤销修改
  - `test` 测试相关
  - `docs` 文档/注释
  - `chore` 依赖更新/脚手架配置修改等
  - `workflow` 工作流改进
  - `ci` 持续集成
  - `types` 类型定义文件更改
  - `wip` 开发中

## 🐵 关于封装
  1. 功能扩展，在原有的api上拓展。
  2. 功能整合，合并两个或两个以上组件的api。
  3. 样式统一，避免后期样式变动，导致牵一发而动全身。
  4. 公共组件二次封装或常用组件使用**Base**开头，便于区分。

## 📕 Q&A常见问题
#### 1. 页面权限如何配置？
1. 通过登录接(/login/v2)或重新授权接口(/authority/user/refresh-permissions/v2)获取permissions权限数据。
2. 通过菜单接口(/menu/list/v3)获取data中的rule权限数据，这个rule数据影响菜单显示，如果没返回rule则一直都显示。
3. 页面内权限参考src/pages/system/menu.index.tsx文件内的pagePermission数据，pagePermission.page是显示页面的权限，根据第一点返回的permissions进行匹配。

#### 2. 路由如何配置？
路由根据文件夹路径自动生成，路径包含以下文件名或文件夹名称则不生成：

* components
* utils
* lib
* hooks
* model.tsx
* 404.tsx

可自行在 src/router/utils/config.ts 修改路由生成规则。

#### 3. 菜单如何配置？
提供了两种方式配置菜单：
1. 动态菜单，通过菜单接口(/menu/list/v3)获取菜单数据。
2. 静态菜单，需要静态菜单将/src/hooks/useCommonStore.ts中的useCommonStore中的menuList改为defaultMenus。
```js
// src/hooks/useCommonStore.ts
import { defaultMenus } from '@/menus';

// const menuList = useMenuStore(state => state.menuList);
// 菜单数据
const menuList = defaultMenus;
```

#### 4. @south/xxx依赖在哪查看？
通过根目录`packages`文件中查看对于xxx文件的源码进行修改。

#### 5. 安装新依赖时报错？
使用了monorepo项目安装新依赖时需要在后面添加`-w`或`--workspace`，否则会报错，比如：`pnpm i mobx -w`。

## 🧡 捐赠
如果您觉得这个项目对您有帮助，您可以帮作者买一杯咖啡表示支持!

| 微信 | 支付宝 |
| --- | --- |
| <img src="https://github.com/southliu/github-static/blob/main/pay/wechat.jpg" width="250" alt="wechat"> | <img src="https://github.com/southliu/github-static/blob/main/pay/alipay.jpg" width="250" alt="alipay">  |
