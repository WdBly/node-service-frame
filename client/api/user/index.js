
import http from "../axios"

const userLogin = function(from) {
    return http.post("/api/user/login",from);
}
const register = function(from) {
    return http.post("/api/user/register",from);
}


export default {
    userLogin,
    register
}