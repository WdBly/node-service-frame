

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
                need_auth:false
            }
        },
        article:{
            "getArticleList":{
                ctrl:"articleListController",
                method:"GET",
                need_auth:false
            }
        }
    }
}

module.exports = routerTable














