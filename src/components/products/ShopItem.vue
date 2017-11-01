<script type="text/javascript">
  export default {
    name: 'Shop-Item',
    props: {
      item: {
        type: Object,
        required: true
      }
    },
    computed: {
      user () {
        return this.$store.getters.getUser
      }
    },
    methods: {
      addToCart (itemCart) {
        let self = this
        self.$store.commit('ADD_ITEM_CART', itemCart)
      },
      editItem (id) {
        this.$router.push({path: `admin/edit/${id}`})
      }
    }
  }
</script>
<template>
    <div class="card">
      <img class="card-img-top" :src="item.img" alt="">
      <div class="card-body">
        <h4 class="card-title">{{ item.nome }}</h4>
        <h6 class="card-subtitle mb-2 text-muted">{{ item.categoria }}</h6>
        <p class="card-text">{{ item.descricao }}</p>
        <div class="row">
          <div class="col-10 align-bottom">
            <br>
            <h5>R$ {{ item.valor }}</h5>
          </div>
          <div class="col-2 align-middle">
            <button class="btn btn-primary float-right" v-if="user.tkn.length < 1" @click="addToCart(item)">
              <i class="fa fa-cart-plus fa-2x" aria-hidden="true"></i>
            </button>
            <button class="btn btn-primary float-right" v-else>
              <i class="fa fa-pencil-square fa-2x" aria-hidden="true" @click="editItem(item._id)"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
</template>
