<script type="text/javascript">
  import ShopHeader from './ShopHeader.vue'
  import ShopFooter from './ShopFooter.vue'

  export default {
    name: 'Shop-Home',
    components: {
      ShopHeader, ShopFooter
    },
    created () {
      let self = this
      self.$store.dispatch('setDefaultUser')
      self.$store.commit('SET_CATEGORY', self.$route.params.categoria)
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
