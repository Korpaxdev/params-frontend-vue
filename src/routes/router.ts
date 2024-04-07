import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes.ts";

const router = createRouter({ routes, history: createWebHistory() });
export default router;
