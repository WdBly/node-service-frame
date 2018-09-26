
import http from "../axios"

const getArticleList = function() {
    return http.get("/api/article/getArticleList");
}


export default {
    getArticleList
}