"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const loginController = function (ctx) {
    console.log(ctx.request.body);
};
const user_ctrl = {
    loginController
};
exports.default = user_ctrl;
