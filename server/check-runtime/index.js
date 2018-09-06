
import log from "../log";
import responseJson from "../util/responseJson";

let context;

function checkRuntime(ctx,format,controller,response) {
    
    let value;

    for(let attr in format){

        value = format[attr];

        if(value.require === true){

            //check require
            if(!ctx.hasOwnProperty(attr)){
                context = {
                    code:60001, //参数缺失
                    message:`${attr} 参数缺失`
                };
                break;
            }

            if(!dataCheck(ctx, value, attr)){
                break;
            }

        } else {

            if(ctx.hasOwnProperty(attr) && !dataCheck(ctx, value, attr)){
                break;
            }
        }

    }
    
    if(context){
        let json = responseJson(context.code,null,context.message);
        log.error(controller + JSON.stringify(json));

        context = null;
        
        response.set({
            "Cache-Control":"no-cache",
            "sever":"node koa(2)",
            "Content-Type":"application/json; charset=utf-8"
        })
        response.status = 200;
        response.body = json;

    }else {
        log.info(controller + "success");
        return true
    }
}

function dataCheck(ctx, value, attr) {
    //check type
    if(isClass(value.type) === "String" && !checkType(ctx, value.type, attr)){
        context = {
            code:60002, //数据类型错误
            message:`${attr} 数据类型错误`
        }
        return false;
    }

    //check length
    if(isClass(value.length) === "String" && !checkLength(ctx, value.length, attr)){
        context = {
            code:60003, //数据size错误
            message:`${attr} 数据size错误`
        };
        return false;
    }
    
    //check regexp
    if(value.regexp instanceof RegExp && !checkRegExp(ctx, value.regexp, attr)){
        context = {
            code:60004, //数据格式错误
            message:`${attr} 数据格式错误`
        };
        return false;
    }

    return true
}


function checkType(ctx, type, attr) {

    let typeArr = type.split(" "),
        ctxType = isClass(ctx[attr]);
 
    return typeArr.some(item => ctxType === item);
}

function checkLength(ctx, length, attr) {

    let lengthArr = length.split(" "),
    ctxLength;
    
    if(!ctx[attr]){
        throw new Error(responseJson(500,null,"check confing error"));
    }

    ctxLength = ctx[attr].toString().length;

    return lengthArr[1] ? (ctxLength >= parseInt(lengthArr[0]) && ctxLength <=  parseInt(lengthArr[1])) :
           ctxLength >= lengthArr[0]
}

function checkRegExp(ctx, regexp, attr) {
    return regexp.test(ctx[attr]);
}

function isClass(o) {
    return {}.toString.call(o).slice(8,-1);
};

export default checkRuntime;
