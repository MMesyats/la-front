import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Vehicles from "../views/Vehicles.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Vehicles",
    component: Vehicles,
  },
  {
    path: "/routes",
    name: "Routes",
    component: () => import("../views/Routes.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
