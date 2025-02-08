import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import DataExtractView from '@/views/DataExtractView.vue'
import ManualUpdateView from '@/views/ManualUpdateView.vue'
import AutoUpdateView from '@/views/AutoUpdateView.vue'
import SettingView from '@/views/SettingView.vue'
import path from 'path'

const routes = [
  {
    path: '/',
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
  },
  {
    path: '/auto-update',
    component: AutoUpdateView,
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
