import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'
import Auth from '../views/Auth'
import Active from '../views/Active'
import Register from "../views/Register";
import List from '../views/List'
import Iom from '../views/tutor/iom'
import NotFound from '../views/NotFound'


console.log(store.state['auth'].role)
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: async (to, from, next) => {
      try{
         await store.dispatch('auth/confirmRole')
        if(store.state['auth'].role && store.state['auth'].status == 'on') {
          to.meta.layout = await store.state['auth'].role
          to.meta.data = localStorage.getItem('login')
          await store.dispatch('user/getUserData',localStorage.getItem('jwt-token'))
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
    path: '/list',
    name: 'list',
    component: List,
    beforeEnter: async (to, from, next) => {
      try{
        const res = await store.dispatch('auth/confirmRole')
        console.log(res)
        if(store.state['auth'].role) {
          next()
        } else {
          console.log('нет подтверждения роли')
          next('/auth?message=auth')
        }
      } catch(e){
        console.log('Ошибка подтверждения')
      }
    },
    meta:{
      layout:'Main',
      auth: true,
      role: store.state['auth'].role,
    },
  },

  {
    path: '/iom',
    name: 'iom',
    component: Iom,
    beforeEnter: async (to, from, next) => {
      try{
        await store.dispatch('auth/confirmRole')
        if(store.state['auth'].role && store.state['auth'].status == 'on' && store.state['auth'].role !== "student" ) {
          console.log(store.state['auth'].role)
          to.meta.layout = await store.state['auth'].role
          to.meta.data = localStorage.getItem('login')
          await store.dispatch('user/getUserData',localStorage.getItem('jwt-token'))
          next()
        } else if(store.state['auth'].role && store.state['auth'].status == 'on' && store.state['auth'].role === "student") {
          console.log('404')
          next('/404')
        } else {
          next('/auth?message=auth')
        }
      } catch(e){
        console.log('Ошибка подтверждения')
      }
    },
    meta:{
      layout:'auth',
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
    path: '/register',
    name: 'Register',
    component: ()=> import('../views/Register.vue'),

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
    component: ()=> import('../views/Regtutor.vue'),

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
