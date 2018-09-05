import routerTable from "./routerTable"

async function clientRoute(ctx, next) {
    let obj = ctx.url.split("/").filter(item=>item).reduce((prev,next) => prev && prev[next],routerTable);

    if(obj) { //如果是接口形式的请求
        await next();
    }else {
        //前端路由 两种情况 一是直接返回入口文件（client渲染页面）  二是通过ssr返回服务端渲染的首页
        //这里我们直接返回入口文件（相对于我们设置的静态文件的路径）
        //await next();
        await ctx.render("index");
    }
}

module.exports = clientRoute;
