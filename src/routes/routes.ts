import { RouteRecordRaw } from "vue-router";
import IndexPage from "../pages/IndexPage.vue";
import LoginPage from "../pages/LoginPage.vue";
import ProfilePage from "../pages/ProfilePage.vue";
import RegisterPage from "../pages/RegisterPage.vue";
import PasswordChangePage from "../pages/PasswordChangePage.vue";
import ParamsToServerPage from "../pages/ParamsToServerPage.vue";

const routes: ReadonlyArray<RouteRecordRaw> = [
  { path: "/", component: IndexPage, name: "IndexPage" },
  { path: "/login", component: LoginPage, name: "LoginPage" },
  { path: "/profile", component: ProfilePage, name: "ProfilePage" },
  { path: "/password-change", component: PasswordChangePage, name: "PasswordChangePage" },
  { path: "/register", component: RegisterPage, name: "RegisterPage" },
  { path: "/to-server", component: ParamsToServerPage, name: "ParamsToServerPage" },
];
export default routes;
