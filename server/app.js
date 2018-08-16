
import path from "path";
import Koa from "koa";

//用于解析body中的参数,多用于接口请求,解析后通过this.body获取参数
import bodyParser from "koa-bodyparser";
import serverStatic from "koa-static";
import views from "koa-views";
import logger from "koa-logger";
import log from "./log";
import clientRouter from "./routers/clientRouter"

import router from "./routers";

const app = new Koa();

app.use(async (ctx, next) => {
    
    if(/\/{2,}/g.test(ctx.url)) {
        ctx.url = ctx.url.replace(/\/{2,}/g, "/");
        ctx.redirect(ctx.url);
    }

    await next();
});

app.use(logger());

app.use(bodyParser());

app.use(views(path.resolve(__dirname, "../dist/")));

// 图片 字体 等带后缀的实体文件可以直接返回
app.use(serverStatic(path.resolve(__dirname,"../dist/")));

// 非静态文件 走路由 两种情况 一种是前端有路由 会处理后返回入口文件(如果是服务端渲染则需要额外处理)
// 第二种是 接口形式的请求 
// 前端路由
app.use(clientRouter);

// api接口
router(app);

app.listen(process.env.PORT,() => {
    log.info("success");
});

app.on("error", err => {
    log.error(err);
});