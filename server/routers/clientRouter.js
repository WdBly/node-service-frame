
import routerTable from "./routerTable"

import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import { Provider } from "react-redux";

import routes from "../../client/router/config";
import configureStore from "../../client/redux/store";
import API from "../../client/api";

async function clientRoute(ctx, next) {
    let obj = ctx.url.split("/").filter(item=>item).reduce((prev,next) => prev && prev[next],routerTable);

    if(obj) { //如果是接口形式的请求
        await next();
    }else {
        //前端路由 两种情况 一是直接返回入口文件（client渲染页面）  二是通过ssr返回服务端渲染的首页
        //这里我们直接返回入口文件（相对于我们设置的静态文件的路径）

        //这里简写了 好的做法是写和路由配套的接口 针对不同的路由 请求不同的接口 设置不同的store
        var articleList = await getArticleList();
    
        const store = configureStore({
            allReduce: {
                userName: "weidada",
                defaultUserName: "weidada",
                defaultPassword: 123456,
                articleList: articleList
            }
        });

        const context = {};
        const markup = renderToString(
            <StaticRouter
                location={ctx.url}
                context={context}
            >
                <Provider store={store}>
                    {renderRoutes(routes)}
                </Provider>
            </StaticRouter>
        );
        
        await ctx.render("index",{
            root: markup,
            state: JSON.stringify(store.getState())
        });
    }
}

async function getArticleList() {
    return new Promise(resolve => {
        API.getArticleList().then(res => {
            resolve(res.data.data);
        });
    })
}

module.exports = clientRoute;
