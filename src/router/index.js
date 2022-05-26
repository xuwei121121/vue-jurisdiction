import store from '@/store'
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)
// 解决报错
const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.replace
// push
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
// replace
VueRouter.prototype.replace = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalReplace.call(this, location, onResolve, onReject)
  return originalReplace.call(this, location).catch(err => err)
}

//第一步
const one = {
  path: '/role',
  name: 'role',
  component: () => import('../views/Role.vue'),
  meta: {
    title: '角色管理'
  }
}
//第三步动态传入没有才传入
const two = {
  path: '*',
  name: 'NotFound',
  component: () => import('../views/NotFound')
}
//将用户管理也设置为动态路由
const three = {
  path: '/user',
  name: 'user',
  meta: {
    title: '用户管理'
  },
  component: () => import('../views/User')
}
//第二步 放在动态路由下面
const map = {
  '/role': one,
  '/user': three
}
const routes = [
  {
    path: '/',
    name: 'home',
    //重定向
    redirect: '/welcome',
    component: Home,
    children: [
      // {
      //   path: '/user',
      //   name: 'user',
      //   component: () => import('../views/User.vue'),
      //   meta: {
      //     title: '用户管理'
      //   }
      // },
      {
        path: '/category',
        name: 'category',
        component: () => import('../views/Category.vue'),
        meta: {
          title: '品类管理'
        }
      },
      {
        path: '/product',
        name: 'product',
        component: () => import('../views/Product.vue'),
        meta: {
          title: '生产管理'
        }
      },
      {
        path: '/welcome',
        name: 'welcome',
        component: () => import('../views/Welcome.vue'),
      },
      // {
      //   path: '/role',
      //   name: 'role',
      //   component: () => import('../views/Role.vue'),
      //   meta: {
      //     title: '角色管理'
      //   }
      // },
      {
        path: 'charts/bar',
        name: 'bar',
        meta: {
          title: '柱状图'
        },
        component: () => import('../views/Bar.vue')
      },
      {
        path: 'charts/line',
        name: 'line',
        meta: {
          title: '折线图'
        },
        component: () => import('../views/Line.vue')
      },
      {
        path: 'charts/pie',
        name: 'pie',
        meta: {
          title: '饼图'
        },
        component: () => import('../views/Pie.vue')
      },
      {
        path: 'user2',
        name: 'user2',
        meta: {
          title: '用户管理2'
        },
        component: () => import('../views/User2.vue')
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  // {
  //   path: '*',
  //   name: 'NotFound',
  //   component: () => import('../views/NotFound')
  // }
]

const router = new VueRouter({
  routes
})
//设置动态路由router.currentRoute是ref响应式数据 要拿值的话需要.value
export function initDnameicRoutes () {
  const currentRoutes = router.options.routes
  // console.log(currentRoutes);
  if (store.state.user.navBar) { //如果不做此判断 在login会出现list找不到报错
    const rightlist = store.state.user.navBar.list
    if (rightlist) {
      rightlist.forEach(item => {
        if (item.name == '首页') {
          item.leftMenus.forEach(child => {
            // console.log(child);
            const temp = map[child.key]
            if (temp) {
              temp.meta.right = child.rights//通过child下的值
              currentRoutes[0].children.push(temp)
              // console.log(currentRoutes);
              currentRoutes[0].children.forEach(v => {
                router.addRoute('home', v) //添加路由新规则
              })
            } else {
              return
            }
          })
        }
      })
    }
    /* 第四步 */
    currentRoutes.push(two)
    router.addRoute(two)
    console.log(currentRoutes);
  }
}
//前置导航守卫
router.beforeEach((to, from, next) => {
  let token = window.sessionStorage.getItem('token')
  if (to.path === '/login') {
    next()
  } else {
    if (!token) {
      next('/login')
    } else {
      next()
    }
  }
})
export default router
