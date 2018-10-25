
import query from "../util/poolQuery.js"
import responseJson from "../util/responseJson.js";

const table = ["article"];


const articleModel = async function() {
    let articleList
    try {
        articleList = await query({
            sql:'select * from ?? limit 10',
            values:[table[0]]
        });
        
        return responseJson(50000,articleList,"获取文章列表成功");

    }catch(err){
        return await responseJson(99999,null,"system error");
    }
}

const article_module = {
    articleModel
}

module.exports = article_module;






















