import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import Cookie from 'js-cookie'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    children: [
      {
        path: '/',
        name: 'Index',
        component: () => import('../views/index.vue'),

      },
      {
        path: '/log',
        name: 'Log',
        component: () => import('../views/log.vue')
      },
      {
        path: '/book',
        name: 'Book',
        component: () => import('../views/book.vue')
      },
      {
        path: '/detail/:id',
        name: 'Detail',
        component: () => import('../views/detail.vue')
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
    component: () => import('../views/admin/article.vue'),
    meta: {
      // 需要登录权限
      requireAuth: true
    }
  },
  {
    path: '/editArticle/:id?',
    name: 'editArticle',
    component: () => import('../views/admin/articleEdit.vue'),
    meta: {
      // 需要登录权限
      requireAuth: true
    }
  },
  {
    path: '/bookEdit',
    name: 'bookEdit',
    component: () => import('../views/admin/bookEdit.vue'),
    meta: {
      // 需要登录权限
      requireAuth: true
    }
  },
  {
    path: '/bookPublish/:id?',
    name: 'bookPublish',
    component: ()=>import('../views/admin/bookPublish.vue'),
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

  // 刷新页面会丢失登录状态，所以刷新后要从Cookie里获取token再次存放在vuex
  if (Cookie.get('token'))
    store.commit('setToken', Cookie.get('token'))

  //  判断有无token，有则设置当前状态为登录状态
  if (Cookie.get('token')) {
    store.commit('changIsSignIn', 1)
  }
  else {
    store.commit('changIsSignIn', 0)
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
