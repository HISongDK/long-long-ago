# 后台管理系统

- [后台管理系统](#后台管理系统)
  - [该从这个项目中学到什么](#该从这个项目中学到什么)
  - [技术选型](#技术选型)
  - [实际操作](#实际操作)
    - [使用 creat-react-app 搭建项目](#使用-creat-react-app-搭建项目)
    - [使用 Git/GitHub 建立远程版本库](#使用-gitgithub-建立远程版本库)
    - [项目基本目录结构](#项目基本目录结构)
    - [在 react 中使用 antd](#在-react-中使用-antd)
    - [引入路由](#引入路由)
    - [封装 ajax 请求模块](#封装-ajax-请求模块)
    - [维持、自动登录 \ 封装 memory 工具模块以及 storage 工具模块](#维持自动登录--封装-memory-工具模块以及-storage-工具模块)
    - [layout 布局组件、拆分侧边导航和头部组件](#layout-布局组件拆分侧边导航和头部组件)
  - [侧边导航栏](#侧边导航栏)
    - [右侧 Header 组件](#右侧-header-组件)
    - [商品分类管理](#商品分类管理)
  - [商品管理](#商品管理)
  - [添加商品](#添加商品)
  - [角色管理](#角色管理)
  - [用户管理](#用户管理)
  - [redux 使用](#redux-使用)
    - [原因](#原因)
    - [redux 是什么](#redux-是什么)
    - [redux 具体使用](#redux-具体使用)
    - [react-redux 的使用](#react-redux-的使用)
      - [问题](#问题)
  - [数据可视化](#数据可视化)
  - [生产环境跨域问题](#生产环境跨域问题)
    - [BrowserRouter 路由模式问题](#browserrouter-路由模式问题)

## 该从这个项目中学到什么

1. 流程及开发方法
   - 熟悉项目的`开发流程`
   - 学会`模块化、组件化`【工程化】开发模式
   - 掌握`creat-react-app`创建脚手架初始化项目开发
   - 使用`node + mongodb + express + mongosse`开发后台应用 (这玩意跟我有什么关系)
2. react 插件或第三方库
   - [ √ ] 掌握`react-routr-dom`配置路由开发 react 单页面应用
   - 学会使用`redux / react-redux / redux-thunk`管理应用组件状态
   - [ √ ] 掌握`axios / jsonp`与后端进行数据交互
   - 掌握`antd`组件库构建页面
   - 学会使用`echarts / bizecharts`实现数据可视化
   - 学会使用`react-draft-wysiwyg`实现富文本编辑器

---

## 技术选型

| 序号 | 前台             | 后台        | 交互                                  | 模块化   | 项目构建        | 其他                                                |
| ---- | ---------------- | ----------- | ------------------------------------- | -------- | --------------- | --------------------------------------------------- |
| 1    | react            | node        | ajax 请求                             | ES6      | webpack         | 富文本编辑器                                        |
| 2    | react-router-dom | mongodb     | 1.axios 2.jsonp 3.promise async await | commonJS | creat-react-app | 1. react-draft-wysiwyg 2. draft-js 3. draft-to-html |
| 3    | antd             | mongoose    | 接口测试工具`                         |          | eslint          | 图表库                                              |
| 4    | redux            | multer      | postman                               |          |                 | 1. echarts 2. echarts-for-react                     |
| 5    |                  | blueimp-md5 |                                       |          |                 |

---

---

- 前台数据展现/交互/组件化
  >
  > 1. react
  > 2. react-router-dom
  > 3. antd
  > 4. redux
  >
- 后台应用
  >
  > 1. node
  > 2. mongodb
  > 3. mongoose
  > 4. multer
  > 5. blueimp-md5
  >
- 前后端交互
  >
  > - ajax 请求
      1. axios
      2. jsonp
      3. promise/async/await
  > - 接口测试工具
      1. postman

- 模块化
  >
  > 1. ES6
  > 2. CommonJS
  >
- 项目构建/工程化
  >
  > 1. webpack
  > 2. creat-react-app
  > 3. eslint
  >
- 其他
  >
  > 1. 富文本编辑器  
  >    a. react-draft-wysiwyg  
  >    b. draft-js  
  >    c. draft-to-html
  > 2. 图表库
  >    a. echarts
  >    b. echarts-for-react

---

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

### 使用 Git/GitHub 建立远程版本库

```js
git init                        //初始化
git add .                       //添加暂存区
git commit -m ''                //提交版本库
GitHub上新建仓库                 //根据页面提示连接远程版本库提交
`git checkout -b dev`           //创建并切换分支[是从提交的版本库中新建并切换的分支,所以确保主分支先提交更改再建分支]
```

### 项目基本目录结构

/src  
|—— /api ajax 相关  
|—— /assets 公用资源  
|—— /components 非路由组件  
|—— /config 配置文件  
|—— /pages 路由组件  
|—— /utils 工具模块  
|—— App.js 根组件  
|—— index.js 入口文件

### 在 react 中使用 antd

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

- 安装 axios `yarn add axios`
- 定义 ajax 函数 接收三个参数
  - url
  - data={}
  - type="GET"
- 判断请求方法是 get 还是 post
  - get 直接调用`并返回 return`axios.get()方法
    - 传入 url
    - 参数传入方法的第二个参数(配置参数):{params:data}
  - post 调用`并返回 return`axios.post(url,data)

---

- 对 ajax 进行二次封装  
  原因: 固定的接口`请求路径和方法`一致,每次请求,只需要传入不同的参数就行,所以要封装不同的接口请求模块
  - 定义不同的接口请求模块 + 模块中直接调用封装好的 ajax 请求 + 每个模块固定 url 和 type + 中间参数为该请求模块定义的形参,传入不同的参数  
    `重点:封装时都要返回promise,就是返回就行,本来就是promise对象(有点没太理清,以后再说)`

---

- 请求接口
  - 没有配置,默认从当前端口请求
    - `肯定报错 404`
  - 得配置一下子
    1. 可以定义个域名端口前缀 加到请求路径前面  
       就是把路径写全
       `当然这路径对了,但是有跨域问题,不过我浏览器安装也解决跨域的插件,就不报这个问题`
    2. 在 package.json 中开启代理  
       添加 `"proxy":"http://localhost:5000"`

### 维持、自动登录 \ 封装 memory 工具模块以及 storage 工具模块

- 首先使用自定义的 memory 模块作为数据中转，将登陆成功返回的用户信息，写入 memory 中的 user 对象，在 admin 页面中引入 memory 读取 user，如果`！user || ！user.id`,说明未登录（当然，也可能是忘记把 user 数据存入 memory 模块了）**这个是刷新值就丢了，很正常，毕竟没有持久储存。所以肯定还是要用 localStorage 的，而且用了 storage 还用这个感觉有点多余了。对理解这些数据传输可能有些用处**

- 封装 storage 存储用户信息模块
  - 先使用原生的 localStorage 封装了一下
  - 又用了下 store.js 库封了一下（语法更简洁，不用自己来回 stringfy、parse 来回转格式）
  - **我现在更想练练的是通过`时间戳`给 localStorage 加上一个过期时间**

### layout 布局组件、拆分侧边导航和头部组件

1. 挑一个布局一样的
2. 把布局中，结构较复杂的拆出来，单独写成组件引入  
    _小的样式改动直接 jsx 行内 style 两个大括号属性驼峰命名法就行
   _ 单组件的样式，就单在组件的文件夹中创建一个样式文件引入  
   `才想到,其实都是拆出去写的,内容区显示的是路由组件,肯定都是拆出去的`

---

## 侧边导航栏

1. 头部[ 随便写了个标题,也没弄图标,(就是高度设置和右侧三栏中头部一样) ]
2. 路由选项卡:
   - 使用`Menu/Menu.Item/SubMenu`组件
   - 配置 config/menuConfig.js 模块暴露 menuList 列表
     icon 图标组件引入,可以统一在,遍历数组生成标签结构时统一`直接加 < /> 尖角号`,没有问题
   - 遍历**路由数据数据**,生成`标签结构`
     - 判断是否有子路由
       - 没有返回**Menu.item**组件
       - 有 return `SubMenu` 组件
         - 并在其中递归调用该函数生成子路由选项组件
   - `功能性BUG`
     1. `自动选中菜单项`
        > 直接获取当前路径(同时也是 key),设置为 Menu 组件的`selectedKey`属性
     2. `选中的菜单项的**父级菜单**自动展开`
        > 在遍历出`标签结构的同时`,从有子元素的分支语句中,使用 find 方法查询子元素路径有当前路径,那么把这个元素设置为`defaultOpenKeys`,就会自动展开了
     - `注意: 上述设置,注意封装产生的标签结构函数,调用时候`**保证设置上述(第二个)属性时已经调用过,获得了需要展开的 key 值**

---

### 右侧 Header 组件

1. 静态布局
   - 行内元素直接 text-align,就可以调布局位置了,不用再包一层块元素
     三角可以用::after 伪元素边框写,就是注意别`顺手`写成 visibility:hidden
2. 欢迎用户,直接就是 memoryUtil 里的 user 里取就行,退出的话,localStorage 和 memoryUtil 都要清一下
3. 动态时间,我是用的 toLocaleString()方法
4. 当前页面标题,还是遍历找就行,像那个默认展开的一样
5. 天气是用的 jsonp 库封装了个 promise 包着的 jsonp 请求  
   `注意: 定义状态,动态更新`

### 商品分类管理

1. 静态布局
   - Card . Table . Button 三个组件
     1. Card 左右部分,定义在外面,结构清晰,便于维护
     2. Table 显示的数据和列分布 rowkey 指定数据中某属性作为 key 值
        - 数据 dataSource
        - columns 可以设置宽 加一个接受数值的 width 属性就行 dataIndex 指定了显示数据的属性
     3. Button 有 type="link"属性,无边框,加颜色 button
2. 定义接口请求函数
   - 首先 BASE_URL 别忘了,便于管理.更改
   - 请求函数的形参名和接口要求参数名一样的话,就能使用名值相同时对象的简写方式
   - 注意相似的参数名,不要用混
   - 请求函数一定要把请求结果再次返回,要不然这个函数的返回值为 undefined
3. 动态显示一级分类列表
   - 封装请求一级分类,二级分类的一个函数,通过 parentId 获取一级二级
   - 定义 parentId 状态,根据 Table 列点击事件,获取列中 render 接受这行要展示的数据参数,取出这个\_id,改变 parentId 状态,查询它的子分类
     **`这个 parentId 是异常重要了,而且来回切换的时候,要多注意是不是该更新了,更新之后的衍生状态是否需要调整`**
4. 修改分类
   - 点击确认后调接口,获取 id 和 name,然后发请求就好了
   - 修改分类需要当前分类 id,id 可以通过 columns 中 render 函数的参数获取
   - 修改框中的值,需要父组件定义一个函数,传入子组件,子组件中通过 ref 获取 form 实例,form 实例传入函数作为实参,父组件中的函数,是将传入的实参绑定到 this 上,就实现了在父组件中获取子组件的 from 实例,通过 getFieldsValue 可以获取子组件上的值
5. 添加分类
   - 添加分类主要包括下拉框和 input
     1. 下拉框使用的是 Select 组件
        - 下拉框中的值 使用的是 Option 组件 标签就像 html 标签一样(只是首字母大写了)
     2. 下来框中的值都是所有一级分类列表,无论是自己分类上的,还是子分类页面的添加组件,显示的都是一级分类列表
        - 一级分类默认选中的就是`一级分类`,二级分类,默认选中的是当前二级分类的值,因为从`列`中点击进入子分类的时候,是通过`render`获取到了本列的数据,所以默认值设置为当前 id,也对应了 Option 上的 value(item.\_id),所以也是可以默认选中的
   - 使用到了 Modal 组件,而且还是两个,所以先定义一个值为零的状态控制 Modal 的显示状态,1 显示添加,2 显示更改。更改之后都得关闭，重新获取当前的页面列表  
     **`尤其重要的是,Modal这玩应加上initialValue简直就是祸害中的祸害,值怎么都变不了,或者慢一拍.后来看见一个评论说是可以关闭Modal的时候设置一个destoryOnClose,销毁Modal元素,再打开就能重新渲染了,解决了问题。开始我一直在设置Form值这方面想办法。`**
     **`还有一个重点就是,复杂的添加匹配,是否需要获取数据,展示数据`**

## 商品管理

1. 搭建路由
2. 商品管理首页静态布局
3. 定义商品分页请求函数

- **分页须知**
  1. 纯前台分页
     - 请求获取数据
       - 一次性获取所有数据,翻页时不需要发请求
     - 请求接口
       1. 请求参数: 不需要传递 请求`页码`和`条数`作为参数
       2. 响应数据: 所有数据的数组
  2. 基于后台的分页
     - 请求获取数据
       - 每次获取当前页面的数据,翻页时发送请求
     - 请求接口
       1. 请求参数: 需要传递`pageNum`和`pageSize`作为参数
       2. 响应数据: 当前页面的数据 + `所有数据总条数`便于前天显示总页码
  3. 如何选择?
     - 通常根据数据多少进行选择,数据过多,使用后台分页,限定请求条数

4. 商品详情页
   - 也是通过 Table 组件 columns 的 render 函数属性直接获取本行数据
   - 函数式跳转 pathname+state 传参+location.state 获取
   - 使用的 Card 组件,List 组件,组件中使用 html 标签,自定义样式
   - 商品详情中 有商品所属分类的信息,如果是二级分类的商品,需要获取两个分类信息
     - 调用两次接口,如果只使用 await,会依次执行,发送请求,效率不高
     - 需要使用 Promise.all([]) 方法同时发送请求。
     - all 方法前面使用 await ,获取结果数组
5. 商品状态更新(上架/下架)
   - 还是 render 获取数据
   - 调用接口,改变 status 值,主要就是用了一下三目运算符,给 status 赋值
6. 解决路由文件没有包括的路由配置,所有菜单项不会`自动展开`和`选中`。
   - 因为获取展开和选中的 key 逻辑无法兼容这个
   - 把默认选中的本来值是`整个路径`对应路由文件中设置文 key 值得 path,所以可以设置一个判断,if(path.indexOf("/product")===0) path='/product'
   - 默认展开是用的... 记不清了,不过也按照上面的思路改一下就行了

## 添加商品

1. 添加页面静态布局
   - Card Form Input
     - 表单项宽度,通过`labelCol和wrapperCol配置对象[属性]`控制,对象内属性名为 span 对应数字属性值
     - TextArea 组件通过`autoSize`属性设置高度,可设置最大最小行
     - Input 组件有 addonAfter/Before 属性,可以给输入框添加样式前缀
   - Cascader 级联组件,数据源中 isLeaf 属性,如果叶子,则无子选项
   - From onFinish 回调需要 Button 组件的 htmlType 为 submit,且数据校验通过,**尤其注意自定义校验,promise 对象是否返回成果状态,调用 resolve**
2. 修改组件,数据回显
3. 级联也挺复杂,就是记不清了
4. 图片上传组件以及修改组件中图片回显
5. **富文本编辑器**

- 这是个天坑啊

## 角色管理

- 依旧是使用 Card Table 组件展示
  - card 组件 title 有一个添加角色的 button 和一个 修改角色权限的 button
  - table 要设置单选框 有属性可以做到
  - 有 角色项 选中才不禁用修改权限的 button

## 用户管理

- 添加用户用 Modal 里的 Form
- 修改用户跟添加用同一个组件
- 角色权限显示 Link 组件,是 map+递归生成结构的时候加一层判断
  - 判断有四种情况是当前项需要生成结构的
    1. admin 可以访问所有路径
    2. 公开的页面(比如首页)可以直接访问
    3. 子路由包括在权限里面,否则父路由直接 pass,子路由也显示不出来了
    4. 权限中包含的路由

---

## redux 使用

### 原因

**`有多个组件需要使用到相同的数据,如: user 信息(本来用的自定义的memory中转保存) 以及当前页面标题，在点击的时候就确定了，不必再遍历查询获取`**

### redux 是什么

1. 专门做状态管理的 JS 库
2. 可适配三大框架,不过基本搭配 react 使用
3. 作用: 集中管理 react 应用中,多个组件共享的状态
4. 开发: 与 react-redux 、redux-thunk 等插件配合使用

### redux 具体使用

```js
yarn add redux // 安装 redux
// 核心
1. store
2. action
3. reducer

// 核心api
createStore() // 参数传入 reducer
// 核心方法
getState()  // 获取 state
dispatch(action) // 分发 action 触发reducer调用,产生新 state
subscribe(listener) // 注册监听,产生了新的 state 时,自动调用
// 编码
store.getState()
store.dispatch({type:"INCREMENT",number})
store.subscribe(render)
```

- 要点:
  1. react 各组件需要 **读/写** redux 中的状态
  2. store 是 redux 的核心组成部分。组件读取数据就是从 store 读取
  3. 更新更改 store 中的数据
     > dispatch(action) // 提交描述对象
     > reducer 函数接收 旧状态 previousState 和行为 action 生成新状态 newState

### react-redux 的使用

```js
1. Provider 组件
// 让所有组件都能得到 state 数据
<Provider store={store}>
  <App/>
</Provider>

2. connect()
// 用于包装 UI 组件,生成容器组件
connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter)

3. mapStateToProps()
// 函数: 将 state 数据转换为 UI 组件的标签属性
```

#### 问题

> 1. redux 默认不能进行异步处理
> 2. 需要在 redux 中执行异步任务(ajax、定时器等)

例: 不在组件中定时提交 dispatch 触发 reducer,而是在 dispatch 中设置定时器,延时返回 action 触发 reducer 处理.但是做不到返回值是一个对象,因为里面的返回值,是延时器执行函数的返回值,而延时器本身没有返回值

## 数据可视化

> **看文档写就行,结构直接复制,剩下就是数据变动**

- echarts(b)
  - echarts-for-react
- G2(a)
  - **bizcharts**: react 中推荐使用基于 react 包装的 G2 开源库 `bizcharts`
  - 需要额外安装 `@antv/data-set`

## 生产环境跨域问题

1. 后台服务和前台应用同服务器,`无跨域问题`
   > 如前台 npm run build 打包好的 build 文件放入后台应有 public 文件夹下
   > 后台应用运行时,可以直接访问该端口号,展示的就是前台应用
   > 因为是相同端口,发 ajax 请求,所以不存在跨域问题
2. 不同服务器运行前后台程序
   1. 后台使用 cors 解决跨域
   2. 使用 ngnix 解决(一个还行的选择)  
      `不用管跨域了,还是后台解决吧`

### BrowserRouter 路由模式问题

> 根路径后的 path 会被当做后台路由处理,所以刷新会出现 404 的问题,需要后台处理
