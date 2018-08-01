
import order_ctrl from "./dist/order-ctrl";
import pay_ctrl from "./dist/pay-ctrl";
import user_ctrl from "./dist/user-ctrl";

const ctrl = {
    ...order_ctrl,
    ...pay_ctrl,
    ...user_ctrl
};

export default ctrl;