<template>
    <header>
        <nav class="container">
            <div class="branding">
                <router-link class="header" :to="{name: 'Home'}">PaginaBlog</router-link>
            </div>
            <div class="nav-links">
                <ul v-show="!mobile">
                    <router-link class="link" :to="{name: 'Home'}">Home</router-link>
                    <router-link class="link" :to="{name: 'Blogs'}">Blog</router-link>
                    <router-link v-if="admin" class="link" to="#">Criar Post</router-link>
                    <router-link v-if="!user" class="link" to="Login">Login</router-link>    
                </ul>
                <div v-if="user" @click="mostrarMenuPerfil($event)" class="perfil" ref="perfil">
                    <span>{{ $store.state.perfilIniciais }}</span>
                    <div class="perfil-menu" v-show="menuPerfil">
                        <div class="infoo">
                            <p class="iniciais">{{ $store.state.perfilIniciais }}</p>
                            <div class="right">
                                <p>{{ $store.state.perfilNome }} {{ $store.state.perfilSobrenome }}</p>
                                <p>{{ $store.state.perfilUsuario }}</p>
                                <p>{{ $store.state.perfilEmail }}</p>
                            </div>
                        </div>
                        <div class="options">
                            <div class="option">
                                <router-link class="option" :to="{name: 'Perfil'}">
                                    <v-icon class="icon" color="white">
                                        mdi-account
                                    </v-icon>
                                    <p>Perfil</p>
                                </router-link>
                            </div>
                            <div class="option">
                                <router-link class="option" :to="{name: 'Admin'}">
                                    <v-icon class="icon" color="white">
                                        mdi-account-hard-hat
                                    </v-icon>
                                    <p>Admin</p>
                                </router-link>
                            </div>
                            <div @click="logOut" class="option">
                                <v-icon class="icon" color="white">
                                    mdi-exit-run
                                </v-icon>
                                <p>Sair</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <v-icon @click="abrirMenu" v-show="mobile">
                mdi-account
            </v-icon>
        </nav>
        
        <!-- <iconeMenu /> -->
        <transition name="mobile-nav">
            <ul class="mobile-nav" v-show="mobileNav">
                <router-link class="link" :to="{name: 'Home'}">Home</router-link>
                <router-link class="link" :to="{name: 'Blogs'}">Blog</router-link>
                <router-link v-if="admin" class="link" to="#">Criar Post</router-link>
                <router-link v-if="!user" class="link" to="Login">Login</router-link>
            </ul>
        </transition>
    </header>
</template>
<script lang="ts">
import Vue from 'vue'
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
// import iconeMenu from '../assets/Icons/bars-regular.svg'
export default Vue.extend({
    name: "navigation",
    components:{
        // iconeMenu
    },
    data(){
        return{
            menuPerfil: false,
            mobile:false,
            mobileNav:false,
            tamanhoJanela:0
        }
    },
    computed:{
        user(){
            return this.$store.state.user
        },
        admin(){
            return this.$store.state.perfilAdmin
        }
    },  
    created(){
        window.addEventListener('resize', this.verificaJanela);
        this.verificaJanela();
    },
    methods:{
        verificaJanela(){
            this.tamanhoJanela = window.innerWidth;
            if(this.tamanhoJanela<= 750){
                this.mobile = true;
                return;
            }
            this.mobile = false;
            this.mobileNav = false;
            return;
        },
        abrirMenu(){
            this.mobileNav = !this.mobileNav;
        },
        mostrarMenuPerfil(e:any){
            if(e.target === this.$refs.perfil)
            this.menuPerfil = !this.menuPerfil;
        },
        logOut(){
            firebase.auth().signOut();
            window.location.reload();
        }
    }
})
</script>
<style lang="scss" scoped>
    header{
        background-color: #fff;
        padding: 0 25px;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 4px 6px -1px rgba(0, 0, 0, 0.06);
        z-index: 99;
    }
    .link{
        font-weight: 500;
        padding: 0 8px;
        transition: .3s color ease;

        &:hover{
            color: #1eb8b8
        }
    }

    nav{
        display: flex;
        padding: 25px 0;

        .branding{
            display: flex;
            align-items: center;

            .header{
                font-weight: 600;
                font-size: 24px;
                color: #000;
                text-decoration: none;
            }
        }
        .nav-links{
            position: relative;
            display: flex;
            flex: 1;
            align-items: center;
            justify-content: flex-end;

            ul{
                margin-right: 32px;
                .link{
                    margin-right: 32px;
                }
                .link:last-child{
                    margin-right: 0;
                }
            }
            .perfil {
        position: relative;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        color: #fff;
        background-color: #303030;
        span {
          pointer-events: none;
        }
        .perfil-menu {
          position: absolute;
          top: 60px;
          right: 0;
          width: 250px;
          background-color: #303030;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          .infoo {
            display: flex;
            align-items: center;
            padding: 15px;
            border-bottom: 1px solid #fff;
            .iniciais {
              position: initial;
              width: 40px;
              height: 40px;
              background-color: #fff;
              color: #303030;
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: 50%;
            }
            .right {
              flex: 1;
              margin-left: 24px;
              p:nth-child(1) {
                font-size: 14px;
              }
              p:nth-child(2),
              p:nth-child(3) {
                font-size: 9px;
              }
            }
          }
          .options {
            padding: 15px;
            .option {
              text-decoration: none;
              color: #fff;
              display: flex;
              align-items: center;
              margin-bottom: 12px;
              .icon {
                width: 18px;
                height: auto;
              }
              p {
                font-size: 14px;
                margin-left: 12px;
              }
              &:last-child {
                margin-bottom: 0px;
              }
            }
          }
        }
      }
    }
    .mobile-user-menu {
      margin-right: 40px;
    }
  }

    .menu-icon{
        cursor: pointer;
        position: absolute;
        top: 32px;
        right: 25px;
        height: 25px;
        width: auto;
    }   
    .mobile-nav{
        padding: 20px;
        width: 70%;
        max-width: 250px;
        display: flex;
        flex-direction: column;
        position: fixed;
        height: 100%;
        background-color: #303030;
        top: 0;
        left: 0;

        .link{
            padding: 15px 0;
            color: #fff;

        }
    }

    .mobile-nav-enter-active,
    .mobile-nav-leave-active{
        transition: all 1s ease;
    }

    .mobile-nav-enter{
        transform: translateX(-250px);
    }

    .mobile-nav-enter-to{
        transform: translateX(0);
    }
    .mobile-nav-leave-to{
        transform: translateX(-250px);
    }
</style>