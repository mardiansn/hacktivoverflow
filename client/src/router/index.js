import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/landing',
    name: 'landingPage',
    component: () => import(/* webpackChunkName: "landingPage" */ '../views/LandingPage.vue')
  },
  {
    path: '/',
    name: 'home',
    component: Home,
    children: [
      {
        path: 'questions',
        name: 'questions',
        component: () => import(/* webpackChunkName: 'questions' */ '../views/QuestionList.vue')
      },
      {
        path: 'tag',
        name: 'tagPage',
        component: () => import(/* webpackChunkName: 'tagPage' */ '../views/TagPage.vue')
      },
      {
        path: 'addquestion',
        name: 'addQuestion',
        component: () => import(/* webpackChunkName: 'addQuestion' */ '../views/EditQuestion.vue')
      },
      {
        path: 'editquestion/:id',
        name: 'editQuestion',
        component: () => import(/* webpackChunkName: 'editQuestion' */ '../views/EditQuestion.vue')
      },
      {
        path: ':id',
        name: 'questionDetail',
        component: () => import(/* webpackChunkName: 'questionDetail' */ '../views/QuestionDetail.vue')
      },
      {
        path: 'tag/:tag',
        name: 'tagDetail',
        component: () => import(/* webpackChunkName: 'tagDetail */'../views/TagDetail.vue')
      }
    ]
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
