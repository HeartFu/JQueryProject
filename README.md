# jQuery-project

> jQuery项目, 使用webpack进行构建

## 项目结构
```
.
├── package.json  --------------------- 项目配置
├── README.md  ------------------------ 说明文件
├── build  ---------------------------- webpack配置文件
├── config ---------------------------- webpack自定义配置文件
├── .babelrc  ------------------------- babel的配置文件
├── .gitignore  ----------------------- git上传时需要忽略文件的配置
└── src  ------------------------------ 源码目录
    ├── assets  ----------------------- 项目资源文件目录（图片、字体等）
    ├── i18n  ------------------------- 国际化文件
    ├── fetch  ------------------------ ajax请求管理文件
    ├──   └── api  -------------------- 请求配置 (axios ajax配置管理文件)
    ├── pages  ------------------------ 页面集合目录
    ├── js  --------------------------- 公共js文件
    └── lib  -------------------------- 三方库
```

## 环境准备
```
# 安装依赖
npm install

# 启动本地调试
npm run dev

# 本地打包压缩
npm run build

```


## 使用方法
### 1、增加页面

1、在pages中增加对应的文件夹，名称为所需要的名称
2、在config文件夹中的entry.js中配置相关信息，如下
	若html需要加载对应的自定义的js，则在entry中增加入口文件对应的js，若不需要，则不需要添加，例子如下：
	
	{
		index: ['babel-polyfill', './src/pages/index/index.js'],
	}
	
babel-polyfill为将ES6的语法编译成ES5的语法。
4、在config文件夹中的pageConfig.js中配置相关信息，例子如下：

	{
        _html: 'index',
        path: '',
        title: '首页',
        chunks: ['index']
    }
_html：新增的页面的文件夹名称
path：新增的页面的路径，若不填，则为根目录，及src/pages
title：页面的标签显示信息
chunks：包含的文件，可以entry和其他模块chunk的模块，插件导入到模板时没有排序，但都是。

### axios插件的使用
axios为前后端交互使用的三方件，即ajax异步请求插件
使用方法如下：
1、在src/fetch文件夹下的apis.js中添加配置

``` bash
export default {
    requestName: conversion('requestURL', 'requestType'),
}
```
requestName：请求的名称，用户自定义
requestURL：请求的URL，如：blockChain/query
requestType：请求的类型，分为：post/get/delete/put
2、需要使用的时候则需要引入fetch下的index文件文件
``` bash
import apis from '../../fetch/'
```
3、获取后台请求
``` bash
demo = async () => {
	const res = await apis.requestName({
		id: '1',
		name: 'helloworld'
	})
}
```
使用时需要使用await关键字对请求进行同步等待，外层的函数需要使用async关键字进行异步的标识。

### 国际化使用i18next
i18next是一款通用的国际化插件
使用方法如下：
1、可以直接在src/i18n目录下的zh.js和en.js两个文件中增加中文英文的信息，也可以建立自己模块的文件夹。
实例：
a、直接在zh.js和en.js中添加信息
``` bash
# zh.js
export default {
    "key": '你好世界'
}

# en.js
export default {
	"key": 'hello world'
}

# 使用 pages/index.js
import i18next from 'i18next'
…………
const i18nValue = i18next.t('key') 
```

b、自己建立模块文件夹
``` bash
# demo/zh.js
export default {
	"key": '你好世界'
}
# demo/en.js
export default {
	"key": 'hello world'
}

# zh.js
import demo from './demo/zh'
export default {
	demo,
}

# en.js
import demo from './demo/en'
export default {
	demo,
}

# 使用 pages/index.js
import i18next from 'i18next'
…………
const i18nValue = i18next.t('demo.key') 
```

### 时间格式转换 moment
时间格式转换插件moment，可以通过moment强大的功能提供各种各样的时间转换，计算等等。
地址：http://momentjs.cn/