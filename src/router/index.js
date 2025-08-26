import { createRouter, createWebHashHistory } from "vue-router";
import Home from "@/views/Home.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/about", name: "About", component: () => import("@/views/About.vue") },
  { path: "/actions", name: "Actions", component: () => import("@/views/Actions.vue") },
  { path: "/sdgs", name: "SDGs", component: () => import("@/views/SDGs.vue") },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
