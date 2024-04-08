import { createApp } from "vue";
import router from "./routes/router.ts";
import { createPinia } from "pinia";

import App from "./App.vue";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./styles.css";

const pinia = createPinia();
const app = createApp(App);
app.use(pinia).use(router);
app.mount("#app");
