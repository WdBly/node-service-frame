import Router from "koa-router";
import routerTable from "./routerTable"
import controller from "../controller"
import jwtConfing from "../config/jwt.config.json";
import base64 from "../util/base64URL.js"
import crypto from "crypto";
import model from "../model";

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
            bindRouter(obj[item], name+item, obj[item][""]);
        }
    }
}

async function authenticationFn(ctx) {

    let token = ctx.header.authorization,
                decipher,
                decrypted = "",
                payload,
                header,
                exp;
    if(!token){

        return {
            err: true,
            code: 80000,
            message: "用户未认证(登陆)"
        }
    } else {
        decipher = crypto.createDecipher("aes-256-cbc", jwtConfing.secret);
        decrypted += decipher.update(token, "hex", "binary");
        decrypted += decipher.final("binary");

        header = JSON.parse(base64.base64UrlDecode(decrypted.split(".")[0]))
        payload = JSON.parse(base64.base64UrlDecode(decrypted.split(".")[1]))

        exp = payload.exp;
        
        if(+new Date() > parseInt(exp)){
            return {
                err: true,
                code: 80002,
                message: "token已过期"
            }
        }

        if(!model.verificationJwt(header.user_id)){
            return {
                err: true,
                code: 80001,
                message: "查无此人"
            }
        }
        
        return {}
    }
    
}

function bindRouter(item,url) {

    switch (item["method"]) {
        case "GET":
            router.get(url, async (ctx, next) => {
                //token 身份认证
                let need_auth = item["need_auth"] ? await authenticationFn(ctx) : {};
                let ctrl_name = need_auth.err ? "userAuthFailController" : item["ctrl"];

                await controller[ctrl_name](ctx,ctx.request.body,need_auth);
                next();
            });
            break;
        case "POST":
            router.post(url, async (ctx, next) => {
                //token 身份认证
                let need_auth = item["need_auth"] ? await authenticationFn(ctx) : {};
                let ctrl_name = need_auth.err ? "userAuthFailController" : item["ctrl"];

                await controller[ctrl_name](ctx,ctx.request.body,need_auth);
                next();
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
