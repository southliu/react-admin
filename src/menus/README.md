### 菜单路由说明
* 顶级key使用顶级目录名
* 次级都采用`/顶级key/当前目录/当前页`
* 菜单key为跳转路由地址，需与文件目录结构相符

### 菜单路由key：
```
├─ 顶级Key
| └─ /顶级key/当前目录
|    └─ /顶级key/当前目录/当前页
├─ system
|   ├─ /system/user
|   └─ /system/menu
└─ demo
    ├─ /demo/test
    └─ /demo/level1
        └─ /demo/level1/level2
            └─ /demo/level1/level3
```

### 静态菜单方法：
如果需要静态菜单将/src/hooks/useCommonStore.ts中的useCommonStore中的menuList改为defaultMenus。
```js
// src/hooks/useCommonStore.ts
import { defaultMenus } from '@/menus';

// const menuList = useMenuStore(state => state.menuList);
// 菜单数据
const menuList = defaultMenus;
```

### 菜单icon：
参考 [iconify官方地址](https://icon-sets.iconify.design/)

### 外链菜单：
将key设为一个url地址，前缀为`http`或`https`，则视为外链菜单，点击后直接跳转。
