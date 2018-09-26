
import user_ctrl from "./user/user-ctrl.js";
import article from "./article/article.js";

const ctrl = {
    ...user_ctrl,
    ...article
};

export default ctrl;