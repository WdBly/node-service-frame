
interface OrderInfo {
    userName: string;
    password: string;
}

const getOrderController = function (ctx : {request: {body : OrderInfo}}) {
    console.log("getOrderController");
}

const order_ctrl = {
    getOrderController
}

export default order_ctrl;