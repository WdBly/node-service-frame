
import query from "../util/poolQuery.js"
import responseJson from "../util/responseJson.js";

const table = ["user"];


const loginModel = async function(body) {
    let userInfo
    try {
        userInfo = await query({
            sql:'select id from ?? where userName=? and password=? limit 1', //? 占位符可以起到编码的作用
            values:[table[0],body.userName,body.password]
        });

        return userInfo.length !== 0 ? responseJson(70000,{id:userInfo[0].id},"登陆成功") : responseJson(70001,null,"登陆失败");
    }catch(err){
        return await responseJson(99999,null,"system error");
    }
}

const registerModel = async function(body) {
    let value;
    try {
        value = await query({
            sql:'insert into ?? (userName,password) values (?,?)', 
            values:[table[0],body.userName,body.password]
        });
        return value.insertId ? responseJson(70002,value.insertId,"注册成功") : responseJson(70003,null,"注册失败");
    } catch(err){
        return err.code === "ER_DUP_ENTRY" ? responseJson(70004,err,err.sqlMessage)
         : responseJson(70005,err,err.sqlMessage)
    }
}

const verificationJwt = async function(user_id) {
    let userInfo
    try {
        userInfo = await query({
            sql:'select * from ?? where id=?',
            values:[table[0],user_id]
        });

        return userInfo.length !== 0 ? true : false;
    }catch(err){
        return await responseJson(99999,null,"system error");
    }
}

const user_module = {
    loginModel,
    registerModel,
    verificationJwt
}

module.exports = user_module;






















