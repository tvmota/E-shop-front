<script type="text/javascript">
  import ShopHeader from './ShopHeader.vue'
  import ShopFooter from './ShopFooter.vue'
  import axios from 'axios'

  export default {
    name: 'Shop-Home',
    components: {
      ShopHeader, ShopFooter
    },
    created () {
      let self = this
      self.$store.dispatch('setDefaultUser')

      axios.get(`/products`).then(resp => {
        self.$store.commit('SET_PRODUCTS', resp.data)
      }).catch(err => {
        console.log(err)
      })
    }
  }
</script>
<template>
  <div class="Site">
      <header class="Site-header">
        <shop-header></shop-header>
      </header>
      <main role="main" class="Site-content">
        <router-view></router-view>
      </main>
      <footer class="Site-footer">
        <shop-footer></shop-footer>
      </footer>
  </div>
</template>
