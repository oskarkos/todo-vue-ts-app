import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import LoginView from "../views/LoginView.vue";
import MainLayout from "../layouts/MainLayout/index.vue";
import EmptyLayout from "../layouts/EmptyLayout/indexLogin.vue";
import store from "@/store";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "tasks",
    component: MainLayout,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "",
        name: "tasks",
        component: HomeView,
      },
    ],
  },
  {
    path: "/accouting",
    name: "accouting",
    component: MainLayout,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "",
        name: "accouting",
        component: AboutView,
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: EmptyLayout,
    children: [
      {
        path: "",
        name: "login-index",
        component: LoginView,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.state.loggedIn) {
      console.log("not logged in");
      next({ name: "login-index" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
