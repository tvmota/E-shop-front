import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cart: [],
    user: {},
    products: [],
    category: ''
  },
  mutations: {
    SET_USER_TKN (state, obj) {
      state.user.tkn = obj.token
      state.user.menu = obj.user.menu
    },
    SET_USER_DEFAULT (state) {
      state.user = {
        tkn: '',
        menu: [
          {label: 'Cart', link: '/', icon: 'fa fa-shopping-cart fa-2x'},
          {label: 'Login', link: '/login', icon: 'fa fa-sign-in fa-2x'}
        ]
      }
    },
    SET_PRODUCTS (state, obj) {
      state.products = obj
    },
    SET_CATEGORY (state, param) {
      state.category = param
    },
    ADD_ITEM_CART (state, obj) {
      state.cart.unshift(obj)
    },
    REMOVE_ITEM_CART (state, id) {
      let idx = state.cart.indexOf(id)
      state.cart.splice(idx, 1)
    }
  },
  getters: {
    getUser: state => state.user,
    getProducts: state => state.products,
    getCart: state => state.cart,
    getCategory: state => state.category
  },
  actions: {
    setDefaultUser ({ commit }) {
      commit('SET_USER_DEFAULT')
    }
  }
})
