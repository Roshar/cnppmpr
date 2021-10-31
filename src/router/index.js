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
import Tutors from '../views/admin/tutor'
import TutorProfileEdit from '../views/tutor/editProfile'
import AdminProfileEdit from '../views/admin/editProfile'

import Tag from '../views/admin/tag'
import GlobalLibrary from '../views/admin/library'
import GlobalLibraryShow from '../views/admin/library/show'
import GlobalLibraryCreate from '../views/admin/library/create'
import GlobalLibraryEdit from '../views/admin/library/edit'

import StudentProfileAdmin from '../views/admin/student/profile'
import TutorProfile from '../views/admin/tutor/profile'
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
import {withoutIsAuth} from '../api/withoutIsAuth'
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
    },
  },


  {
    path: '/editProfile',
    name: 'tutorProfileEdit',
    component: () => {
      switch (store.state['auth'].role) {
        case "admin":
          return AdminProfileEdit
        case "tutor":
          return TutorProfileEdit
      }
    },
    beforeEnter: before(),
    meta:{
      auth: true,
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
    },
  },

  {
    path: '/tutors',
    name: 'tutors',
    component:Tutors,
    beforeEnter: beforeAdmin(),
    meta:{
      auth: true,
    },
  },

  {
    path: '/tutor/profile/:userId',
    name: 'tutorProfile',
    component:TutorProfile,
    beforeEnter: beforeAdmin(),
    meta:{
      auth: true,
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
    },
  },

  {
    path: '/conversations/:chat/:user',
    name: 'conv',
    component: () => {
      switch (store.state['auth'].role) {
        case "admin":
          return chatAdmin
        case "tutor":
          return chatTutor
      }
    },
    beforeEnter: before(),
    meta: {
      auth: true,
      layout: 'AdminContext'
    }
  },

  {
    path: '/search',
    name: 'search',
    component: SearchAdmin,
    beforeEnter: beforeAdmin(),
    meta:{
      auth: true,
    },
  },

  {
    path: '/last',
    name: 'last',
    component: LastAdmin,
    beforeEnter: beforeAdmin(),
    meta:{
      auth: true,
    },
  },

  // tag admin START -----//////////////////////////////////////////

  {
    path: '/tag',
    name: 'tag',
    component: Tag,
    beforeEnter: beforeAdmin(),
    meta:{
      auth: true,
    },
  },

  {
    path: '/tag/:id',
    name: 'tagId',
    component: Tag,
    beforeEnter: beforeAdmin(),
    meta:{
      auth: true,
    },
  },

  // tag admin END -----//////////////////////////////////////////

  // library admin START -----//////////////////////////////////////////

  {
    path: '/global_library',
    name: 'globalLibrary',
    component: GlobalLibrary,
    beforeEnter: beforeAdmin(),
    meta:{
      auth: true,
    },
  },

  {
    path: '/global_library/:id',
    name: 'globalLibraryShow',
    component: GlobalLibraryShow,
    beforeEnter: beforeAdmin(),
    meta:{
      auth: true,
    },
  },

  {
    path: '/global_library/create',
    name: 'globalLibraryCreate',
    component: GlobalLibraryCreate,
    beforeEnter: beforeAdmin(),
    meta:{
      auth: true,
    },
  },

  {
    path: '/global_library/edit/:id',
    name: 'globalLibraryEdit',
    component: GlobalLibraryEdit,
    beforeEnter: beforeAdmin(),
    meta:{
      auth: true,
    },
  },

  // library admin END -----//////////////////////////////////////////

  {
    path: '/group',
    name: 'group',
    component: Group,
    beforeEnter: beforeAdmin(),
    meta:{
      auth: true,
    },
  },

  {
    path: '/group/:id',
    name: 'groupSingle',
    component: SingleGroup,
    beforeEnter: beforeAdmin(),
    meta:{
      auth: true,
    },
  },

  {
    path: '/iom/create',
    name: '/iom/create',
    component: IomCreate,
    beforeEnter: before(),
    meta:{
      auth: true,
    },
  },

  {
    path: '/iom/:id/exercise',
    name: 'addExercise',
    component: ExerciselistAndCreate,
    beforeEnter: before(),
    meta:{
      auth: true,
    },
  },

  {
    path: '/iom/:id/exercise/:task',
    name: 'updateDeleteOpen',
    component: udTask,
    beforeEnter: before(),
    meta:{
      auth: true,
    },
  },

  {
    path: '/library',
    name: 'library',
    component: library,
    beforeEnter: before(),
    meta:{
      auth: true,
    },
  },

  {
    path: '/library/:id',
    name: 'libraryUpdateDelete',
    component: libraryUD,
    beforeEnter: before(),
    meta:{
      auth: true,
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
    beforeEnter:withoutIsAuth('auth'),
    meta:{
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
    beforeEnter:withoutIsAuth('auth'),
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
    },
  },

  {
    path: '/register',
    name: 'Register',
    component: () => import('../views/authForms/Register.vue'),
    beforeEnter:withoutIsAuth('auth'),
    meta:{
      auth:false
    }
  },

  {
    path: '/404',
    name: 'NotFound',
    component: NotFound,
    beforeEnter:withoutIsAuth('NotFound'),
    meta:{
      auth:false,
      layout: 'NotFound'
    }
  },

  {
    path: '/regtutor',
    name: 'Regtutor',
    component: ()=> import('../views/authForms/Regtutor.vue'),
    beforeEnter:withoutIsAuth('auth'),
    meta:{
      layout:'auth',
      auth:false
    }
  },

  {
    path: '/regadmin',
    name: 'RegAdmin',
    component: ()=> import('../views/authForms/Regadmin.vue'),
    beforeEnter:withoutIsAuth('auth'),
    meta:{
      auth:false
    }
  },

  {
    path: '/recovery',
    name: 'Recovery',
    component: ()=> import('../views/Recovery.vue'),
    beforeEnter:withoutIsAuth('auth'),
    meta:{
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


export default router
