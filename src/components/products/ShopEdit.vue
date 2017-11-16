<script type="text/javascript">
  import ShopAlert from '../alert/ShopAlert.vue'

  export default {
    name: 'Shop-Edit',
    components: {
      ShopAlert
    },
    data () {
      return {
        product: {},
        image: '',
        alert: {
          class: '',
          msg: '',
          show: false
        }
      }
    },
    methods: {
      onFileChange (e) {
        let files = e.target.files || e.dataTransfer.files
        if (!files.length) {
          return
        }
        this.createImage(files[0])
      },
      createImage (file) {
        let reader = new FileReader()
        let self = this

        reader.onload = (e) => {
          self.image = e.target.result
        }
        reader.readAsDataURL(file)
        self.$refs.img.disabled = true
      },
      removeImage (e) {
        this.$refs.img.disabled = false
        this.image = ''
        this.$refs.img.value = ''
        this.product.img = ''
      },
      submitData () {
        let self = this
        let dataf = new FormData()

        Object.keys(self.product).map(k => dataf.append(k, self.product[k]))
        if (!self.product.img) {
          dataf.set('img', self.$refs.img.files[0])
        }
        self.$axios.put(`products/${self.$route.params.id}`, dataf, {
          headers: {
            'accept': 'application/json',
            'Accept-Language': 'en-US,en;q=0.8',
            'Content-Type': `multipart/form-data; boundary=${dataf._boundary}`
          }
        }).then(resp => {
          self.alert.msg = resp.data.msg
          self.alert.class = 'alert alert-success alert-dismissible fade show'
          self.alert.show = true
        }).catch(err => {
          self.alert.msg = 'Não foi possivel alterar o item'
          self.alert.class = 'alert alert-danger alert-dismissible fade show'
          self.alert.show = true
          console.log(err)
        })
      },
      removeItem () {
        let self = this
        self.$axios.delete(`products/${self.$route.params.id}`).then(resp => {
          if (resp.data.alter) {
            self.alert.msg = resp.data.msg
            self.alert.class = 'alert alert-success alert-dismissible fade show'
            self.alert.show = true
            self.$refs.fsEditForm.disabled = true
          } else {
            self.alert.msg = resp.data.msg
            self.alert.class = 'alert alert-warning alert-dismissible fade show'
            self.alert.show = true
          }
        }).catch(err => {
          self.alert.msg = 'Não foi possivel remover o item'
          self.alert.class = 'alert alert-danger alert-dismissible fade show'
          self.alert.show = true
          console.log(err)
        })
      },
      sendData () {
        let self = this
        let form = self.$refs.editForm

        if (form.checkValidity()) {
          self.submitData()
        } else {
          form.classList.add('was-validated')
        }
      }
    },
    created () {
      let self = this

      if (self.$route.params.id) {
        self.$axios.get(`products/${self.$route.params.id}`).then(resp => {
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
    <form id="shopEdit" ref="editForm" novalidate>
      <fieldset ref="fsEditForm">
      	<div class="row align-items-start">
      		<div class="col-md-6 mb-3 align-self-start">
            <div class="form-group">
              <label for="img">Imagem</label>
              <input 
                type="file" 
                id="img"
                ref="img" 
                class="form-control-file" 
                @change="onFileChange" 
                accept="image/gif, image/jpg, image/jpeg, image/png"
                disabled>
            </div>
            <div class="card" v-if="image || product.img">
              <img :src="product.img" class="card-img-top" v-if="image.length < 1"/>
              <img :src="image" class="card-img-top" v-else/>
              <div class="card-footer">
                <button class="btn btn-danger float-right" @click.prevent="removeImage">
                  <i class="fa fa-times" aria-hidden="true"></i> Remover
                </button>
              </div>
            </div>
      		</div>
      		<div class="col-md-6 mb-4 align-self-start">
            <div class="row align-self-start">
              <div class="col-md-12 mb-3">
                <label for="nome">Nome do Produto</label>
                <input type="text" class="form-control" name="nome" id="nome" placeholder="Nome" v-model="product.nome" required>
                <div class="invalid-feedback">Inserir o nome do produto</div>
              </div>
              <div class="col-md-12 mb-4">
                <label for="categoria">Categoria do Produto</label>
                <input type="text" class="form-control" name="categoria" id="categoria" placeholder="Categoria" v-model="product.categoria" required>
                <div class="invalid-feedback">Inserir a categoria do produto'</div>
              </div>
              <div class="col-md-12 mb-4">
                <label for="valor">Valor do Produto</label>
                <input 
                  type="number" 
                  class="form-control" 
                  name="valor" 
                  id="valor" 
                  placeholder="Valor" 
                  v-model.number="product.valor"
                  min="0.01"
                  step="0.01"
                  required>
                <div class="invalid-feedback">Inserir o valor do produto</div>
              </div>
      		  </div>
          </div>
          <div class="col-md-12 mb-3">
            <label for="descricao">Descricao do Produto</label>
            <textarea 
              rows="3" 
              class="form-control" 
              name="descricao" 
              id="descricao" 
              minlength="20"
              placeholder="Descricao" 
              v-model="product.descricao" 
              required>
            </textarea>
            <div class="invalid-feedback">Inserir a descrição do produto, com mínimo de 20 caracteres</div>
          </div>
          <div class="col-md-12 mt-4">
            <shop-alert 
              :msgClass="alert.class" 
              :msg="alert.msg" 
              :visibility="alert.show" 
              @update:visibility="val => alert.show = val">
            </shop-alert>
          </div>
          <div class="col-md-6 mt-5 mb-4 offset-md-6">
            <button class="btn btn-primary float-right ml-3" @click.prevent="sendData">
              <i class="fa fa-save"></i>&nbsp;&nbsp;Salvar dados
            </button>
            <button class="btn btn-danger float-right" @click.prevent="removeItem">
              <i class="fa fa-times"></i>&nbsp;&nbsp; Excluir Item
            </button>
          </div>
      	</div>
      </fieldset>
    </form>
  </div>
</template>
