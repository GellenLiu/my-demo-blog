import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "../views/Home.vue";
import projectList from '@/views/projectList.vue';
import demoHome from '@/views/demoHome.vue';
import copy from '@/views/javascript/copy.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/projectList",
    name: "projectList",
    component: projectList,
  },
  {
    path: "/my-demo-blog",
    component: demoHome,
    children: [
      {
        path: "/copy",
        component: copy
      },
      {
        path: "/shareScreen",
        component: () =>
        import("../views/shareScreen/index.vue")
      }
    ]
  },
  {
    path: "/about",
    name: "About",
    component: () =>
      import("../views/About.vue"),
  },
];

const router = new VueRouter({
  mode: "hash",
  base: process.env.BASE_URL,
  routes,
});

export default router;
export {routes};