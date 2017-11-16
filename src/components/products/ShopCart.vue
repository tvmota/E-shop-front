<script type="text/javascript">
  import { uniqBy, countBy, sumBy, floor } from 'lodash'

  export default {
    name: 'Shop-Cart',
    computed: {
      uniqCart () {
        return uniqBy(this.$store.getters.getCart, '_id')
      },
      totalCart () {
        return floor(sumBy(this.$store.getters.getCart, obj => Number(obj.valor)), 2)
      }
    },
    methods: {
      removeItem (id) {
        this.$store.commit('REMOVE_ITEM_CART', id)
      },
      countItem (id) {
        return countBy(this.$store.getters.getCart, o => o._id === id)[true]
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
            <ul class="list-group">
              <li class="list-group-item d-flex justify-content-between align-items-center border-0 d-inline" v-for="item in uniqCart" :key="item._id">
                <img :src="'http://localhost:3333' + item.img" width="50" height="50" class="rounded">
                <h6 class="position-absolute ml-5 pl-4">
                  {{ item.nome }}<br>
                  <span class="badge badge-primary badge-pill">x {{ countItem(item._id) }}</span>
                </h6>
                <button type="button" class="btn btn-danger" @click="removeItem(item._id)">
                  <span aria-hidden="true">&times;</span> remover
                </button>
              </li>
              <li class="list-group-item d-flex justify-content-between align-items-center border-0 d-inline" v-if="totalCart">
                <h5 class="text-right">Total: {{ totalCart }}</h5>
              </li>
            </ul>
      		</div>
      	</div>
      	<div class="modal-footer">
        	<button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
      	</div>
    	</div>
  	</div>
	</div>
</template>