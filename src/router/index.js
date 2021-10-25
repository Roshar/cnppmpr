import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
import Auth from '../views/Auth'
import Home from '../views/Home.vue'
import Active from '../views/Active'
import AdminConfirm from '../views/AdminConfirm'
import StudentTutorConfirm from '../views/StudentTutorConfirm'
import Register from "../views/authForms/Register";
import IomTutor from '../views/tutor/iom/index'
import IomAdmin from '../views/admin/iom/index'
import StudentAdmin from '../views/admin/student'
import StudentTutor from '../views/tutor/student'
import StudentProfileAdmin from '../views/admin/student/profile'
import StudentProfileTutor from '../views/admin/student/profile'
import SearchAdmin from '../views/admin/student/search'
import LastAdmin from '../views/admin/student/last'
import conAdmin from '../views/admin/conversation'
import conTutor from '../views/tutor/conversation'
import chatAdmin from '../views/admin/conversation/chat'
import chatTutor from '../views/tutor/conversation/chat'
import banAdmin from '../views/admin/student/ban'
import banTutor from '../views/tutor/student/ban'
import NotificationAdmin from '../views/admin/notification/index'
import NotificationTutor from '../views/tutor/notification/index'
import IomCreate from '../views/tutor/iom/create'
import ExerciselistAndCreate from '../views/tutor/exercise/index'
import udTask from '../views/tutor/exercise/udTask'
import Group from '../views/admin/group'
import SingleGroup from '../views/admin/group/single'
import library from '../views/tutor/library/'
import libraryUD from '../views/tutor/library/libraryUD'
import NotFound from '../views/NotFound'
import {before} from '../api/checkroleIom'
import {checkAccess} from '../api/checkActivePage'
import {beforeAdmin} from '../api/checkRoleAdmin'

const routes = [

  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: checkAccess(),
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
      }

    },
    beforeEnter: before(),
    meta:{
      auth: true,
      role: store.state['auth'].role,
    },
  },

  {
    path: '/students',
    name: 'students',
    component: () => {
      switch (store.state['auth'].role) {
        case "admin":
          return StudentAdmin
        case "tutor":
          return StudentTutor
      }
    },
    beforeEnter: before(),
    meta:{
      auth: true,
      role: store.state['auth'].role,
    },
  },

  {
    path: '/student/profile/:userId',
    name: 'userProfile',
    component: () => {
      switch (store.state['auth'].role) {
        case "admin":
          return StudentProfileAdmin
        case "tutor":
          return StudentProfileTutor
      }
    },
    beforeEnter: before(),
    meta:{
      auth: true,
      role: store.state['auth'].role,
    },
  },

  {
    path: '/ban',
    name: 'ban',
    component: () => {
      switch (store.state['auth'].role) {
        case "admin":
          return banAdmin
        case "tutor":
          return banTutor
      }
    },
    beforeEnter: before(),
    meta:{
      auth: true,
      role: store.state['auth'].role,
    },
  },
  {
    path: '/conversations',
    name: 'conversations',
    component: () => {
      switch (store.state['auth'].role) {
        case "admin":
          return conAdmin
        case "tutor":
          return conTutor
      }
    },
    beforeEnter: before(),
    meta:{
      auth: true,
      role: store.state['auth'].role,
    },
  },

  {
    path: '/conversations/:chat/:user',
    name: 'conversationsChats',
    component: () => {
      switch (store.state['auth'].role) {
        case "admin":
          return chatAdmin
        case "tutor":
          return chatTutor
      }
    },
    beforeEnter: before(),
    meta:{
      auth: true,
      role: store.state['auth'].role,
    },
  },

  {
    path: '/search',
    name: 'search',
    component: SearchAdmin,
    beforeEnter: beforeAdmin(),
    meta:{
      auth: true,
      role: store.state['auth'].role,
    },
  },
  {
    path: '/last',
    name: 'last',
    component: LastAdmin,
    beforeEnter: beforeAdmin(),
    meta:{
      auth: true,
      role: store.state['auth'].role,
    },
  },

  {
    path: '/group',
    name: 'group',
    component: Group,
    beforeEnter: beforeAdmin(),
    meta:{
      auth: true,
      role: store.state['auth'].role,
    },
  },

  {
    path: '/group/:id',
    name: 'groupSingle',
    component: SingleGroup,
    beforeEnter: beforeAdmin(),
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

  // {
  //   path: '/active',
  //   name: 'Active',
  //   component: Active,
  //   meta:{
  //     layout:'auth',
  //     auth:false
  //   }
  // },

  {
    path: '/adminconfirm',
    name: 'AdminConfirm',
    component: () => {
      switch (store.state['auth'].role) {
        case "admin":
          return AdminConfirm
        case "tutor":
          return StudentTutorConfirm
        case "student":
          return StudentTutorConfirm
        default:
          return StudentTutorConfirm
      }
    },
    meta:{
      layout:'auth',
      auth:false
    }
  },



  {
    path: '/notifications',
    name: 'notifications',
    component: () => {
      switch (store.state['auth'].role) {
        case "admin":
          return NotificationAdmin
        case "tutor":
          return NotificationTutor
      }

    },
    beforeEnter: before(),
    meta:{
      auth: true,
      role: store.state['auth'].role,
    },
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
