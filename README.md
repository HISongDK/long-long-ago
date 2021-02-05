# 后台管理系统 


## 该从这个项目中学到什么
1. 流程及开发方法  
    + 熟悉项目的`开发流程`
    + 学会`模块化、组件化`【工程化】开发模式
    + 掌握`creat-react-app`创建脚手架初始化项目开发
    + 使用`node + mongodb + express + mongosse`开发后台应用 (这玩意跟我有什么关系)
2. react插件或第三方库
    + 掌握`react-routr-dom`配置路由开发react单页面应用
    + 学会使用`redux / react-redux / redux-thunk`管理应用组件状态
    + [ √ ] 掌握`axios / jsonp`与后端进行数据交互
    + 掌握`antd`组件库构建页面
    + 学会使用`echarts / bizecharts`实现数据可视化
    + 学会使用`react-draft-wysiwyg`实现富文本编辑器
---


## 技术选型
+ 前台数据展现/交互/组件化
> 1. react
> 2. react-router-dom
> 3. antd
> 4. redux
+ 后台应用
> 1. node
> 2. mongodb
> 3. mongoose
> 4. multer
> 5. blueimp-md5
+ 前后端交互
> * ajax请求  
    1. axios  
    2. jsonp  
    3. promise/async/await
> * 接口测试工具  
    1. postman
* 模块化
> 1. ES6  
> 2. CommonJS
* 项目构建/工程化
> 1. webpack  
> 2. creat-react-app
> 2. eslint
* 其他
> 1. 富文本编辑器  
>   a. react-draft-wysiwyg  
>   b. draft-js  
>   c. draft-to-html
> 2. 图表库
>    a. echarts
>    b. echarts-for-react

-------------------------
## 实际操作
### 使用 creat-react-app 搭建项目
```javascript
//创建脚手架
npm i -g creat-react-app        //全局安装创建脚手架工具
creat-react-app react-admin     //创建脚手架(下载模板)
cd react-admin                  //进入文件夹
npm start                       //运行项目[you build it,you run it]

//打包项目发布
npm run build                   //打包
npm install -g serve            //全局安装 serve[本地安装静态服务器]
serve build                     //运行打包程序
```

### 使用Git/GitHub建立远程版本库
```js
git init                        //初始化
git add .                       //添加暂存区
git commit -m ''                //提交版本库
GitHub上新建仓库                 //根据页面提示连接远程版本库提交
git checkout -b dev             //创建并切换分支[是从提交的版本库中新建并切换的分支,所以确保主分支先提交更改再建分支]
```
### 项目基本目录结构
/src  
|—— /api        ajax 相关  
|—— /assets     公用资源  
|—— /components 非路由组件  
|—— /config     配置文件  
|—— /pages      路由组件  
|—— /utils      工具模块  
|—— App.js      根组件  
|—— index.js    入口文件  
### 在react中使用antd
```js
// 按官方文档来
yarn add antd                    //安装最新版antd [安装之后引入,报错找不到,重跑一下就好了]
import './App.css'               //根组件引入样式
@import '~antd/dist/antd.css';   //根组件样式中引入antd样式
//本来想安装按需加载的插件,发现antd4好像不用自己配置按需加载
//自定义主题[按文档来,不赘述] 
```
### 引入路由
```js
yarn add react-router-dom        //安装react-router-dom
然后配置路由,无非是从 react-router-dom 中引入组件 BrowserRouter Switch Route 等组件配置 Route path属性指定映射路由的路径component属性指定的渲染组件。
/**
 * 只有两个一级路由
 * 1. login
 *      login 组件 主要使用antd4的Form组件 
 *      前端数据采集onFinish方法自动收集 
 *      数据校验也是Form.Item的rules数组属性配置各对象校验
 *      很方便
 * 2. admin
 */
```
### 封装 ajax 请求模块
+ 安装axios `yarn add axios`
+ 定义 ajax 函数 接收三个参数  
    * url
    * data={}
    * type="GET"
+ 判断请求方法是get还是post  
    * get 直接调用`并返回 return`axios.get()方法
        + 传入 url
        + 参数传入方法的第二个参数(配置参数):{params:data}
    * post 调用`并返回 return`axios.post(url,data)  
---
* 对 ajax 进行二次封装  
原因: 固定的接口`请求路径和方法`一致,每次请求,只需要传入不同的参数就行,所以要封装不同的接口请求模块  
    + 定义不同的接口请求模块
    + 模块中直接调用封装好的 ajax 请求 
    + 每个模块固定 url 和 type
    + 中间参数为该请求模块定义的形参,传入不同的参数  
    `重点:封装时都要返回promise,就是返回就行,本来就是promise对象(有点没太理清,以后再说)`
---
* 请求接口  
    - 没有配置,默认从当前端口请求
        + `肯定报错 404`
    - 得配置一下子
        1. 可以定义个域名端口前缀 加到请求路径前面  
        就是把路径写全
        `当然这路径对了,但是有跨域问题,不过我浏览器安装也解决跨域的插件,就不报这个问题`
        2. 在package.json中开启代理  
        添加 `"proxy":"http://localhost:5000"`  
  


### 维持、自动登录 \ 封装memory工具模块以及storage工具模块
* 首先使用自定义的 memory 模块作为数据中转，将登陆成功返回的用户信息，写入memory中的user对象，在admin页面中引入memory读取user，如果`！user || ！user.id`,说明未登录（当然，也可能是忘记把user数据存入memory模块了）**这个是刷新值就丢了，很正常，毕竟没有持久储存。所以肯定还是要用localStorage的，而且用了storage还用这个感觉有点多余了。对理解这些数据传输可能有些用处**
+ 封装 storage 存储用户信息模块  
    + 先使用原生的 localStorage 封装了一下
    + 又用了下 store.js 库封了一下（语法更简洁，不用自己来回stringfy、parse来回转格式）
    + **我现在更想练练的是通过`时间戳`给 localStorage 加上一个过期时间**  
  
### layout布局组件、拆分侧边导航和头部组件
1. 挑一个布局一样的
2. 把布局中，结构较复杂的拆出来，单独写成组件引入  
    * 小的样式改动直接jsx行内style两个大括号属性驼峰命名法就行
    * 单组件的样式，就单在组件的文件夹中创建一个样式文件引入