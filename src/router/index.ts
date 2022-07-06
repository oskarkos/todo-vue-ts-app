import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import HomeView from "../views/HomeView.vue";
import MainLayout from "../layouts/MainLayout/index.vue";
import AboutView from "../views/AboutView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "tasks",
    component: MainLayout,
    children: [
      {
        path: "/",
        name: "tasks",
        component: HomeView,
      },
    ],
  },
  {
    path: "/accouting",
    name: "accouting",
    component: MainLayout,
    children: [
      {
        path: "/accouting",
        name: "accouting",
        component: AboutView,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
