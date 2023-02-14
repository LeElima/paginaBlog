<template>
    <div class="reset-password">
        <Modal v-if="dialogModal" @fechar="fecharModal" />
        <Loading v-if="dialogCarregar"/>
        <div class="form-wrap">
            <form class="register">
                <h2>Resetar Senha</h2>
                <p>Esqueceu a senha? Entre com o email para gerar uma nova senha</p>
                <div class="inputs">
                    <div class="input">
                        <input type="text" placeholder="Email" v-mode="email">
                        <v-icon class="icon">mdi-email</v-icon>
                    </div>
                </div>
                <button>Registrar</button>
                <div class="angle"></div>
            </form>
            <div class="background"></div>
        </div>
    </div>
    
</template>

<script lang="ts">
import Vue from 'vue';
import Modal from '@/components/Modal.vue'
import Loading from '@/components/Loading.vue'
export default Vue.extend({
    name:"Senha",
    components:{
        Modal,
        Loading
    },
    data(){
        return{
            email:"",
            dialogModal:false,
            dialogCarregar:false,
            mensagemModal:""
        }
    },
    methods:{
        fecharModal(){
            this.dialogModal = !this.dialogModal;
            this.email="";
        }
    }
})
</script>

<style lang="scss" scoped>
    .reset-password {
  position: relative;
  .form-wrap {
    .reset {
      h2 {
        margin-bottom: 8px;
      }
      p {
        text-align: center;
        margin-bottom: 32px;
      }
    }
  }
}
</style>