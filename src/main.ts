import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { createPinia } from 'pinia';
import { createApp } from 'vue';

import App from './App.vue';
import router from './routes/router.ts';
import './styles.css';

const pinia = createPinia();
const app = createApp(App);
app.use(pinia).use(router);
app.mount('#app');
