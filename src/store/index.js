import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    apiUrl: 'http://localhost:3333',
    cart: [],
    user: {},
    products: [
      { id: 1, nome: 'Produto X', descricao: 'ashdksahdkjsahdkjsahdkjashd', valor: 100, categoria: 'Categoria A', img: 'http://via.placeholder.com/318x180' },
      { id: 2, nome: 'Produto Y', descricao: 'ashdksahdkjsahdkjsahdkjashd', valor: 160, categoria: 'Categoria A', img: 'http://via.placeholder.com/318x180' },
      { id: 3, nome: 'Produto Z', descricao: 'ashdksahdkjsahdkjsahdkjashd', valor: 190, categoria: 'Categoria A', img: 'http://via.placeholder.com/318x180' }
    ]
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
    ADD_ITEM_CART (state, obj) {
      state.cart.unshift(obj)
    },
    REMOVE_ITEM_CART (state, id) {
      let idx = state.cart.indexOf(id)
      state.cart.splice(idx, 1)
    }
  },
  getters: {
    getUrl: state => state.apiUrl,
    getUser: state => state.user,
    getProducts: state => state.products,
    getCart: state => state.cart
  },
  actions: {
    setDefaultUser ({ commit }) {
      commit('SET_USER_DEFAULT')
    }
  }
})
