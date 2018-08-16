

const base64UrlEncode = function(source){

    var result;

    if(typeof source === "string" || source instanceof Array || source instanceof Buffer || source instanceof ArrayBuffer){
        result = new Buffer(source).toString('base64');
        result = result.split("=")[0];
        result = result.replace("+","-");
        result = result.replace("/","_");
    }

    return result
}

const base64UrlDecode = function(source){

    var result;

    if(typeof source === "string" || source instanceof Array || source instanceof Buffer || source instanceof ArrayBuffer){
        result = source.replace("-","+");
        result = source.replace("_","/");

        switch (result.length % 4) {
            case 0:
                break;
            case 2:
                result += "==";
                break;
            case 3:
                result += "=";
                break;
            default:
                throw new Error(responseJson(500,null,"Illegal base64url String!"));
        }

        result = new Buffer(result, 'base64').toString();
    }

    return result
}

module.exports = {
    base64UrlEncode,
    base64UrlDecode
};













