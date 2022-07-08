import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/Home/HomeView.vue";
import DetailsView from "../views/DetailsView.vue";
import AccountingView from "../views/AccountingView.vue";
import ClosureView from "../views/ClosureView.vue";
import DistributonView from "../views/DistributionView.vue";
import LoginView from "../views/Login/LoginView.vue";
import MainLayout from "../layouts/MainLayout/index.vue";
import EmptyLayout from "../layouts/EmptyLayout/indexLogin.vue";
import NotFoundView from "../views/NotFoundView.vue";
import store from "@/store";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/login",
    component: EmptyLayout,
    children: [
      {
        path: "",
        name: "log-in",
        component: LoginView,
      },
    ],
  },
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFoundView,
  },
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
        component: AccountingView,
      },
    ],
  },
  {
    path: "/distribution",
    name: "distribution",
    component: MainLayout,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "",
        name: "distribution",
        component: DistributonView,
      },
    ],
  },
  {
    path: "/closure",
    name: "closure",
    component: MainLayout,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "",
        name: "closure",
        component: ClosureView,
      },
    ],
  },
  {
    path: "/details",
    name: "datils",
    component: MainLayout,
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "",
        name: "details",
        component: DetailsView,
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
      next({ name: "log-in" });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
