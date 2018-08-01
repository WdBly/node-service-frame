

async function clientRoute(ctx, next) {
    var client = true,ssr = false;

    if((!/\/source\/home/.test(ctx.url))) {
        await next();
    }else {  //前端路由 两种情况 一是直接返回入口文件（client渲染页面）  二是通过ssr返回服务端渲染的首页
        if(client){
            await ctx.render("source/home");
        } else if(ssr){
            console.log(ssr);
        }
    }
}

module.exports = clientRoute;
