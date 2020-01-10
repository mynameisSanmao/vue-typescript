import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta:{
      keepAlive:true,
      scrollTop:0
    }
  },
  {
    path: '/Center',
    name: 'Center',
    component: () => import('../views/userCenter.vue'),
    // children: [
    //   {
    //     path: 'setting',
    //     component: () => import('./components/center/Setting.vue'),
    //   },
    // ],
  },
  {
    path: '/center/setting',
    name: 'MDate',
    component: () => import('../components/userCenter/MDate.vue'),
  },
  {
    path: '/center/mags',
    name: 'UserCenterMags',
    component: () => import('../components/userCenter/Mags.vue'),
  },
  {
    path: '/shoppingCart',
    name: 'Cart',
    component: () => import('../views/shoppingCart.vue'),
    meta:{
      keepAlive:true,
      scrollTop:0
    }
  },
  {
    path: '/goods/:id',
    name: 'goods',
    component: () => import('../views/Goods.vue'),
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

export default router;
