import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
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
        path: 'users',
        name: 'usersPage',
        component: () => import(/* webpackChunkName: 'usersPage' */ '../views/UsersPage.vue')
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
      }
    ]
  },
  {
    path: '/landing',
    name: 'landingPage',
    component: () => import(/* webpackChunkName: "landingPage" */ '../views/LandingPage.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
