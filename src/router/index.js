import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
import Auth from '../views/Auth'
import Home from '../views/Home.vue'
import Active from '../views/Active'
import AdminConfirm from '../views/AdminConfirm'
import Register from "../views/authForms/Register";
import IomTutor from '../views/tutor/iom/index'
import IomAdmin from '../views/admin/iom/index'
import IomCreate from '../views/tutor/iom/create'
import ExerciselistAndCreate from '../views/tutor/exercise/index'
import udTask from '../views/tutor/exercise/udTask'
import library from '../views/tutor/library/'
import libraryUD from '../views/tutor/library/libraryUD'
import NotFound from '../views/NotFound'
import {before} from '../api/checkroleIom'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    // beforeEnter: before(),
    beforeEnter: async (to, from, next) => {
      try{
         await store.dispatch('auth/confirmRole')
        const roleAuth = store.state['auth'].role
        if(roleAuth == 'student' || roleAuth == 'tutor'  && store.state['auth'].status == 'on') {
          to.meta.layout = await store.state['auth'].role
          await store.dispatch('user/getUserData',localStorage.getItem('jwt-token'))
          next()
        } else if (roleAuth == 'admin'  && store.state['auth'].status == 'null') {
          to.meta.layout = await store.state['auth'].role
          await store.dispatch('user/getAdminData',localStorage.getItem('jwt-token'))
          next('/adminconfirm?token='+store.state['auth'].token)
        }else if (roleAuth == 'admin'  && store.state['auth'].status == 'on') {
          to.meta.layout = await store.state['auth'].role
          await store.dispatch('user/getAdminData',localStorage.getItem('jwt-token'))
          next()
        } else if (store.state['auth'].role && store.state['auth'].status == 'null') {
          next('/active?token='+store.state['auth'].token)
        } else {
          console.log('нет подтверждения роли')
          next('/auth?message=auth')
        }
      } catch(e){
        console.log('Ошибка подтверждения')
      }
    },
    meta:{
      auth: true,
      role: store.state['auth'].role,
    },
  },

  {
    path: '/iom',
    name: 'iom',
    component: () => {
      switch (store.state['auth'].role) {
        case "admin":
          return IomAdmin
        case "tutor":
          return IomTutor
        case "seller":
          return 'fdfdf'
      }

    },
    beforeEnter: before(),
    meta:{
      auth: true,
      role: store.state['auth'].role,
    },
  },

  {
    path: '/iom/create',
    name: '/iom/create',
    component: IomCreate,
    beforeEnter: before(),
    meta:{
      auth: true,
      role: store.state['auth'].role,
    },
  },

  {
    path: '/iom/:id/exercise',
    name: 'addExercise',
    component: ExerciselistAndCreate,
    beforeEnter: before(),
    meta:{
      auth: true,
      role: store.state['auth'].role,
    },
  },

  {
    path: '/iom/:id/exercise/:task',
    name: 'updateDeleteOpen',
    component: udTask,
    beforeEnter: before(),
    meta:{
      auth: true,
      role: store.state['auth'].role,
    },
  },

  {
    path: '/library',
    name: 'library',
    component: library,
    beforeEnter: before(),
    meta:{
      auth: true,
      role: store.state['auth'].role,
    },
  },

  {
    path: '/library/:id',
    name: 'libraryUpdateDelete',
    component: libraryUD,
    beforeEnter: before(),
    meta:{
      auth: true,
      role: store.state['auth'].role,
    },
  },

  {
    path: '/help',
    name: 'Help',
    component: ()=> import('../views/Help.vue'),
    meta:{
      layout:'main',
      auth:true,
    }
  },
  {
    path: '/auth',
    name: 'Auth',
    component: Auth,
    meta:{
      layout:'auth',
      auth:false
    }
  },
  {
    path: '/active',
    name: 'Active',
    component: Active,
    meta:{
      layout:'auth',
      auth:false
    }
  },

  {
    path: '/adminconfirm',
    name: 'AdminConfirm',
    component: AdminConfirm,
    meta:{
      layout:'auth',
      auth:false
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/authForms/Register.vue'),
    meta:{
      layout:'auth',
      auth:false
    }
  },
  {
    path: '/404',
    name: 'NotFound',
    component: NotFound,
    meta:{
      auth:false,
      layout: 'NotFound'
    }
  },

  {
    path: '/regtutor',
    name: 'Regtutor',
    component: ()=> import('../views/authForms/Regtutor.vue'),
    meta:{
      layout:'auth',
      auth:false
    }
  },

  {
    path: '/regadmin',
    name: 'RegAdmin',
    component: ()=> import('../views/authForms/Regadmin.vue'),
    meta:{
      layout:'auth',
      auth:false
    }
  },
  {
    path: '/recovery',
    name: 'Recovery',
    component: ()=> import('../views/Recovery.vue'),
    meta:{
      layout:'auth',
      auth:false
    }
  }
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})

router.beforeEach((to,from,next) => {
  const requireAuth = to.meta.auth

  if(requireAuth && store.getters['auth/isAuthenticated']){
    next()
  }else if(requireAuth && !store.getters['auth/isAuthenticated']){
    next('/auth?message=auth')
  }else {
    next()
  }
})

export default router
