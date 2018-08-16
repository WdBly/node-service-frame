
import order_ctrl from "./js/order-ctrl.js";
import pay_ctrl from "./js/pay-ctrl.js";
import user_ctrl from "./js/user-ctrl.js";

const ctrl = {
    ...order_ctrl,
    ...pay_ctrl,
    ...user_ctrl
};

export default ctrl;