import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

function load (component) {
  return () => import(`@/${component}.vue`)
}

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'ShopLogin',
      component: load('admin/ShopLogin')
    },
    {
      path: '/logout',
      name: 'ShopLogout'
    },
    {
      path: '/admin',
      name: 'ShopAdmin',
      component: load('admin/ShopAdmin'),
      children: [
        {
          path: 'add',
          name: 'ShopAdminAdd',
          component: load('products/ShopAdd')
        },
        {
          path: ':categoria?',
          name: 'ShopAdminList',
          component: load('products/ShopList')
        },
        {
          path: 'edit/:id',
          name: 'ShopAdminEdit',
          component: load('products/ShopEdit')
        }
      ]
    },
    {
      path: '/',
      name: 'ShopHome',
      component: load('ShopHome'),
      children: [
        {
          path: ':categoria?',
          name: 'ShopList',
          component: load('products/ShopList')
        }
      ]
    }
  ]
})
