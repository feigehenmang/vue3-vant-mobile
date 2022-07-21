// https://router.vuejs.org/zh/
import { createRouter, createWebHashHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
NProgress.configure({ showSpinner: true })

// 导入路由组件
import mian from '@/views/index.vue'
import mock from '@/views/mock/index.vue'

// 定义路由，每个路由都需要映射到一个组件
const routes = [
  {
    path: '/',
    name: 'main',
    component: mian
  }, {
    path: '/mock',
    name: 'mock',
    component: mock
  },
  {
    path: '/onlinesign',
    name: 'onlinesign',
    component: () => import('@/views/legalPersonStep1/index.vue')
  },
  {
    path: '/auth',
    name: 'auth',
    component: () => import('@/views/legalPersonAuth/index.vue')
  },
  {
    path: '/sign',
    name: 'sign',
    component: () => import('@/views/legalPersonSign/index.vue')
  }
]

// 创建路由实例并传递 `routes` 配置
const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    // 始终滚动到顶部
    return { top: 0 }
  },
})

router.beforeEach((_to, _from, next) => {
  NProgress.start(); // start progress bar
  next()
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})

// 导出路由实例，并在 `main.ts` 挂载
export default router
