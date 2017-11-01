// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import { isEmpty } from 'lodash'
Vue.config.productionTip = false

/* eslint-disable no-new */

router.beforeEach((to, from, next) => {
  if (to.path === '/logout') {
    store.dispatch('setDefaultUser')
    next('/login')
  }

  if (!isEmpty(store.state.user)) {
    if (to.path === '/' && store.state.user.tkn.length > 0) {
      next('/admin')
    }
  }

  next()
})

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
