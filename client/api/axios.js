import axios from "axios";

var API_ROOT;

// 添加响应拦截器
axios.interceptors.response.use(function (res) {
    if(res.headers["last-access-time"]){
        axios.defaults.headers.common['Last-Access-Time'] = res.headers["last-access-time"];
    }

    if(res.data.code === 80001 || res.data.code === 80002){
        localStorage.removeItem("Authorization");
    }

    return res;
}, function (err) {
    // 对响应错误做点什么
    return Promise.reject(err);
    
});

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
if (typeof(window) !== 'undefined') {
    API_ROOT = process.env.API_ROOT;
    axios.defaults.headers.common['Authorization'] = localStorage.getItem("Authorization") || "";
}else {
    if(process.env.NODE_ENV === "developer"){
        API_ROOT = "http://127.0.0.1:5000";
    }else {
        API_ROOT = "http://127.0.0.1:5000";
    }
}





export default {
    get:(url) => {
        return axios.get(API_ROOT+url);
    },
    post:(url,params) => {
        return axios.post(API_ROOT+url,params);
    },
    axios
}