import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "@/views/Home.vue";
import projectList from '@/views/projectList.vue';
import demoHome from '@/views/demoHome.vue';
import routerListData from '@/data/routerListData.json';

const demoRouterList: any = routerListData.map((item: any) => {
  return {
    path: item.path,
    name: item.label,
    component: () => import(`@/${item.component}`) // 不能全是变量，会报错
  }
});


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
    children: demoRouterList
  },
  {
      path: "/notesbook",
      name: "notesbook",
      component: () =>
        import("../views/notesbook/index.vue"),
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