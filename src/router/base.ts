export default [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home/index.vue'),
    meta: { keepAlive: true },
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('@/views/home/test.vue'),
    meta: { keepAlive: true },
  },
];
