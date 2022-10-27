
## 安装使用

- 获取项目代码

```bash
git clone https://github.com/Southliu/react-admin.git
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
pnpm install
```

- 运行

```bash
pnpm dev
```

- 打包

```bash
pnpm build
```

## 计划

- [ ] 主题换肤功能
- [x] 密码强度显示
- [x] keepalive功能
- [ ] useCallback和useMemo优化
- [ ] form添加富文本、自定义渲染
- [ ] 表格虚拟滚动优化
- [ ] 表格根据可视区域计算高度
- [ ] IAllDataType类修改
- [ ] 新增跳转单独页逻辑
- [ ] 跳转首页权限判断
- [ ] 去除react-redux，使用原生useContext
- [ ] 手机端适配
- [ ] mock数据
- [ ] 测试代码
- [ ] wangeditor分包和antd css分包
- [x] 打包分包

## 图标(iconify)

- 参考 [iconify官方地址](https://icon-sets.iconify.design/)
- VS Code安装Iconify IntelliSense - 图标内联显示和自动补全

## Git 提交示例
### Git提交不规范会导致无法提交，`feat`关键字可以按照下面`Git 贡献提交规范`来替换。
```
git add .
git commit -m "feat: 新增功能"
git push
```

## Git 贡献提交规范

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

- 如果无法运行commitlint，请运行以下指令：

```
  npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'
```

## 关于封装
  1. 功能扩展，在原有的api上拓展。
  2. 功能整合，合并两个或两个以上组件的api。
  3. 样式统一，避免后期样式变动，导致牵一发而动全身。
  4. 公共组件二次封装或常用组件使用**Basic**开头，便于区分。
