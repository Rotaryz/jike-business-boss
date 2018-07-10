import Vue from 'vue'
import Router from 'vue-router'

// const HelloWorld = () => import('pages/hello-world/hello-world')
const Oauth = () => import('pages/oauth/oauth')
const Overview = () => import('pages/overview/overview')
const Ranking = () => import('pages/ranking/ranking')
const AI = () => import('pages/ai-analyse/ai-analyse')
const CustomerList = () => import('pages/customer-list/customer-list')
const CustomerDetail = () => import('pages/customer-detail/customer-detail')
const CustomerData = () => import('pages/customer-data/customer-data')
const CustomerList = () => import('pages/customer-list/customer-list')

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
      },
      children: [
        {
          path: 'customer-list',
          component: CustomerList,
          meta: {
            title: '客户列表'
          },
          children: [
            {
              path: 'customer-detail',
              component: CustomerDetail,
              meta: {
                title: '客户详情'
              },
              children: [
                {
                  path: 'customer-data',
                  component: CustomerData,
                  meta: {
                    title: '客户资料'
                  }
                }
              ]
            }
          ]
        }
      ]
    },
    {
      path: '/ranking',
      component: Ranking,
      meta: {
        title: '排行榜'
      },
      children: [
        {
          path: 'customer-list',
          component: CustomerList,
          meta: {
            title: '客户'
          }
        }
      ]
    },
    {
      path: '/ai-analyse',
      component: AI,
      meta: {
        title: 'AI分析'
      }
    },
    {
      path: '/customer-detail',
      component: CustomerDetail,
      meta: {
        title: '客户详情'
      }
    },
    {
      path: '/customer-data',
      component: CustomerData,
      meta: {
        title: '客户详情'
      }
    }
  ]
})

route.beforeEach((to, from, next) => {
  document.title = to.meta ? to.meta.title : ''
  next()
})

export default route
