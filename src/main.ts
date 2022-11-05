import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import hljs from 'highlight.js';
import 'highlight.js/styles/atom-one-dark.css' //样式
import VueI18n from 'vue-i18n';
import i18n from './i18n/index'


Vue.use(VueI18n);
//创建v-highlight全局指令
Vue.directive('highlight',function (el) {
  let blocks = el.querySelectorAll('pre code');
  blocks.forEach((block)=>{
    hljs.highlightBlock(block as any)
  })
})


Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
