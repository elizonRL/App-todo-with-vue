import { createRouter, createWebHistory } from "vue-router";
import Home from "./views/Home.vue";
import Abaut from "./views/Abaut.vue";

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/abaut",
    component: Abaut,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export { router };
