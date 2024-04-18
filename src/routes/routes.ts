import { RouteRecordRaw } from 'vue-router';

import IndexPage from '../pages/IndexPage.vue';
import LoginPage from '../pages/LoginPage.vue';
import NotFoundPage from '../pages/NotFoundPage.vue';
import OauthPage from '../pages/OauthPage.vue';
import ParamsToServerPage from '../pages/ParamsToServerPage.vue';
import PasswordChangePage from '../pages/PasswordChangePage.vue';
import PasswordResetCompletePage from '../pages/PasswordResetCompletePage.vue';
import PasswordResetEmailSendPage from '../pages/PasswordResetEmailSendPage.vue';
import ProfilePage from '../pages/ProfilePage.vue';
import RegisterPage from '../pages/RegisterPage.vue';
import { JWT_REGEXP, UUID_REGEXP } from '../utils/otherUtils.ts';

const routes: ReadonlyArray<RouteRecordRaw> = [
  { path: '/', component: IndexPage, name: 'IndexPage' },
  { path: '/login', component: LoginPage, name: 'LoginPage' },
  { path: '/profile', component: ProfilePage, name: 'ProfilePage' },
  { path: '/password-change', component: PasswordChangePage, name: 'PasswordChangePage' },
  { path: '/password-reset', component: PasswordResetEmailSendPage, name: 'PasswordResetEmailSendPage' },
  {
    path: `/password-reset/complete/:token(${UUID_REGEXP.source})`,
    component: PasswordResetCompletePage,
    name: 'PasswordResetCompletePage',
  },
  { path: '/register', component: RegisterPage, name: 'RegisterPage' },
  { path: '/to-server', component: ParamsToServerPage, name: 'ParamsToServerPage' },
  {
    path: '/oauth',
    component: OauthPage,
    name: 'OauthPage',
    beforeEnter(to) {
      return JWT_REGEXP.test(to.query.access as string) && JWT_REGEXP.test(to.query.refresh as string);
    },
  },
  {
    path: '/:pathMatch(.*)*',
    component: NotFoundPage,
    name: 'NotFoundPage',
  },
];
export default routes;
