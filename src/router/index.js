import { createRouter, createWebHistory } from "vue-router";
import BaseDisplay from "../components/BaseDisplay.vue";

const routes = [
  {
    path: "/",
    name: "BaseDisplay",
    component: BaseDisplay,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
