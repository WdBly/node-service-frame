import fs from "fs";
import path from "path";
import Router from "koa-router";
import routerTable from "./routerTable"
import controller from "../controller"

const router = new Router();

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
            bindRouter(obj[item]["method"], name+item, obj[item]["ctrl"]);
        }
    }
}

function bindRouter(method,url,ctrl) {

    console.log(method,url,ctrl);
    
    switch (method) {
        case "GET":
            router.get(url, async (ctx, next) => {
                controller[ctrl](ctx);
            });
            break;
        case "POST":
            router.post(url, async (ctx, next) => {
                controller[ctrl](ctx);
            });
            break;
        default:
            break;
    }

}

const routers = app => {

    app.use(router.routes(), router.allowedMethods());

    mapObject(routerTable,"");

}


module.exports = routers;
