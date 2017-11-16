<script type="text/javascript">
  import ShopAlert from '../alert/ShopAlert.vue'
  export default {
    name: 'Shop-Add',
    components: {
      ShopAlert
    },
    data () {
      return {
        img: '',
        product: { nome: '', categoria: '', descricao: '', img: '', valor: 0 },
        alert: {
          class: 'alert alert-dismissible fade',
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
        let self = this
        let reader = new FileReader()

        reader.onload = (e) => {
          self.img = e.target.result
        }
        reader.readAsDataURL(file)
        self.$refs.img.disabled = true
      },
      cancelItem () {
        this.$router.push('/admin')
      },
      removeImage () {
        this.$refs.img.disabled = false
        this.img = ''
        this.$refs.img.value = ''
        this.product.img = ''
      },
      submitData () {
        let self = this
        let dataf = new FormData()

        Object.keys(self.product).map(k => dataf.append(k, self.product[k]))
        dataf.set('img', self.$refs.img.files[0])

        self.$axios.post('products', dataf, {
          headers: {
            'accept': 'application/json',
            'Accept-Language': 'en-US,en;q=0.8',
            'Content-Type': `multipart/form-data; boundary=${dataf._boundary}`
          }
        }).then(resp => {
          if (resp.data.alter) {
            self.alert.msg = resp.data.msg
            self.alert.class = 'alert alert-success alert-dismissible fade show'
            self.alert.show = true
          } else {
            self.alert.msg = resp.data.msg
            self.alert.class = 'alert alert-warning alert-dismissible fade show'
            self.alert.show = true
          }
        }).catch(err => {
          self.alert.msg = 'Não foi possível adicionar o item'
          self.alert.class += 'alert alert-danger alert-dismissible fade show'
          self.alert.show = true
          console.log(err)
        })
      },
      sendForm () {
        if (this.$refs.shopAdd.checkValidity()) {
          this.submitData()
        } else {
          this.$refs.shopAdd.classList.add('was-validated')
        }
      }
    }
  }
</script>
<template>
  <div class="container">
    <form action="" id="shopAdd" ref="shopAdd" novalidate>
      <div class="row align-items-start">
        <div class="col-md-6 mb-3 align-self-start">
          <div class="form-group">
            <label for="img">Imagem</label>
            <input type="file" id="img" class="form-control" ref="img" @change="onFileChange" accept="image/gif, image/jpg, image/jpeg, image/png" required>
            <div class="invalid-feedback">Inserir uma imagem para o produto</div>
          </div>
          <div class="card" v-if="img" >
            <img class="card-img-top" :src="img">
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
          <button class="btn btn-primary float-right ml-3" @click.prevent="sendForm">
            <i class="fa fa-save"></i>&nbsp;&nbsp;Salvar item
          </button>
          <button class="btn btn-danger float-right" @click.prevent="cancelItem">
            <i class="fa fa-times"></i>&nbsp;&nbsp; Cancelar
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
