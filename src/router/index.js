import { createRouter, createWebHistory } from 'vue-router'
import { keycloak } from '../utils/keycloak'
import { useMainStore } from '../stores/MainStore.js';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: { name: 'portal' },
      meta: {
        requiresAuth: false
      }
    },

    {
      path: '/portal',
      name: 'portal',

      component: () => import('../views/portal/PortalView.vue'),
      meta: {
        requiresAuth: false
      }
    },

    {
      path: '/admin/dashboard',
      name: 'dashboard',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/admin/AdminDashboardView.vue'),
      meta: {
        requiresAuth: true,
        roles: ['admin']
      }
    },
    {
      path: '/student/dashboard',
      name: 'dashboard_est',
      component: () => import('../views/users/student/StudentHomeView.vue'),
      meta: {
        requiresAuth: true,
        roles: ['user']
      }
    },
    {
      path: '/admin/areas',
      name: 'admin-areas',
      component: () => import('../views/admin/configgeneral/AreaView.vue'),
      meta: {
        requiresAuth: true,
        roles: ['admin']
      }
    },
    {
      path: '/admin/careers',
      name: 'admin-careers',
      component: () => import('../views/admin/configgeneral/CareerView.vue'),
      meta: {
        requiresAuth: true,
        roles: ['admin']
      }
    },
    {
      path: '/admin/subjects',
      name: 'admin-subjects',
      component: () => import('../views/admin/configgeneral/SubjectView.vue'),
      meta: {
        requiresAuth: true,
        roles: ['admin']
      }
    },
    {
      path: '/admin/schedule',
      name: 'admin-schedule',
      component: () => import('../views/admin/configgeneral/ScheduleParamsView.vue'),
      meta: {
        requiresAuth: true,
        roles: ['admin']
      }
    },
    {
      path: '/admin/itinerary',
      name: 'admin-itineraries',
      component: () => import('../views/admin/configclass/ItineraryView.vue'),
      meta: {
        requiresAuth: true,
        roles: ['admin']
      }
    },

    {
      path: '/admin/manage-classes',
      component: () => import('../views/admin/configclass/ManageClassesView.vue'),
      children: [
        {
          path: '',
          name: 'admin-manage-classes',
          component: () => import('../views/admin/configclass/ManageClassesByYearView.vue')
        },
        {
          path: 'generate',
          component: () => import('../views/admin/configclass/ManageClassesGenerateView.vue')
        }
      ],
      meta: {
        requiresAuth: true,
        roles: ['admin']
      }
    },


    {
      path: '/admin/classroom',
      name: 'admin-classroom',
      component: () => import('../views/admin/configgeneral/ClassroomView.vue'),
      meta: {
        requiresAuth: true,
        roles: ['admin']
      }
    },

    {
      path: '/:pathMatch(.*)*',
      component: () => import('../views/notfound/notFoundView.vue'),
      name: 'not-found',
      meta: {
        requiresAuth: false
      }
    
    },
    
    {
      path: '/admin/academic-period',
      name: 'admin-academic-period',
      component: () => import('../views/admin/configgeneral/AcademicPeriodView.vue'),
      meta: {
        requiresAuth: true,
        roles: ['admin']
      }
    },
    {
      path: '/admin/areas/:areaId/careers/:careerId/itineraries/:itineraryId',
      name: 'admin-see-itinerary',
      component: () => import('../views/admin/configclass/SeeItineraryView.vue'),
      meta: {
        requiresAuth: true,
        roles: ['admin']
      }
    },
    {
      path:'/admin/areas/:areaId/careers/:careerId/itineraries/:itineraryId/itinerary-groups',
      name: 'admin-groups',
      component:()=> import('../views/admin/configclass/GroupView.vue'),
      meta: {
        requiresAuth: true,
        roles: ['admin']
      }
    },
    {
      path: '/admin/classrooms',
      name: 'admin-classrooms',
      component: () => import('../views/admin/configgeneral/ClassroomView.vue'),
      meta: {
        requiresAuth: true,
        roles: ['admin']
      }
    },
    {
      path: '/admin/areas/:areaId/careers/:careerId/itineraries/:itineraryId/edit',
      name: 'admin-edit-itinerary',
      component: () => import('../views/admin/configclass/EditGroupItineraryView.vue'),
      meta: {
        requiresAuth: true,
        roles: ['admin']
      }
    },
    {
      path: '/student/matriculation',
      name: 'matriculation',
      component: () => import('../views/users/student/MatriculationView.vue'),
      meta: {
        requiresAuth: true,
        roles: ['admin']
      }
    },
    {
      path: '/student/class-schedule',
      name: 'class-schedule',
      component: () => import('../views/users/student/ClassScheduleView.vue'),
      meta: {
        requiresAuth: true,
        roles: ['user']
      }
    },
    {
      path: '/student/kardex',
      name: 'kardex',
      component: () => import('../views/users/student/KardexView.vue'),
      meta: {
        requiresAuth: true,
        roles: ['user']
      }
    },
    {
      path: '/student/curriculum',
      name: 'curriculum',
      component: () => import('../views/users/student/CurriculumView.vue'),
      meta: {
        requiresAuth: true,
        roles: ['user']
      }
    },
    {
      path: '/portal/registration',
      name: 'registration',
      component: () => import('../views/portal/RegisterView.vue'),
      meta: {
        requiresAuth: false,
        roles: ['admin', 'user']
      }
    }, 
  ]
});

router.beforeEach(async (to, from, next) => {
  const userInfo = useMainStore().getUserInfo();
  if (to.meta.requiresAuth) {
      if (keycloak.authenticated) {
        if(to.meta.roles.includes(userInfo['role'])) {
          next();
        } else {
          next({ name: 'home' });//Here redirect to unauthorized view
        }
      } else {
        await keycloak.login();
      }
  } else {
      next();
  }
});

export default router
