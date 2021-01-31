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
    + 掌握`axios / jsonp`与后端进行数据交互
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
-----------------------
-----------------------
-----------------------
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
git checkout -b dev             //创建并切换分支
```