import API from "../../api";
import http from "../../api/axios";

const userLogin = (from,getArticleList) => {
    return dispatch => {
        return API.userLogin(from).then(res => {
            
            if(res.data.code === 70000){

                http.axios.defaults.headers.common['Authorization'] = res.data.data.token;
                localStorage.setItem("Authorization",res.data.data.token);
                localStorage.setItem("userName",from.userName);

                getArticleList && getArticleList();
                
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

const logout = () => {
    return dispatch => {
        localStorage.removeItem("userName");
        localStorage.removeItem("Authorization");

        dispatch({
            type: "logout",
            data: {
                userName:""
            }
        });
    };
};

const getArticleList = () => {
    return dispatch => {
        return API.getArticleList().then(res => {
            dispatch({
                type: "article",
                data: {
                    article:res.data.data
                }
            });
        });
    };
}

export default {
    userLogin,
    register,
    getArticleList,
    logout
}

