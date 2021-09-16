import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes.js";
// import utils from "@/utils/utils.js";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  next();
});

export default router;
