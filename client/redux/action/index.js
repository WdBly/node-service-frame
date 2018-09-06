import API from "../../api";
import http from "../../api/axios";

const userLogin = (from) => {
    return dispatch => {
        return API.userLogin(from).then(res => {
            
            if(res.data.code === 70000){

                http.axios.defaults.headers.common['Authorization'] = res.data.data.token;

                dispatch({
                    type: "login",
                    data: {
                        userName:from.userName
                    }
                });
            }else {
                alert("登陆失败"+res.data.message);
            }

        });
    };
};
const register = (from) => {
    return dispatch => {
        return API.register(from).then(res => {
            if(res.data.code === 70002){
                alert("注册成功,用户ID"+res.data.data);
            }else {
                alert("注册失败"+res.data.message);
            }

        });
    };
};

export default {
    userLogin,
    register
}

