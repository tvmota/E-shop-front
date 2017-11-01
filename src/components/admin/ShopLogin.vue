<script type="text/javascript">
  import axios from 'axios'
  import ShopAlert from '../alert/ShopAlert.vue'

  export default {
    name: 'Shop-Login',
    components: {
      ShopAlert
    },
    data () {
      return {
        alert: { class: 'alert alert-dismissible fade', msg: '', show: false },
        loginData: { user: '', pwd: '' }
      }
    },
    methods: {
      login () {
        let self = this
        let form = self.$refs.loginForm

        if (form.checkValidity()) {
          axios.post(`/login`, self.loginData).then(resp => {
            self.$store.commit('SET_USER_TKN', resp.data)
            this.$router.push('/admin')
          }).catch(err => {
            self.alert.msg = err.response.data.msg
            self.alert.class += ' alert-danger show'
            self.alert.show = true
            console.log(err.response.data)
          })
        } else {
          form.classList.add('was-validated')
        }
      }
    }
  }
</script>
<template>
  <div class="login-container container">
    <div class="card">
      <div class="card-header">
        <h2 class="form-signin-heading">
          <i class="fa fa-sign-in" aria-hidden="true"></i>  Área Restrita
          <router-link to="/"
            class="float-right home-link"
            title="Voltar para home"
            ref="homeLink"
          >
            <i class="fa fa-home" aria-hidden="true">
          </i></router-link>
        </h2>
      </div>
      <form class="form-signin" ref="loginForm" novalidate>

        <div class="form-row">
          <div class="form-group col-12">
            <input type="text" id="user" name="user"class="form-control" placeholder="Usuário" v-model="loginData.user" required>
            <div class="invalid-feedback">
              Por favor insira o usuário
            </div>
          </div>
          <div class="form-group col-12">
            <input type="password" id="pwd" name="pwd" class="form-control" placeholder="Senha" v-model="loginData.pwd" required>
            <div class="invalid-feedback">
              Por favor insira a senha
            </div>
          </div>
        </div>
        <br>
        <button class="btn btn-lg btn-primary btn-block" @click.prevent="login">Entrar</button>
        <br>
        <shop-alert :msgClass="alert.class" :msg="alert.msg" :visibility="alert.show" @update:visibility="val => alert.show = val"></shop-alert>
      </form>
    </div>
  </div>
</template>
<style scoped>

  .login-container {
    padding-top: 40px;
    padding-bottom: 40px;
  }

  .form-signin {
    max-width: 330px;
    padding: 15px;
    margin: 0 auto;
  }

  .form-signin .form-signin-heading,
  .form-signin .checkbox {
    margin-bottom: 10px;
  }

  .form-signin .checkbox {
    font-weight: 400;
  }

  .form-signin .form-control {
    position: relative;
    box-sizing: border-box;
    height: auto;
    padding: 10px;
    font-size: 16px;
  }

  .form-signin .form-control:focus {
    z-index: 2;
  }

  .form-signin input[type="email"] {
    margin-bottom: -1px;
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }

  .form-signin input[type="password"] {
    margin-bottom: 10px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
  }

  .home-link{
    color: #000
  }
</style>
