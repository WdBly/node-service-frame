

const routerTable = {
    api:{
        user:{
            "login":{
                ctrl:"loginController",
                method:"POST"
            }
        },
        order:{
            "getOrder":{
                ctrl:"getOrderController",
                method:"POST"
            }
        },
        pay:{
            "goPay":{
                ctrl:"goPayController",
                method:"GET"
            }
        }
    }
}

module.exports = routerTable














