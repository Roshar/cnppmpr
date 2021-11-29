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
import IomDataAdmin from '../views/admin/iom/single'
import TaskDataAdmin from '../views/admin/iom/task'
import StudentAdmin from '../views/admin/student'
import MyAccountAdmin from '../views/admin/myAccount'
import AcceptedExercises from '../views/tutor/accepted'
import AcceptedTask from '../views/tutor/accepted/task'


import StudentTutor from '../views/tutor/student'
import Tutors from '../views/admin/tutor'
import TutorProfileEdit from '../views/tutor/editProfile'
import AdminProfileEdit from '../views/admin/editProfile'
import StudentProfileEdit from '../views/student/editProfile'
import myCourse from '../views/student/course/index'
import myTask from '../views/student/course/task'
import myBox from '../views/student/box'

import Tag from '../views/admin/tag'
import GlobalLibrary from '../views/admin/library'
import GlobalLibraryShow from '../views/admin/library/show'
import GlobalLibraryCreate from '../views/admin/library/create'
import GlobalLibraryEdit from '../views/admin/library/edit'
import showFinished from '../views/tutor/finished'

import StudentProfileAdmin from '../views/admin/student/profile'
import TutorProfile from '../views/admin/tutor/profile'
import StudentProfileTutor from '../views/tutor/student/profile'
import SearchAdmin from '../views/admin/student/search'
import LastStudentAdmin from '../views/admin/student/last'
import LastTutorAdmin from '../views/admin/tutor/last'
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
import Test from '../views/test'
import {beforeTutor} from '../api/checkroleIom'
import {beforeStudent} from '../api/checkRoleStudent'
import {withoutIsAuth} from '../api/withoutIsAuth'
import {checkAccess} from '../api/checkActivePage'
import {beforeAdmin} from '../api/checkRoleAdmin'


import EduMembers from '../views/tutor/edumembers'


