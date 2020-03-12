import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const router = new Router({
  routes: [{
      path: '/',
      component: () => import('@/views/home/index.vue'),
      children: [{
          path: '',
          component: () => import('@/views/home/homeImg.vue')
      },
        {
          path: 'initTask',
          component: () => import('@/views/home/initTask.vue')
        },
        {
          path: 'taskState',
          component: () => import('@/views/home/taskState.vue')
        },
        {
          path: 'resultsSummary',
          component: () => import('@/views/home/resultsSummary.vue')
        },
        {
          path: 'waiting',
          component: () => import('@/views/home/waiting.vue')
        }
      ]
    },
    {
      path: '/evaluateTask',
      component: () => import('@/views/evaluateTask/index.vue'),
    }
  ]
})