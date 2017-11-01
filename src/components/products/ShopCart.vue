<script type="text/javascript">
  export default {
    name: 'Shop-Cart',
    computed: {
      cart () {
        return this.$store.getters.getCart
      }
    },
    methods: {
      removeItem (id) {
        this.$store.commit('REMOVE_ITEM_CART', id)
      }
    }
  }
</script>
<template>
	<div class="modal" id="cartModal" tabindex="-1" role="dialog">
  		<div class="modal-dialog" role="document">
    		<div class="modal-content">
      			<div class="modal-header">
        			<h5 class="modal-title" id="exampleModalLabel">Lista de produtos</h5>
        			<button type="button" class="close" data-dismiss="modal" aria-label="Close">
          				<span aria-hidden="true">&times;</span>
        			</button>
      			</div>
      			<div class="modal-body">
      				<div class="container-fluid">
      					<div class="row" v-for="item in cart" :key="item._id">
      						<div class="col-md-3">
      							<img src="http://dummyimage.com/800x600/4d494d/686a82.gif&text=placeholder+image" width="50" height="50">
      						</div>
      						<div class="col-md-6">
      							<p>{{ item.nome }}</p>
      						</div>
      						<div class="col-md-2">
      							<button type="button" class="btn btn-danger" @click="removeItem(item._id)">Remover</button>
      						</div>
      					</div>
      				</div>
      			</div>
      			<div class="modal-footer">
        			<button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
      			</div>
    		</div>
  		</div>
	</div>
</template>