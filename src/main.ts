import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

// import "./assets/main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@popperjs/core";
import "bootstrap/dist/js/bootstrap.min";
import "bootstrap";
import "@/assets/css/all.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
