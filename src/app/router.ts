import { createRouter, createWebHistory } from 'vue-router';

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: '/blog',
    },
    {
      path: '/blog',
      name: 'blog',
      component: () => import('@/pages/blog.vue'),
    },
  ],
});
