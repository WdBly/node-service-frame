

const routerTable = {
    api:{
        user:{
            "login":{
                ctrl:"loginController",
                method:"POST",
                need_auth:false
            },
            "register":{
                ctrl:"registerController",
                method:"POST",
                need_auth:true
            }
        },
        article:{
            "getArticleList":{
                ctrl:"articleListController",
                method:"GET",
                need_auth:true
            }
        }
    }
}

module.exports = routerTable














