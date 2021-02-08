# 后台管理系统 


## 该从这个项目中学到什么
1. 流程及开发方法  
    + 熟悉项目的`开发流程`
    + 学会`模块化、组件化`【工程化】开发模式
    + 掌握`creat-react-app`创建脚手架初始化项目开发
    + 使用`node + mongodb + express + mongosse`开发后台应用 (这玩意跟我有什么关系)
2. react插件或第三方库
    + [ √ ] 掌握`react-routr-dom`配置路由开发react单页面应用
    + 学会使用`redux / react-redux / redux-thunk`管理应用组件状态
    + [ √ ] 掌握`axios / jsonp`与后端进行数据交互
    + 掌握`antd`组件库构建页面
    + 学会使用`echarts / bizecharts`实现数据可视化
    + 学会使用`react-draft-wysiwyg`实现富文本编辑器
---


## 技术选型
|序号|前台|后台|交互|模块化|项目构建|其他|
|-|-|-|-|-|-|-|
|1 | react | node |`ajax请求`|ES6|webpack|`富文本编辑器`
|2 | react-router-dom | mongodb |1.axios   `2.jsonp`  3.promise  `async`  await|commonJS|creat-react-app|**`1`**. react-draft-wysiwyg  **`2`**. draft-js    **`3`**. draft-to-html
|3 | antd | mongoose |`接口测试工具`||eslint|`图表库`
|4 | redux | multer |postman|||1. echarts  2. echarts-for-react
|5 |  | blueimp-md5 ||||
-----------------------
-----------------------
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
`才想到,其实都是拆出去写的,内容区显示的是路由组件,肯定都是拆出去的`

***
## 侧边导航栏
1. 头部[ 随便写了个标题,也没弄图标,(就是高度设置和右侧三栏中头部一样) ]
2. 路由选项卡:  
    * 使用`Menu/Menu.Item/SubMenu`组件
    * 配置 config/menuConfig.js 模块暴露 menuList 列表
        * icon 图标组件引入,可以统一在,遍历数组生成标签结构时统一`直接加 < /> 尖角号`,没有问题
    * 遍历**路由数据数据**,生成`标签结构`
        * 判断是否有子路由 
            * 没有返回**Menu.item**组件
            * 有 return `SubMenu` 组件
                * 并在其中递归调用该函数生成子路由选项组件
    * `功能性BUG`  
        1. `自动选中菜单项`
            > 直接获取当前路径(同时也是key),设置为 Menu 组件的`selectedKey`属性
        2. `选中的菜单项的**父级菜单**自动展开`
            > 在遍历出`标签结构的同时`,从有子元素的分支语句中,使用 find 方法查询子元素路径有当前路径,那么把这个元素设置为`defaultOpenKeys`,就会自动展开了  
        * `注意: 上述设置,注意封装产生的标签结构函数,调用时候`**保证设置上述(第二个)属性时已经调用过,获得了需要展开的 key 值**
---
### 右侧 Header 组件
1. 静态布局
    * 行内元素直接text-align,就可以调布局位置了,不用再包一层块元素
    * 三角可以用::after伪元素边框写,就是注意别`顺手`写成visibility:hidden
2. 欢迎用户,直接就是memoryUtil里的user里取就行,退出的话,localStorage和memoryUtil都要清一下
3. 动态时间,我是用的toLocaleString()方法
4. 当前页面标题,还是遍历找就行,像那个默认展开的一样
5. 天气是用的jsonp库封装了个promise包着的jsonp请求  
`注意: 定义状态,动态更新`
### 商品分类管理
1. 静态布局
    * Card . Table . Button 三个组件
        1. Card 左右部分,定义在外面,结构清晰,便于维护
        2. Table 显示的数据和列分布 rowkey 指定数据中某属性作为 key 值
            + 数据 dataSource 
            + columns 可以设置宽 加一个接受数值的 width 属性就行 dataIndex 指定了显示数据的属性
        3. Button 有type="link"属性,无边框,加颜色button
2. 定义接口请求函数 
    * 首先 BASE_URL 别忘了,便于管理.更改
    * 请求函数的形参名和接口要求参数名一样的话,就能使用名值相同时对象的简写方式
    * 注意相似的参数名,不要用混
    * 请求函数一定要把请求结果再次返回,要不然这个函数的返回值为 undefined
3. 动态显示一级分类列表
    * 封装请求一级分类,二级分类的一个函数,通过parentId获取一级二级
    * 定义 parentId 状态,根据 Table列点击事件,获取列中render接受这行要展示的数据参数,取出这个_id,改变 parentId 状态,查询它的子分类
    **`这个 parentId 是异常重要了,而且来回切换的时候,要多注意是不是该更新了,更新之后的衍生状态是否需要调整`**
4. 修改分类
    * 点击确认后调接口,获取id和name,然后发请求就好了
    * 修改分类需要当前分类id,id可以通过columns中render函数的参数获取
    * 修改框中的值,需要父组件定义一个函数,传入子组件,子组件中通过ref获取form实例,form实例传入函数作为实参,父组件中的函数,是将传入的实参绑定到this上,就实现了在父组件中获取子组件的from实例,通过getFieldsValue可以获取子组件上的值
5. 添加分类
    * 添加分类主要包括下拉框和input
        1. 下拉框使用的是 Select 组件
            * 下拉框中的值 使用的是 Option 组件 标签就像html标签一样(只是首字母大写了)
        2. 下来框中的值都是所有一级分类列表,无论是自己分类上的,还是子分类页面的添加组件,显示的都是一级分类列表
            * 一级分类默认选中的就是`一级分类`,二级分类,默认选中的是当前二级分类的值,因为从`列`中点击进入子分类的时候,是通过`render`获取到了本列的数据,所以默认值设置为当前id,也对应了Option上的value(item._id),所以也是可以默认选中的
    * 使用到了 Modal 组件,而且还是两个,所以先定义一个值为零的状态控制Modal的显示状态,1显示添加,2显示更改。更改之后都得关闭，重新获取当前的页面列表  
    **`尤其重要的是,Modal这玩应加上initialValue简直就是祸害中的祸害,值怎么都变不了,或者慢一拍.后来看见一个评论说是可以关闭Modal的时候设置一个destoryOnClose,销毁Modal元素,再打开就能重新渲染了,解决了问题。开始我一直在设置Form值这方面想办法。`**