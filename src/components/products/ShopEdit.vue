<script type="text/javascript">
  import axios from 'axios'

  export default {
    name: 'Shop-Edit',
    data () {
      return {
        product: {}
      }
    },
    created () {
      let self = this

      if (self.$route.params.id) {
        axios.get(`/products/${self.$route.params.id}`).then(resp => {
          self.product = resp.data
        }).catch(err => {
          console.log(err)
        })
      }
    }
  }
</script>
<template>
  <div class="container"><!--nome categoria img descricao valor-->
    <form id="shopEdit" novalidate>
    	<div class="row">
    		<div class="col-md-6 mb-3">
    			<label class="custom-file">Upload da imagem</label>
    			<input type="file" class="form-control" name="img" id="img" placeholder="Imagem" required>
    		</div>
    		<div class="col-md-6 mb-3">
    			<label for="nome">Nome do Produto</label>
    			<input type="text" class="form-control" name="nome" id="nome" placeholder="Nome" v-model="product.nome" required>
    		</div>
    		<div class="col-md-6 mb-3">
    			<label for="nome">Nome do Produto</label>
    			<input type="text" class="form-control" name="nome" id="nome" placeholder="Nome" v-model="product.nome" required>
    		</div>
    	</div>
    </form>
  </div>
</template>
