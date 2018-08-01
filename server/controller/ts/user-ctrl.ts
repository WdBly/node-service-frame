
interface UserInfo {
    userName: string;
    password: string;
}

const loginController = function (ctx : {request: {body : UserInfo}}) {
    
    console.log(ctx.request.body);
}

const user_ctrl = {
    loginController
}

export default user_ctrl;