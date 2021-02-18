import Vue from "vue";
import VueRouter from "vue-router";
import TokenService from "@/services/token.service";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "cards",
    component: () => import("@/views/Cards/Cards.vue"),
    meta: {
      public: false
    }
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login/Login.vue"),
    meta: {
      public: true,
      onlyWhenLoggedOut: true
    }
  },
  {
    path: "/404",
    name: "404",
    component: () => import("@/views/Errors/404.vue"),
    meta: {
      public: true
    }
  },
  {
    path: "/500",
    name: "error",
    component: () => import("@/views/Errors/500.vue"),
    meta: {
      public: true
    }
  },
  {
    path: "*",
    redirect: "/404"
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const isPublic = to.matched.some(record => record.meta.public);
  const onlyWhenLoggedOut = to.matched.some(
      record => record.meta.onlyWhenLoggedOut
  );
  const loggedIn = !!TokenService.getToken();

  if (!isPublic && !loggedIn) {
    return next({
      path: "/login",
      query: { redirect: to.fullPath }
    });
  }
  if (loggedIn && onlyWhenLoggedOut) {
    return next({
      path: "/"
    });
  }

  return next();
});

export default router;
