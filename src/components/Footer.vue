<template>
<footer>
    <div class="espaco">
        <div class="left">
            <div class="coluna-1">
                <router-link class="header" :to="{name: 'Home'}">Pagina Blog</router-link>
                <ul>
                    <li>
                        
                    </li>
                </ul>
            </div>
            <div class="coluna-2">
                <ul>
                    <router-link class="link" :to="{name: 'Home'}">Home</router-link>
                    <router-link class="link" :to="{name: 'Blogs'}">Blogs</router-link>
                    <router-link v-if="admin" class="link" :to="{name: 'NovoPost'}">Criar Post</router-link>
                    <router-link v-if="!user" class="link" :to="{name: 'Login'}">Login</router-link>
                </ul>
            </div>
        </div>
        <div class="right">
            <p> Todos os direitos reservadps</p>
        </div>
    </div>
</footer>
</template>
<script lang="ts">
    import Vue from 'vue'
    export default Vue.extend({
        name: 'footer-blog',
        data(){
            return{

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
    })
</script>
<style lang="scss" scoped>

    footer{
        margin-top: auto;
        padding: 100px 25px;
        background-color: #303030;
        .espaco{
            display: flex;
            flex-direction: column;
            gap: 32px;
            @media(min-width: 800px){
                flex-direction: row;
                gap: 0px;
            }

            >div{
                display: flex;
                flex: 1;
            }
            .left{
                gap: 32px;
                color: #fff;
                display: flex;
                flex-direction: column;
                align-items: center;
                @media(min-width: 800px){
                    flex-direction: row;
                    align-items: initial;
                    gap: 0;
                    
                }

                .header{
                    text-align: center;
                    font-size: 24px;
                    color: #fff;
                    text-decoration: none;
                    font-weight: 600;
                    @media(min-width: 800px){
                        align-items: initial;
                    }
                }
                ul{
                    gap: 16px;
                    list-style: none;
                    display: flex;
                }
                .coluna-1, 
                .coluna-2{
                    gap: 32px !important;
                    display: flex;
                    flex: 1;
                    @media(min-width: 800px){
                        gap: 0;
                    }
                }

                .coluna-1{
                    flex-direction: column;

                    h2{
                        text-align: center;
                        @media(min-width: 800px){
                            text-align: initial;
                        }
                    }
                    ul{
                        margin-top: auto;
                        li{
                            display: flex;
                            align-items: center;
                            .icone{
                                width: 24px;
                                height: auto;
                                color: #fff;
                            }
                        }
                    }
                }

                .coluna-2{
                    ul{
                        height: 100%;
                        justify-content: center;
                        flex-direction: row;
                        flex-wrap: wrap;
                        @media(min-width: 800px){
                            flex-direction: column;
                        }
                        .link{
                            font-size: 16px;
                            font-weight: 500;
                            color: #fff;
                            text-decoration: none;
                        }
                    }
                }
            }

            .right{
                gap: 32px;
                color: #fff;
                align-items: center;
                flex-direction: column;
                @media(min-width: 800px){
                    align-items: flex-end;
                    gap: 0;
                    
                }
            }

            p{
                margin-top: auto;
            }
        }
    }
</style>