

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
        order:{
            "getOrder":{
                ctrl:"getOrderController",
                method:"POST",
                need_auth:true
            }
        },
        pay:{
            "goPay":{
                ctrl:"goPayController",
                method:"GET",
                need_auth:true
            }
        }
    }
}

module.exports = routerTable














