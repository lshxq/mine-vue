const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login/login-index.vue"),
  },
  {
    path: "/403",
    name: "403",
    component: () => import("../views/403.vue"),
  },
  {
    path: "/",
    name: "index",
    redirect: "/home",
  },
  {
    path: "/home",
    name: "home",
    component: () => import("../views/home-index.vue"),
  },
];

export default routes;
