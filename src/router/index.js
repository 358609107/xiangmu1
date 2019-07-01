import Vue from 'vue';
import VueRouter from 'vue-router';
import Nprogress from 'nprogress';
import { getUser } from '@/utils/auth';

Vue.use(VueRouter);

const router = new VueRouter({
  routes: [
    // {
    //   name: 'home',
    //   path: '/',
    //   // 在整个项目中，模块路径中的@表示的是 src目录
    //   // 无论你的当前模块在哪里，@都可以直接定位到src
    //   // 加载一个目录可以默认加载它的index.js , index.vue ,index.json....
    //   component: () => import('@/views/home')
    // },
    {
      name: 'login',
      path: '/login',
      component: () => import('@/views/login')
    },
    {
      // name:'Layout',
      path: '/',
      component: () => import('@/views/layout'),
      children: [
        {
          name: 'home',
          path: '/home',
          component: () => import('@/views/home')
        },
        {
          name: 'article',
          path: '/article',
          component: () => import('@/views/article')
        }
      ]

    }

  ]
});

router.beforeEach((to, from, next) => {
  Nprogress.start();
  // console.log(to);
  // const userInfo = window.localStorage.getItem('user_info')
  const userInfo = getUser();
  if (to.path !== '/login') {
    if (!userInfo) {
      if (from.path === '/login') {
        Nprogress.done();
      }

      next({ name: 'login' });
    } else {
      next();
    }
  } else {
    if (!userInfo) {
      next();
    } else {
      // next(false);
      window.location.href = '/#/';
      window.location.reload();
    }
  }
});
router.afterEach((to, from) => {
  Nprogress.done();
  // console.log(to);
});
export default router;
