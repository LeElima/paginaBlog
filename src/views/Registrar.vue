<template>
    <div class="form-wrap">
        <form class="register">
            <p class="login-register">
                Já possui conta?
                <router-link class="router-link" :to="{name: 'Login'}">Fazer login</router-link>
            </p>
            <h2>Criar conta</h2>
            <div class="inputs">
                <div class="input">
                    <input type="text" placeholder="Nome" v-mode="nome">
                    <v-icon class="icon">mdi-account</v-icon>
                </div>
                <div class="input">
                    <input type="text" placeholder="Sobrenome" v-mode="sobrenome">
                    <v-icon class="icon">mdi-account</v-icon>
                </div>
                <div class="input">
                    <input type="text" placeholder="Nome de Usuário" v-mode="username">
                    <v-icon class="icon">mdi-account</v-icon>
                </div>
                <div class="input">
                    <input type="text" placeholder="Email" v-mode="email">
                    <v-icon class="icon">mdi-email</v-icon>
                </div>
                <div class="input">
                    <input type="password" placeholder="Senha" v-mode="senha">
                    <v-icon class="icon">mdi-lock</v-icon>
                </div>
            </div>
            <button>Registrar</button>
            <div class="angle"></div>
        </form>
        <div class="background"></div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
    name:"Registrar",
    data(){
        return{
            nome:"",
            sobrenome:"",
            username:"",
            email: "",
            senha:""
        }
    }
})
</script>

<style lang="scss" scoped>
    .register {
    h2 {
        max-width: 350px;
    }
}
</style>