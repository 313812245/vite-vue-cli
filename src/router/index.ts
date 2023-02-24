import Vue from 'vue';
import VueRouter from 'vue-router';

let routes: any[] = [];
let base: any;
try {
  base = import.meta.env.BASE_URL;
  const files: any = import.meta.globEager('./*.ts');
  Object.keys(files).forEach((fileName) => {
    routes.push(...files[fileName].default);
  });
} catch (err) {
  base = '/';
  routes = [
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
}

routes.push({
  path: '/:pathMatch(.*)',
  name: '404',
  component: () => import('@/views/404.vue'),
  meta: {
    keepAlive: true,
    fullScreen: true,
  },
});

Vue.use(VueRouter);
const router = new VueRouter({
  mode: 'history',
  base: base,
  routes,
});

// 总控
router.beforeEach((to, from, next) => {
  // 滚回顶端
  window.scrollTo(0, 0);
  const app: any = document.body;
  app.className = to.path.slice(1).replace(/\//g, '-') || 'home-wrap';
  next();
});

export default router;
