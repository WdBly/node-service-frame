# node-service-frame
building a node service on the server side, including various basic services and operation databases, can be used as a general template for a node server.


### 关于

### 安装

git clone https://github.com/WdBly/node-service-frame.git
npm i pm2 -g
npm i 

npm run start //调试版
npm run server //线上版

### 目录

::: hljs-center

# node 服务端开发 #
## node 服务端开发模板搭建，本地调试，服务端部署，持续化运行， ##

![image.png](http://112.74.34.178/image/article/93a7bb415c6370738971d4fbe85ed81a.png)
:::

### 本篇文章详细讲述了从零开始，搭建node服务，到服务端部署的整个过程。
***

#### 1：项目初始化

克隆项目：
>git clone https://github.com/WdBly/node-service-frame.git 

安装PM2：
>npm i pm2 -g

项目目录结构如下

![image.png](http://112.74.34.178/image/article/d91f9e746522bb5aed93e48b80f8258e.png)
    
我的的node就跑在server目录下
package.json:
```javascript
  ...
  "scripts": {
       "test": "echo \"Error: no test specified\" && exit 1",
       "server": "cross-env NODE_ENV=server PORT=5000 pm2 start server --name node_server --watch",
       "start": "cross-env NODE_ENV=server PORT=5000 node server",
       "watch": "tsc"
  },
  ...
  "dependencies": {
       "babel-cli": "^6.26.0",
       "babel-core": "^6.26.3",
       "babel-plugin-add-module-exports": "^0.2.1",
       "babel-plugin-import": "^1.8.0",
       "babel-plugin-transform-runtime": "^6.23.0",
       "babel-preset-env": "^1.7.0",
       "babel-preset-stage-0": "^6.24.1",
       "cross-env": "^5.2.0",
       "koa": "^2.5.2",
       "koa-bodyparser": "^4.2.1",
       "koa-logger": "^3.2.0",
       "koa-router": "^7.4.0",
       "koa-static": "^5.0.0",
       "koa-views": "^6.1.4",
       "koa2-cors": "^2.0.6",
       "log4js": "^3.0.3",
       "mysql": "^2.16.0"
  }
```
首先 npm i 下载相关依赖，此次node项目使用的是 koa2数据库使用mysql
babel是用来编码我们代码中的es6语法糖的，当然你可以先检查当前的node对es6语法的支持性：
>首先安装es-checker npm install es-checker -g
>然后执行：es-checker

![image.png](http://112.74.34.178/image/article/d4aafa5b4a7f015275fa1f3a580df009.png)

我们可以看到当前node支持性为90%，不支持es6的import 和 export，所以我们还是要使用babel编译代码。

其余的相关依赖作用如下：
    cross-env : 跨平台的使用环境变量，通过cross-env设置的环境变量可以通过node的process来访问。

    koa : 一款轻量级的nodejs框架

    koa-bodyparser ：当浏览器向服务端发送请求时，通过使用koa-bodyparser中间件我们可以很方便的拿到用户上传的数据（this.body）。

    koa-logger : 请求日志打点（输出到控制台）

    koa-router ：路由中间件

    koa-static ：静态文件处理 将访问路由指向静态文件所在路径

    koa-views ：koa模板输出引擎，可自己选择使用哪种模板语言，通常前后端分离koa-views 只是针对html的head进行渲染，而body的内容在浏览器端生成。
    如果使用了前后端分离+首屏服务端渲染的模式，返回了渲染好的首页html文件，当然全服务端渲染直接将页面文件放入koa-static指定的目录下即可。

    koa2-cors ： 跨域资源共享的服务端中间件，通过对访问url以及reques header 的判断，返回允许访问的域（origin）和方法和请求头，同时，
    如果服务端希望在response header中新增字段，需要在 exposeHeaders字段中将之暴露出来：['WWW-Authenticate', 'Server-Authorization','Last-Access-Time']

    log4js : nodejs 日志管理工具，可以将日志以各种形式输出到各种渠道

    mysql ： 数据库(当然本地必须要安装mysql)

scripts 中的命令用于开始我们项目的运行：
    npm run start:设置端口为5000 执行 node server（当前目录下的server文件中的index.js 被执行了）

    npm run server:通过pm2 开启服务。
    npm run watch：编译typescript文件，将之输出至指定目录，配置文件见 tsconfing.json


#### 2：启动项目

server目录结构如下：
![image.png](http://112.74.34.178/image/article/d5d18a2784cd6e002da8bd4d98642d85.png)

npm run start -> server/index.js

```javascript
let fs = require('fs');

//读文件操作是相对于项目根路径
let babelConfig = JSON.parse(fs.readFileSync('./.babelrc'));

//读取babel配置 并注册
require("babel-register")(babelConfig);

let server = require("./app.js");

module.exports = server;

```
执行app.js

1:加载外部依赖 并实例化koa对象
```javascript
    ...

    import log from "./log";
    import clientRouter from "./routers/clientRouter"
    import cors from "koa2-cors";
    import jwtAuth from "./util/jwtAuth.js"
    import router from "./routers";

    const app = new Koa();

    ...
```

2：通过app.use(middleware) 将加载的中间件按顺序挂载到app实例上（注意只是挂载并未执行）
>middleware 有同步和异步的区别 不同的类别使用方法不一

```javascript
    ...

    app.use(async (ctx, next) => { ... });

    app.use(logger());

    app.use(views(path.resolve(__dirname, "../dist/")));

    app.use(serverStatic(path.resolve(__dirname,"../dist/")));

    // 非静态文件 走路由 两种情况 一种是前端有路由 会处理后返回入口文件
    app.use(clientRouter);

    app.use(cors({ ... }));

    app.use(jwtAuth);  

    //api接口  执行router方法 路由处理 在这个文件中进行了路由挂载
    router(app);  

    ...
```

3：事件挂载，端口监听

```javascript
    ...
    
    //监听初始设置的端口，在成功后写入日志中，日志模板见下方日志说明
    //当客户端请求时 开始触发上面挂载的中间件执行
    app.listen(process.env.PORT,() => {
        log.info("success");
    });

    //全局错误事件监听 并写入日志
    //throw new Error(responseJson(500,null,"check confing error"))
    app.on("error", err => {
        log.error(err);
    });

    ...
```

4:路由处理：
![image.png](http://112.74.34.178/image/article/56aa63b645477559782a9182bae96026.png)

在index.js中做了如下操作

```javascript 
    //1 依赖引入 

    import Router from "koa-router";
    //引入路由表
    import routerTable from "./routerTable"
    //引入控制器
    import controller from "../controller"

    //2 路由挂载 
    app.use(router.routes(), router.allowedMethods());

    //3 通过递归遍历路由表为路由绑定监听事件
    function mapObject(obj,name) {
        name += "/";
        var is_child_object = false;
        for(let item in obj){
            is_child_object = false;
            for(let value in obj[item]){
                if(typeof obj[item][value] === "object"){
                    is_child_object = true;
                }
            }
            if(is_child_object){
                mapObject(obj[item],name+item)
            } else {
                bindRouter(obj[item], name+item, obj[item][""]);
            }
        }
    }
    //router.get() 绑定监听事件并 指向路由表中对应的controller
    function bindRouter(item,url) {
        switch (item["method"]) {
            case "GET":
                router.get(url, async (ctx, next) => {
                    await controller[item["ctrl"]](ctx,ctx.request.body);
                    next();
                });
                break;
            case "POST":
                router.post(url, async (ctx, next) => {
                    await controller[item["ctrl"]](ctx,ctx.request.body);
                    next();
                });
                break;
            default:
                break;
        }
    }
    
 
```

#### 3:用户访问

我们从挂载的中间件依次执行开始说起 一个小例子

```javascript
    app.use(async (ctx,next)=>{
        console.log(1);
        next();
        console.log(6);
    });

    app.use(async (ctx,next)=>{
        console.log(2);
        next();
        console.log(5);
    });

    app.use(async (ctx,next)=>{
        console.log(3);
        next();
        console.log(4);
    });
```

当用户访问时， 中间件从上往下依次执行，当遇到next()方法后，将执行权移交给下一个中间件（next后的代码暂时不会执行），当执行到最后一个中间件后，会直接执行next后的代码，执行完成后将执行权移交给上一个中间件，直到回到第一个中间件，这就是中间件执行的流程，输出结构如下：

![image.png](http://112.74.34.178/image/article/91dcfc0236e438133eb975106b0ff2eb.png)

这样可以保持记录每个函数再移交之后的内部状态（上一个函数没有被释放）
[查看示例代码](https://github.com/WdBly/node-service-frame/blob/master/index.js)

用户的每一个访问都会经历如下过程：
1:将请求路由中多个“/”符号合并为一个
2：控制台打印访问日志
3：获取到用户传输的数据放在ctx.body中方便后面使用
4：分岔口 如果是静态资源的获取 直接返回对应目录的文件 结束访问，否则下一步
5：绑定模板文件（根据dev或prod环境绑定不同的目录）app.use(views(publicPath));
6：路由判断，如果不是接口路由，则返回publicPath下的文件 await ctx.render("index")，否则下一步；
7：到这儿的都是接口路由，进行cosr配置，需要注意将Last-Access-Time暴露出来
8：jwt身份认证，如果接口需要登陆（need_auth字段），开启认证，首先验证心跳时间，若心跳正常，则下一步，否则认证Authorization字段，使用非对称加密算法，使用服务端私钥解密，分析解密后的字段，对用户ID，认证时间等进行判断，若一切正常则重置Last-Access-Time字段，进行下一步。若接口不需登陆，则直接下一步。
9：根据路由表的配置 这次访问进入对应的controller
10：动态参数检查：对于需要上传数据的接口启用参数检查 check-runtime，配置如下：若通过检查则下一步，否则返回错误类型，并写入日志。
```javascript
const format = {
    userName:{  
        require:true,
        type:"String Number",
        length:"4 8"
    },
    password:{
        require:true,
        type:"String Number",
        length:"6"
    }
}
```
11:进入对应的model中进行数据的操作（增删改查）mysql.createPool(database) 可以创建连接池，不用每次查询都去建立一次。由于数据库的操作是一个异步的操作，我们将这个操作封装在一个Promise中，当数据库操作成功后 resolve(res);否则reject(err），封装后我们可以这样用：
```javascript
    //这里需要注意 由于使用了Promise，我们只能通过catch去捕获reject抛出中的错误
    try {
        value = await query({
            sql:'insert into ?? (userName,password) values (?,?)', 
            values:[table[0],body.userName,body.password]
        });
        return value.insertId ? responseJson(70002,value.insertId,"注册成功") : responseJson(70003,null,"注册失败");
    } catch(err){
        //这里可以通过code的类型来确定是哪种类型的错误，方便我们写入日志，所有错误类型可以查看文档 70004 主键重复 
        return err.code === "ER_DUP_ENTRY" ? responseJson(70004,err,err.sqlMessage)
         : responseJson(70005,err,err.sqlMessage)
    }
```
12：若model中一起顺利则将结果返回到controller，controller将数据整理后输出到ctx.body中搞定。

值得一提的是在用户登陆时 我们会将 header，payloay通过bese64UrlEncode编码，然后使用secret通过 aes-256-cbc加密。将结果返回到客户端，客户端每次请求都可以将之放入Authorization字段中


### 服务端部署

1:需要注意 数据库的配置文件是不会推送的，需要自己在config中配置。
2：需要安装pm2

数据库导入：
1：mysql -u root -p ->键入密码 ；
2：mysql> show databases; //查看已有数据库
如果已经存在了直接导入数据库
3：mysql> use abc; 
   mysql>set names utf8; //设置字符编码
   mysql> source /home/abc/abc.sql; //导入
否则先创建数据库
   mysql>create database abc;

运行：npm run build 打包项目
      npm run server 开启pm2服务 运行node程序

访问：http://118.25.17.53:5000

### 引入docker
1：服务器上安装docker [centos](https://docs.docker.com/install/linux/docker-ce/centos/#set-up-the-repository)

2：service docker start  //启动服务端docker（守护进程）
启动后：docker version![image.png](http://112.74.34.178/image/article/2266b9338f20ea55baa252cf958b3982.png)

3:新建容器，用于跑开发环境：

    docker container run --name node-server -p 8002:5000 -d -v "$PWD":/node-server 
    node:8.11.1 bash -c "cd node-server && npm run start"

3:新建容器，用于跑生产环境：

    docker container run --name node-server2 -p 5001:5000 -it -v "$PWD":/node-server 
    node:8.11.1 bash -c "cd node-server && npm install pm2 -g && npm run server"

4：也可以通过Dockerfile文件来制作只读镜像
> -itd 的意思 i:开启标准输出，t:重新分配终端，d:后台运行

### 补充，结合webpack4 react做成一个完整的项目

#### 结合webpack
1：引入依赖，都是一些常见的react全家桶和css依赖，值得一提的是koa-webpack-middleware，他依赖于express的webpack-dev-server(实际的中间件是webpack-dev-middleware和webpack-hot-middleware),但是koa是支持异步中间件，不能直接使用webpack-dev-middleware和webpack-hot-middleware（主要是next()方法的问题），所以将webpack-dev-middleware和webpack-hot-middleware封装后就成了koa-webpack-middleware，
[官方文档](https://www.npmjs.com/package/koa-webpack-middleware)


![image.png](http://112.74.34.178/image/article/1601c458cc65b33f09f06ff9f7722a82.png)

![image.png](http://112.74.34.178/image/article/d0d976676b6635c525de706659819027.png)

>koa-webpack-middleware 将express的中间件进行封装，将我们koa中间件的next方法传递到express的第三个参数中进行封装。

![image.png](http://112.74.34.178/image/article/eeb7e9c556afe0af4a8f5e9b8a93348c.png)

webpack4使用webpack-cli打包 必须要引

```JavaScript
{

  "dependencies": {
    "autoprefixer": "^9.1.5",
    "axios": "^0.18.0",
    "css-hot-loader": "^1.4.2",
    "css-loader": "^1.0.0",
    "extract-text-webpack-plugin": "^4.0.0-beta.0",
    "html-loader": "^0.5.5",
    "html-webpack-plugin": "^3.2.0",
    "less": "^3.8.1",
    "less-loader": "^4.1.0",
    "postcss-loader": "^3.0.0",
    "react": "^16.4.2",
    "react-dom": "^16.4.2",
    "react-router-dom": "^4.3.1",
    "redux": "^4.0.0",
    "redux-promise-middleware": "^5.1.1",
    "redux-thunk": "^2.3.0",
    "style-loader": "^0.23.0",
    "webpack": "^4.17.1"
  },
  "devDependencies": {
    "koa-webpack-middleware": "^1.0.7",
    "webpack-cli": "^3.1.0",
    "webpack-merge": "^4.1.4"
  }
}

```


![image.png](http://112.74.34.178/image/article/f0de849737ea990d1f474d4c41ce4e44.png)

[插件API](https://www.webpackjs.com/api/compiler-hooks/#emit)

2：app.js中

```javascript
import webpack from "webpack";
import webpack_config from "../webpack/webpack.config.js";
import { devMiddleware, hotMiddleware } from 'koa-webpack-middleware'

var compiler = webpack(webpack_config)

//dev环境才有下面的步骤
if(process.env.NODE_ENV === "development") {

// emit是 compiler编译的一个阶段，这个阶段编译器开始输出资源，所以我们在这个阶段中读出了
//编译器输出的html资源到 /template/index.html 中，解决了刷新404问题
    compiler.plugin("emit",(comilation,callback) => {
        const assets = comilation.assets;
        let file, data;
        Object.keys(assets).forEach(key => {
            if(key.match(/\.html$/)){
                file = path.resolve(__dirname,"./template/index.html");
                data = assets[key].source();
                fs.writeFileSync(file,data);
            }
        });

        callback();
    })


    app.use(devMiddleware(compiler,{
        publicPath:"/"
    }));

    app.use(hotMiddleware(compiler))
}


```
>刷新404问题是由于只有在访问根路由时（127.0.0.1：5000）webpack-dev-middleware才会返回对应的文件给客户端，其他时候没有返回了空的html文件（template下的html文件）。所以在我们访问一个具体路由时，先将内存中的内容读取到template下的html文件中，最后返回给客户端此文件即可。

具体的webpack配置就不贴了



#### 结合react

[直接看项目吧](https://github.com/WdBly/node-service-frame/blob/master/client/app.jsx)