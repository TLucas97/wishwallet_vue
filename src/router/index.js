import Vue from "vue";
import VueRouter from "vue-router";
import userWallet from "../views/user-wallet.vue";
import userLogin from "../views/user-login.vue";
import userTrading from "../views/user-trading.vue";
import Main from "../views/main-page.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/login",
    name: "User login",
    component: userLogin,
  },
  {
    path: "/wallet",
    name: "User wallet",
    component: userWallet,
  },
  {
    path: "/trading",
    name: "User trading",
    component: userTrading,
  },
  {
    path: "/",
    name: "Main page",
    component: Main,
  },
];

const router = new VueRouter({
  routes,
});

export default router;
