import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Home')
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import(/* webpackChunkName: "home" */ '@/views/Auth')
  },
  {
    path: '/all',
    name: 'All',
    component: () => import(/* webpackChunkName: "all" */ '@/views/All')
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

const restrictedPaths = ['/', '/all', '/orders'];

router.beforeEach((to, from, next) => {
  if (
    restrictedPaths.includes(to.path) &&
    !localStorage.getItem('auth') &&
    !to.query.code
  ) {
    next({ name: 'Auth' });
  } else {
    next();
  }
});
export default router;
