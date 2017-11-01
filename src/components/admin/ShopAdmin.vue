<script type="text/javascript">
  import ShopHeader from '../ShopHeader.vue'
  import ShopFooter from '../ShopFooter.vue'

  export default {
    name: 'Shop-Admin',
    components: {
      ShopHeader, ShopFooter
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
