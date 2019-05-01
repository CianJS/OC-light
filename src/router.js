import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/Register.vue')
    },
    {
      path: '/comu/:comuId',
      name: 'community',
      component: () => import('./components/Community.vue')
    },
    {
      path: '/users/:userId/:username',
      name: 'user',
      component: () => import('./components/User.vue'),
      props: true
    }
  ],
  mode: 'history'
})
