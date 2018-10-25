
import checkRuntime from "../../check-runtime";
import model from "../../model";
import jwtConfing from "../../config/jwt.config.json";
import base64 from "../../util/base64URL"
import crypto from "crypto";
import responseJson from "../../util/responseJson";

const format = {
    userName:{  
        require:true,
        type:"String Number",
        length:"4 8"
    },
    password:{
        require:true,
        type:"String Number",
        length:"6 12"
    }
}

const loginController = async function (ctx,body) {
    
    var context = checkRuntime(body,format,"loginController",ctx);

    if(!context){
        return;
    }

    var result = await model.loginModel(body);

    if(result.code === 70000){

        jwtConfing.header.user_id = result.data.id;
        jwtConfing.payload.iat = +new Date(); //签发时间
        jwtConfing.payload.exp = +new Date() + 60 * 60 * 1000; //一个小时后过期
    

        var header = base64.base64UrlEncode(JSON.stringify(jwtConfing.header)),
            payload = base64.base64UrlEncode(JSON.stringify(jwtConfing.payload)),
            crypted="",
            cipher,

        cipher = crypto.createCipher("aes-256-cbc", jwtConfing.secret);
        crypted += cipher.update(`${header}.${payload}`, "binary", "hex");
        crypted += cipher.final('hex');
                        
        result.data.token = crypted
    }

    ctx.body = result;
}

const registerController = async function (ctx,body) {
    var context = checkRuntime(body,format,"registerController",ctx);

    if(!context){
        return;
    }
    
    var result = await model.registerModel(body);
    
    ctx.body = result;
}

const userAuthFailController = async function (ctx,body,need_auth) {
    ctx.body = responseJson(need_auth.code,null,need_auth.message);
}

const user_ctrl = {
    loginController,
    registerController,
    userAuthFailController
}

module.exports = user_ctrl;