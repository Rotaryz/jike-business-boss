import Vue from 'vue'
import Router from 'vue-router'
import storage from 'storage-controller'

const Oauth = () => import('pages/oauth/oauth')
const Overview = () => import('pages/overview/overview')
const Ranking = () => import('pages/ranking/ranking')
const AI = () => import('pages/ai-analyse/ai-analyse')

Vue.use(Router)

const route = new Router({
  mode: 'history',
  routes: [
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

const DEFAULT_TITLE = 'Boss雷达'
const DEFAULT_ROUTE = '/overview'
const OAUTH_ROUTE = '/oauth'

route.beforeEach((to, from, next) => {
  document.title = to.meta.title ? to.meta.title : DEFAULT_TITLE
  if (to.path === '/') {
    const token = storage.get('token', '')
    if (token) {
      next(DEFAULT_ROUTE)
    } else {
      next(OAUTH_ROUTE)
    }
  }
  next()
})

export default route
