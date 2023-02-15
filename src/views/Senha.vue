<template>
    <div class="reset-password">
        <Modal v-if="dialogModal" :modalMessage="mensagemModal" @fechar="fecharModal" />
        <Loading v-if="dialogCarregar"/>
        <div class="form-wrap">
            <form class="reset">
                <p class="login-register">
                    Voltar para o 
                    <router-link class="router-link" :to="{ name: 'Login' }">Login</router-link>
                </p>
                <h2>Resetar Senha</h2>
                <p>Esqueceu a senha? Entre com o email para gerar uma nova senha</p>
                <div class="inputs">
                    <div class="input">
                        <input type="text" placeholder="Email" v-model="email">
                        <v-icon class="icon">mdi-email</v-icon>
                    </div>
                </div>
                <button @click.prevent="resetarSenha">Registrar</button>
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
import firebase from 'firebase/compat/app';

import 'firebase/compat/auth';
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
        resetarSenha(){
            this.dialogCarregar = true;
            firebase.auth().sendPasswordResetEmail(this.email).then(()=>{
                this.mensagemModal = "Se este email estava cadastrado, você receberá uma senha por ele."
                this.dialogCarregar = false;
                this.dialogModal = true;
            })
            .catch(err=>{
                this.mensagemModal = err.message;
                this.dialogCarregar = false;
                this.dialogModal = true;
            })
        },
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