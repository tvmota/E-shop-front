<script type="text/javascript">
  import ShopItem from './ShopItem.vue'
  import { chunk } from 'lodash'

  export default {
    name: 'Shop-List',
    components: {
      ShopItem
    },
    data () {
      return {
      }
    },
    computed: {
      products () {
        return chunk(this.$store.state.products, 4)
      }
    }
  }
</script>
<template>
  <div class="container-fluid">
      <div class="row" v-for="product in products">
          <div class="col-lg-4 col-xl-3 col-md-4 col-sm-6 col-card" v-for="item in product">
            <shop-item :item="item"></shop-item>
          </div>
      </div>
  </div>
</template>
<style scoped>
  .row {
    margin-bottom: 15px
  }

  .col-card{
    margin-bottom:15px
  }
</style>
