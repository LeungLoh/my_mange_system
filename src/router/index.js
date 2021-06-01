import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
    {
        path: "/",
        redirect: "/dashboard"
    },
    {
        path: "/",
        name: "Home",
        component: Home,
        children: [
            {
                path: "/dashboard",
                name: "dashboard",
                meta: {
                    title: "系统首页"
                },
                component: () => import("../views/Dashboard.vue")
            }
        ]
    },
    {
        path: "/login",
        name: "Login",
        meta: {
            title: "登录"
        },
        component: () => import("../views/Login.vue")
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
});

export default router;