const routes = [


  {
    path: '/test',
    name: 'test',
    component: Test,
    beforeEnter:withoutIsAuth('auth'),
    meta:{
      auth: false,
    },
  },



  /**
   PAGE NOT FOUND
   **/

  { path: '/:pathMatch(.*)*',
    name: '404',
    component: NotFound,
    beforeEnter:withoutIsAuth('NotFound'),
    meta:{
      auth:false,
      layout: 'NotFound'
    }},


  /**
   MAIN PAGE  HOME
   **/

  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: checkAccess(),
    meta:{
      auth: true,
    },
  },


  /**
   * //////////////////////////////////////////////////////////
   // ADMIN ROUTES START
   * /////////////////////////////////////////////////////////
   **/

  {
    path: '/students',
    name: 'adminStudents',
    component: StudentAdmin,
    beforeEnter: beforeAdmin(),
    meta:{
      auth: true,
    },
  },

  {
    path: '/my_account',
    name: 'my_account',
    component: MyAccountAdmin,
    beforeEnter: beforeAdmin(),
    meta:{
      auth: true,
    },
  },

  {
    path: '/editProfileAdmin',
    name: 'editProfileAdmin',
    component: AdminProfileEdit,
    beforeEnter: beforeAdmin(),
    meta:{
      auth: true,
    },
  },

  {
    path: '/student/profile/:userId',
    name: 'userProfile',
    component: StudentProfileAdmin,
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
    path: '/tutors',
    name: 'tutors',
    component:Tutors,
    beforeEnter: beforeAdmin(),
    meta:{
      auth: true,
    },
  },

  {
    path: '/iom',
    name: 'iom',
    component: IomAdmin,
    beforeEnter: beforeAdmin(),
    meta:{
      auth: true,
    },
  },

  {
    path: '/iom/:id/:tutor',
    name: 'iomData',
    component: IomDataAdmin,
    beforeEnter: beforeAdmin(),
    meta:{
      auth: true,
    },
  },

  {
    path: '/iom/:id/:tutor/:taskId',
    name: 'taskDataAdmin',
    component: TaskDataAdmin,
    beforeEnter: beforeAdmin(),
    meta:{
      auth: true,
    },
  },

  {
    path: '/ban',
    name: 'ban',
    component: banAdmin,
    beforeEnter: beforeAdmin(),
    meta:{
      auth: true,
    },
  },

  {
    path: '/admin_conversations',
    name: 'admin_conversations',
    component: conAdmin,
    beforeEnter: beforeAdmin(),
    meta:{
      auth: true,
    },
  },

  {
    path: '/admin_conversations/:chat/:user',
    name: 'admin_conv',
    component: chatAdmin,
    beforeEnter: beforeAdmin(),
    meta: {
      auth: true,
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
    path: '/last_student',
    name: 'last_student',
    component: LastStudentAdmin,
    beforeEnter: beforeAdmin(),
    meta:{
      auth: true,
    },
  },

  {
    path: '/last_tutor',
    name: 'last_tutor',
    component: LastTutorAdmin,
    beforeEnter: beforeAdmin(),
    meta:{
      auth: true,
    },
  },

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
    path: '/admin_notifications',
    name: 'admin_notifications',
    component: NotificationAdmin,
    beforeEnter: beforeAdmin(),
    meta:{
      auth: true,
    },
  },

  /**
   * //////////////////////////////////////////////////////////
   // ADMIN ROUTES END
   * /////////////////////////////////////////////////////////
   **/





  /**
   * //////////////////////////////////////////////////////////
   // TUTOR ROUTES START
   * /////////////////////////////////////////////////////////
   **/

  {
    path: '/my_students',
    name: 'my_students',
    component:StudentTutor,
    beforeEnter: beforeTutor(),
    meta:{
      auth: true,
    },
  },

  {
    path: '/editProfileTutor',
    name: 'tutorProfileEdit',
    component:TutorProfileEdit,
    beforeEnter: beforeTutor(),
    meta:{
      auth: true,
    },
  },

  {
    path: '/my_student/profile/:userId',
    name: 'myStudentProfile',
    component: StudentProfileTutor,
    beforeEnter: beforeTutor(),
    meta:{
      auth: true,
    },
  },

  {
    path: '/my_iom',
    name: 'my_iom',
    component: IomTutor,
    beforeEnter: beforeTutor(),
    meta:{
      auth: true,
    },
  },

  {
    path: '/my_iom/create',
    name: '/my_iom/create',
    component: IomCreate,
    beforeEnter: beforeTutor(),
    meta:{
      auth: true,
    },
  },

  {
    path: '/my_iom/:id/exercise',
    name: 'addExercise',
    component: ExerciselistAndCreate,
    beforeEnter: beforeTutor(),
    meta:{
      auth: true,
    },
  },

  {
    path: '/my_iom/:id/members',
    name: 'iomMembers',
    component: EduMembers,
    beforeEnter: beforeTutor(),
    meta:{
      auth: true,
    },
  },

  {
    path: '/my_iom/:id/exercise/:task',
    name: 'updateDeleteOpen',
    component: udTask,
    beforeEnter: beforeTutor(),
    meta:{
      auth: true,
    },
  },

  {
    path: '/show_exercises_accepted',
    name: 'show_exercises_accepted',
    component: AcceptedExercises,
    beforeEnter: beforeTutor(),
    meta:{
      auth: true,
    },
  },

  {
    path: '/show_exercises_accepted/:iom/:exId/:studentId',
    name: 'show_exercises_accepted_task',
    component: AcceptedTask,
    beforeEnter: beforeTutor(),
    meta:{
      auth: true,
    },
  },



  {
    path: '/library',
    name: 'library',
    component: library,
    beforeEnter: beforeTutor(),
    meta:{
      auth: true,
    },
  },

  {
    path: '/library/:id',
    name: 'libraryUpdateDelete',
    component: libraryUD,
    beforeEnter: beforeTutor(),
    meta:{
      auth: true,
    },
  },

  {
    path: '/tutor_conversations',
    name: 'tutor_conversations',
    component: conTutor,
    beforeEnter: beforeTutor(),
    meta:{
      auth: true,
    },
  },

  {
    path: '/tutor_conversations/:chat/:user',
    name: 'tutor_conv',
    component: chatTutor,
    beforeEnter: beforeTutor(),
    meta: {
      auth: true,
    }
  },
  {
    path: '/show_finished',
    name: 'show_finished',
    component: showFinished,
    beforeEnter: beforeTutor(),
    meta: {
      auth: true,
    }
  },

  /**
   * //////////////////////////////////////////////////////////
   // TUTOR ROUTES END
   * /////////////////////////////////////////////////////////
   **/






  /**
   * //////////////////////////////////////////////////////////
   // STUDENT ROUTES START
   * /////////////////////////////////////////////////////////
   **/

  {
    path: '/editProfileStudent',
    name: 'editProfileStudent',
    component:StudentProfileEdit,
    beforeEnter: beforeStudent(),
    meta:{
      auth: true,
    },
  },

  {
    path: '/my_course',
    name: 'myCourse',
    component: myCourse,
    beforeEnter: beforeStudent(),
    meta:{
      auth: true,
    },
  },

  {
    path: '/my_course/:iomId/:taskId/:tutorId',
    name: 'myTask',
    component: myTask,
    beforeEnter: beforeStudent(),
    meta:{
      auth: true,
    },
  },

  {
    path: '/my_box',
    name: 'my_box',
    component: myBox,
    beforeEnter: beforeStudent(),
    meta:{
      auth: true,
    },
  },








  /**
   * //////////////////////////////////////////////////////////
   // TUTOR ROUTES END
   * /////////////////////////////////////////////////////////
   **/



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
    component: AdminConfirm,
    beforeEnter:withoutIsAuth('auth'),
    meta:{
      auth:false
    }
  },

  {
    path: '/tutorconfirm',
    name: 'tutorconfirm',
    component: StudentTutorConfirm,
    beforeEnter:withoutIsAuth('auth'),
    meta:{
      auth:false
    }
  },
  {
    path: '/studentconfirm',
    name: 'studentconfirm',
    component: StudentTutorConfirm,
    beforeEnter:withoutIsAuth('auth'),
    meta:{
      auth:false
    }
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
  },

  {
    path: '/recovery/:link',
    name: 'RecoveryLink',
    component: ()=> import('../views/RecoveryLink.vue'),
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
