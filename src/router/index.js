import Vue from 'vue'
import Router from 'vue-router'

// const HelloWorld = () => import('pages/hello-world/hello-world')
const Oauth = () => import('pages/oauth/oauth')
const Overview = () => import('pages/overview/overview')
const Ranking = () => import('pages/ranking/ranking')
const AI = () => import('pages/ai-analyse/ai-analyse')

Vue.use(Router)

const route = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/oauth'
    },
    {
      path: '/oauth',
      component: Oauth
    },
    {
      path: '/overview',
      component: Overview,
      meta: {
        title: '总览'
      }
    },
    {
      path: '/ranking',
      component: Ranking,
      meta: {
        title: '排行榜'
      }
    },
    {
      path: '/ai-analyse',
      component: AI,
      meta: {
        title: 'AI分析'
      }
    }
  ]
})

route.beforeEach((to, from, next) => {
  document.title = to.meta ? to.meta.title : ''
  next()
})

export default route
