import Containers from "../containers"
export default [
    {
        path: "/",
        exact: true,
        component: Containers.Login
    },
    {
        path: "/login",
        component: Containers.Login,
        is_redirect: true
    },
    {
        path: "/register",
        component: Containers.Register
    },
    {
        path: "/article",
        component: Containers.Article
    }
]