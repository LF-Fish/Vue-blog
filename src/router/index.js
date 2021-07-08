import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Cookie from 'js-cookie'

import Home from '../views/Home.vue'
import Log from '../views/log.vue'
import Index from '../views/index.vue'
import Book from '../views/book.vue'
import Detail from '../views/detail.vue'
import editArticle from '../views/articleEdit.vue'
import article from '../views/article.vue'
import bookEdit from '../views/bookEdit.vue'
import bookPublish from '../views/bookPublish.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/',
        name: 'Index',
        component: Index,

      },
      {
        path: '/log',
        name: 'Log',
        component: Log
      },
      {
        path: '/book',
        name: 'Book',
        component: Book
      },
      {
        path: '/detail/:id',
        name: 'Detail',
        component: Detail
      },
      {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
      },
    ],
  },
    {
      path: '/article',
      name: 'article',
      component: article,
      meta: {
        // 需要登录权限
        requireAuth: true
      }
    },
    {
      path: '/editArticle/:id?',
      name: 'editArticle',
      component: editArticle,
      meta: {
        // 需要登录权限
        requireAuth: true
      }
    },
    {
      path: '/bookEdit',
      name: 'bookEdit',
      component: bookEdit,
      meta: {
        // 需要登录权限
        requireAuth: true
      }
    },
    {
      path: '/bookPublish/:id?',
      name: 'bookPublish',
      component: bookPublish,
      meta: {
        // 需要登录权限
        requireAuth: true
      }
    },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

// 路由守卫
router.beforeEach((to, from, next) => {
  // 让页面回到顶部
  window.pageYOffset = document.documentElement.scrollTop = 0
  document.body.scrollTop = document.documentElement.scrollTop = 0;
  scrollTo(0, 0);
  document.documentElement.scrollTop = document.body.scrollTop = 0;

  // 刷新页面会丢失登录状态，所以刷新后要从Cookie里获取token再次存放在vuex
  if(Cookie.get('token'))
  store.commit('setToken', Cookie.get('token'))

  //  判断有无token，有则设置当前状态为登录状态
  if (Cookie.get('token')) {
    store.commit('changIsSignIn', 1)
  }
  //  先判断去的页面是否需要登录权限
  if (to.meta.requireAuth) {
    // 判断有没有登录
    if (store.state.token) {
      // 有登录 ,则判断去的路由是否为 我的博客
      // 去我的博客之前拦截，判断当前用户是否为管理员，如果是管理员，则next()
      if (to.name === 'admin') {
        let nickname = sessionStorage.getItem("nickname");
        if (nickname === '罗废鱼') {
          next()
        } else {
          // 否则直接返回到home页面
          next({ name: 'Log' })
        }
      } else {
        next()
      }
    } else {
      // 未登录则去登录
      if (to.name === 'Log') {
        next()
      } else {
        next({ name: 'Log' })
      }
    }
  } else {
    // 不需要登录权限的页面直接next
    next()
  }
})
