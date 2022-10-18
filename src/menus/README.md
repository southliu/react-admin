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