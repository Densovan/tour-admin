import { storeToRefs } from "pinia";
import { useAuthStore } from "@/stores/auth";
import { createRouter, createWebHistory } from "vue-router";
import DefaultLayout from "../components/layouts/default.layout.vue";
import BlankLayout from "../components/layouts/blank.layout.vue";
import DashboardView from "@/views/dashboard-view.vue";
import AboutView from "@/views/AboutView.vue";
import LoginView from "@/views/login/login.vue";

const routes = [
  {
    path: "/",
    redirect: "/dashboard",
    component: DefaultLayout,
    name: "",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: DashboardView,
        meta: {
          isRequiredAuth: true,
          isPublic: false,
        },
      },
      {
        path: "about",
        name: "About",
        component: AboutView,
      },
      {
        path: "category",
        name: "Category",
        component: () => import("@/views/category/index.vue"),
        meta: {
          isRequiredAuth: true,
          isPublic: false,
        },
      },
    ],
  },
  {
    path: "/",
    component: BlankLayout,
    children: [
      {
        path: "login",
        name: "Login",
        component: LoginView,
        meta: {
          isRequiredAuth: false,
          isPublic: true,
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const { isAuthenticated } = storeToRefs(authStore);
  console.log(isAuthenticated.value, to.meta.isRequiredAuth);
  if (to.meta.isRequiredAuth && isAuthenticated.value === false) {
    next({ name: "Login" });
  } else if (isAuthenticated.value && to.meta.isPublic) {
    next({ name: "Dashboard" });
  } else if (isAuthenticated.value && to.meta.permissionRequired) {
    next({ name: "Dashboard" });
  } else {
    next();
  }
});

export default router;
