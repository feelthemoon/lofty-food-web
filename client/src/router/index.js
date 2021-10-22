import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import(/* webpackChunkName: "main" */ '@/views/Main.vue'),
  },
  {
    path: '/signin',
    component: () => import(/* webpackChunkName: "auth" */ '@/views/Auth.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
