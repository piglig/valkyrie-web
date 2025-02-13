import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/IndexView.vue'
import DataExtractView from '@/views/DataExtractView.vue'
import ManualUpdateView from '@/views/manual_update/ManualUpdateView.vue'
import AutoUpdateView from '@/views/auto_update/AutoUpdateView.vue'
import SettingView from '@/views/SettingView.vue'
import ManualMainView from '@/views/manual_update/MainView.vue'
import AutoMainView from '@/views/auto_update/MainView.vue'
import path from 'path'

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/data-extract',
    component: DataExtractView,
  },
  {
    path: '/manual-update',
    component: ManualUpdateView,
    children: [
      {
        path: ':service',
        component: ManualMainView,
        props: true
      }
    ]
  },
  {
    path: '/auto-update',
    component: AutoUpdateView,
    children: [
      {
        path: ':service',
        component: AutoMainView,
        props: true
      }
    ]
  },
  {
    path: '/settings',
    component: SettingView,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: HomeView,
    // component: () => import('../views/AboutView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
