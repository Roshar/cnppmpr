import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'
import Auth from '../views/Auth'
import Register from "../views/Register";
import List from '../views/List'
import axios from 'axios'

console.log(store.state['auth'].role)
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: (to, from, next) => {
      // const {role} = axios('http://localhost:3500/api/getschools/area')
      console.log(to)
      next()
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
