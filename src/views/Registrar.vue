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
                    <input type="text" placeholder="Nome" v-model="nome">
                    <v-icon class="icon">mdi-account</v-icon>
                </div>
                <div class="input">
                    <input type="text" placeholder="Sobrenome" v-model="sobrenome">
                    <v-icon class="icon">mdi-account</v-icon>
                </div>
                <div class="input">
                    <input type="text" placeholder="Nome de Usuário" v-model="username">
                    <v-icon class="icon">mdi-account</v-icon>
                </div>
                <div class="input">
                    <input type="text" placeholder="Email" v-model="email">
                    <v-icon class="icon">mdi-email</v-icon>
                </div>
                <div class="input">
                    <input type="password" placeholder="Senha" v-model="senha">
                    <v-icon class="icon">mdi-lock</v-icon>
                </div>
                <div v-show="erro" class="mensagemErro">{{ mensagemErro }}</div>
            </div>
            <button @click.prevent="registrar">Registrar</button>
            <div class="angle"></div>
        </form>
        <div class="background"></div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import firebase from 'firebase/compat/app';

import 'firebase/compat/auth';

import db from '../firebase/firebaseInit'
export default Vue.extend({
    name:"Registrar",
    data(){
        return{
            nome:"",
            sobrenome:"",
            username:"",
            email: "",
            senha:"",
            erro: false,
            mensagemErro: ""
        }
    },
    methods:{
        async registrar(){
            if(this.nome !== "" && this.sobrenome !== "" && this.username !== "" && this.email !== "" && this.senha !== ""){
                this.erro = false;
                const firebaseAuth = await firebase.auth();
                const createUser = await firebaseAuth.createUserWithEmailAndPassword(this.email, this.senha);
                const result = await createUser;
                const dataBase = db.collection("users").doc(result.user?.uid)
                await dataBase.set({
                    nome: this.nome,
                    sobrenome: this.sobrenome,
                    usuario: this.username,
                    email: this.email,
                    administrador: false
                });
                this.$router.push({name: 'Home'});
                return;
            }
            this.erro = true;
            this.mensagemErro = "Por favor, preencha todos os campos!"
            return;
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