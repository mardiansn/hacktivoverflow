import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/tag',
    name: 'tagPage',
    component: () => import(/* webpackChunkName: 'tagPage' */ '../views/TagPage.vue')
  },
  {
    path: '/landing',
    name: 'landingPage',
    component: () => import(/* webpackChunkName: "landingPage" */ '../views/LandingPage.vue')
  },
  {
    path: '/:id',
    name: 'questionDetail',
    component: () => import(/* webpackChunkName: 'questionDetail' */ '../views/QuestionDetail.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
