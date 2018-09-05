import Containers from "../containers"
export default [
    {
        path: "/",
        exact: true,
        component: Containers.Home
    },
    {
        path: "/home",
        exact: true,
        component: Containers.Home
    },
    {
        path: "/article",
        exact: true,
        component: Containers.Article,
        is_redirect: true
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
        path: "/article/add",
        component: Containers.AddArticle
    }
]