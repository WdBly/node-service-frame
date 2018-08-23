import heartbeatTime from "../config/heartbeat-time.config.json"
import routerTable from "../routers/routerTable"
import jwtConfing from "../config/jwt.config.json";
import base64 from "../util/base64URL.js"
import crypto from "crypto";
import model from "../model";
import controller from "../controller"

async function jwtAuth(ctx, next) {
    let obj = ctx.url.split("/").filter(item=>item).reduce((prev,next) => prev[next],routerTable);

    if(!obj.need_auth){
        await next();
    }else {

        let token = ctx.header.authorization,
                    decipher,
                    decrypted = "",
                    payload,
                    header,
                    exp,
                    last_access_time;
        if(!token){

            await controller["userAuthFailController"](ctx,ctx.request.body,{
                code: 80000,
                message: "用户未认证(登陆)"
            });

        } else {

            //心跳验证
            last_access_time = ctx.header["last-access-time"];
            if(last_access_time && (+new Date()) - parseInt(last_access_time) < heartbeatTime.heartbeatTime){
                await next();
            }else {
                decipher = crypto.createDecipher("aes-256-cbc", jwtConfing.secret);
                decrypted += decipher.update(token, "hex", "binary");
                decrypted += decipher.final("binary");
    
                header = JSON.parse(base64.base64UrlDecode(decrypted.split(".")[0]))
                payload = JSON.parse(base64.base64UrlDecode(decrypted.split(".")[1]))
    
                exp = payload.exp;
                
                if(+new Date() > parseInt(exp)){
    
                    await controller["userAuthFailController"](ctx,ctx.request.body,{
                        code: 80002,
                        message: "token已过期"
                    });
                }
    
                if(!model.verificationJwt(header.user_id)){
    
                    await controller["userAuthFailController"](ctx,ctx.request.body,{
                        code: 80001,
                        message: "查无此人"
                    });
                }
    
                ctx.set("Last-Access-Time", +new Date());
    
                await next();
            }
        }
    }
}




module.exports = jwtAuth;