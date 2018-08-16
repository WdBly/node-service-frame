

import user_model from "./user-model.js";
import pay_model from "./pay-model.js";
import order_model from "./order-model.js";


const model = {
    ...user_model,
    ...pay_model,
    ...order_model
};

export default model;




