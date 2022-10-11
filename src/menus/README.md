### 菜单路由说明
* 顶级key使用首字母大写的驼峰形式
* 次级都采用`顶级key/当前目录/当前页`

### 菜单路由key：
```
├─ 顶级Key(大写)
├─ 顶级key/当前目录
|    └─ 顶级key/当前目录/当前页
├─ System
|   ├─ /system/user
|   └─ /system/menu
└─ Demo
    ├─ /demo/test
    └─ /demo/level1
        └─ /demo/level1/level2
            └─ /demo/level1/level3
```