import Vue from "vue";
import { Button, Select } from "element-ui";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { Route } from 'vue-router';
import './assets/styles.less';
import { Component } from 'vue-property-decorator';
import storage from './global/storage';

Vue.use(Button);
Vue.use(Select);

Vue.prototype.$storage = storage;
Vue.config.productionTip = false;
Component.registerHooks([
  'beforeRouteEnter',
  'beforeRouteLeave',
  'beforeRouteUpdate',
]);
router.beforeEach((to: Route, from: Route, next: () => void) => {
  if (from.meta.keepAlive) {
    const $content = document.querySelector('#content');
    const scrollTop = $content ? $content.scrollTop : 0;
    from.meta.scrollTop = scrollTop;
  }
  next();
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
