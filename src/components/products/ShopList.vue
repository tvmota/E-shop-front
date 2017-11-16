<script type="text/javascript">
  import ShopItem from './ShopItem.vue'
  import { chunk, filter } from 'lodash'

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
        return chunk(this.$store.getters.getProducts, 4)
      },
      category () {
        return this.$store.getters.getCategory
      }
    },
    created () {
      this.$axios.get('products').then(resp => {
        if (this.category) {
          this.$store.commit('SET_PRODUCTS', filter(resp.data, {'categoria': this.category}))
          return
        }
        this.$store.commit('SET_PRODUCTS', resp.data)
      }).catch(err => {
        console.log(err)
      })
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
