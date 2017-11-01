<script>
  import ShopCart from './products/ShopCart.vue'

  export default {
    name: 'Shop-Menu',
    components: {
      ShopCart
    },
    computed: {
      user () {
        return this.$store.getters.getUser
      }
    },
    methods: {
      showCart () {
        window.$('#cartModal').modal('toggle')
      }
    }
  }
</script>
<template>
  <div>
      <nav class="navbar navbar-expand-md navbar-dark fixed-top">
        <a class="navbar-brand" href="#">
          <i class="fa fa-shopping-bag" aria-hidden="true"></i>&nbsp;&nbsp;L. Shop
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
          <ul class="navbar-nav" style="margin-left:auto !important">
            <li class="nav-item" v-for="navMenu in user.menu">
              <button type="button" class="btn btn-link nav-link" v-if="navMenu.label == 'Cart'" @click="showCart">
                <i :class="navMenu.icon" aria-hidden="true"></i>
              </button>
              <router-link :to="navMenu.link" class="nav-link" v-else>
                <i :class="navMenu.icon" aria-hidden="true"></i>
              </router-link>
            </li>
          </ul>
        </div>
      </nav>
      <shop-cart></shop-cart>
  </div>
</template>
<style scoped>
  nav {
    background-color: #5cb85c;
  }
</style>
