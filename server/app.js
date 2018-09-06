
import path from "path";
import Koa from "koa";

import webpack from "webpack";
import webpack_config from "../webpack/webpack.config.js";
import { devMiddleware, hotMiddleware } from 'koa-webpack-middleware'

//用于解析body中的参数,多用于接口请求,解析后通过this.body获取参数
import bodyParser from "koa-bodyparser";
import serverStatic from "koa-static";
import views from "koa-views";
import logger from "koa-logger";
import log from "./log";
import clientRouter from "./routers/clientRouter"
import cors from "koa2-cors";
import jwtAuth from "./util/jwtAuth.js"

import router from "./routers";

const app = new Koa();
var publicPath = path.resolve(__dirname,"../dist");
var compiler = webpack(webpack_config);

app.use(async (ctx, next) => {
    
    if(/\/{2,}/g.test(ctx.url)) {
        ctx.url = ctx.url.replace(/\/{2,}/g, "/");
        ctx.redirect(ctx.url);
    }

    await next();
});

app.use(logger());

app.use(bodyParser());

// 图片 字体 等带后缀的实体文件可以直接返回
app.use(serverStatic(path.resolve(__dirname, "../dist")));

app.use(views(publicPath));

if(process.env.NODE_ENV === "development") {
    app.use(devMiddleware(compiler,{
        publicPath:"/",
        stats: {
            colors: true
        }
    }));

    app.use(hotMiddleware(compiler, {
        // log: console.log,
        // path: "/__webpack_hmr",
        // heartbeat: 10 * 1000
    }))
}

// 非静态文件 走路由 两种情况 一种是前端有路由 会处理后返回入口文件(如果是服务端渲染则需要额外处理)
// 第二种是 接口形式的请求 
// 前端路由
app.use(clientRouter);


app.use(cors({
    origin: function(ctx) {
      if (ctx.url === '/error') {
        return false;
      }
      return '*';
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization','Last-Access-Time'], //必须加上 Last-Access-Time 否则js拿不到
    maxAge: 5000,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept','Last-Access-Time'],
}));


app.use(jwtAuth)

// api接口
router(app);


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



app.listen(process.env.PORT,() => {
    log.info("success");
});

app.on("error", err => {
    log.error(err);
});