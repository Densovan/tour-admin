import { VueQueryPlugin } from "@tanstack/vue-query";
import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";
import BlankLayout from "../src/components/layouts/blank.layout.vue";
import DefaultLayout from "../src/components/layouts/default.layout.vue";
import NavbarVue from "./components/layouts/navbar.vue";
import SidebarVue from "./components/layouts/sidebar.vue";
import router from "./router";
import "@/styles/index.scss";
import "uno.css";

// If you want to use ElMessage, import it.
import "element-plus/theme-chalk/src/message.scss";

const app = createApp(App);

app.use(VueQueryPlugin);
app.use(createPinia());
app.use(router);
// app.use(ElementPlus);

app.mount("#app");

app
  .component("BlankLayout", BlankLayout)
  .component("DefaultLayout", DefaultLayout)
  .component("Navbar", NavbarVue)
  .component("Sidebar", SidebarVue);
