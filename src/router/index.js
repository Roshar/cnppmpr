import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'
import Auth from '../views/Auth'
import Active from '../views/Active'
import Register from "../views/Register";
import List from '../views/List'
import axios from 'axios'

console.log(store.state['auth'].role)
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: async (to, from, next) => {
      try{
        const res = await store.dispatch('auth/confirmRole')
        console.log(res)
        if(store.state['auth'].role && store.state['auth'].status == 'on') {
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
      layout:'Main',
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
  }
  // /
    // /iom --student||tutor
    //
  
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
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
