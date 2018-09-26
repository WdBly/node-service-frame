import axios from "axios";


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
axios.defaults.headers.common['Authorization'] = localStorage.getItem("Authorization") || "";




export default {
    get:(url) => {
        return axios.get(process.env.API_ROOT+url);
    },
    post:(url,params) => {
        return axios.post(process.env.API_ROOT+url,params);
    },
    axios
}