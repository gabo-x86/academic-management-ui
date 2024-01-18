import { createRouter, createWebHistory } from 'vue-router'
import MainAdminView from '@/views/admin/MainAdminView.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MainAdminView
    },
    {
      path: '/admin/areas',
      name: 'admin-areas',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/admin/configgeneral/AreaView.vue')
    },
    {
      path: '/admin/careers',
      name: 'admin-careers',
      component: () => import('../views/admin/configgeneral/CareerView.vue')
    },
    {
      path: '/admin/subjects',
      name: 'admin-subjects',
      component: () => import('../views/admin/configgeneral/SubjectView.vue')
    },
    {
      path: '/admin/schedule',
      name: 'admin-schedule',
      component: () => import('../views/admin/configgeneral/ScheduleParamsView.vue')
    }
  ]
})

export default router
