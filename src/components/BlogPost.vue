<template>
    <div class="blog-wrapper" :class="{'no-user': !user}">
        <div class="blog-content">
            <div>
                <h2 v-if="post.telaBemVindo">{{ post.titulo }}</h2>
                <h2 v-else>{{ post.blogTitulo }}</h2>
                <p v-if="post.telaBemVindo">{{ post.blogPost }}</p>
                <p class="content-prev" v-else v-html="post.blogHTML"></p>
                <router-link class="link link-light" v-if="post.telaBemVindo" :to="{name: 'Login'}">
                    Login <v-icon class="arrow arrow-light"> mdi-arrow-right</v-icon>
                </router-link>
                <router-link class="link link-light" v-else :to="{ name: 'VerPost', params: { blogId: post.blogID}}">
                    Ver Post <v-icon class="arrow">mdi-arrow-right</v-icon>
                </router-link>
            </div>
            
        </div>
        <div class="blog-photo">
                <img  v-if="post.telaBemVindo" :src="require(`../assets/blogPhotos/${post.foto}.jpg`)" alt="">
                <img  v-else :src="post.blogCardCapa" alt="">
            </div>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
    name:"blogPost",
    props: ["post"],
    data(){
        return{

        }
    },
    computed:{
        user():any{
            return this.$store.state.user;
        }
    }
})
</script>
<style lang="scss" scoped>
    .blog-wrapper{
        display:flex;
        flex-direction: column;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1) 0px 2px 4px -1px rgba(0, 0, 0, 0.06);
        @media(min-width: 700px){
            min-height: 650px;
            max-height: 650px;
            flex-direction: row;
        }

        .blog-content{
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            flex: 4;
            order: 2;
            @media(min-width: 700px){
                order: 1;
            }
            @media(min-width: 800px){
                flex: 3;
            }
            div{
                max-width: 375px;
                padding: 72px 24px;
                @media(min-width: 700px){
                    padding: 0 24px;
                }

                h2{
                    font-size: 32px;
                    font-weight: 300;
                    text-transform: uppercase;
                    margin-bottom: 24px;
                    @media(min-width: 700px){
                        font-size: 40px;
                    }
                    
                }
                p{
                    font-size: 15px;
                    font-weight: 300;
                    line-height: 1.7;
                }

                .content-prev{
                    font-size: 13px;
                    max-height: 24px;
                    width: 250px;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .link{
                    display: inline-flex;
                    align-items: center;
                    margin-top: 32px;
                    padding-bottom: 4px;
                    border-bottom: 1px solid transparent;
                    transition: .5s ease-in all;
                    &:hover{
                        border-bottom-color: #303030;
                    }
                }

                .link-light{
                    &:hover{
                        border-bottom-color: #ffff;
                    }
                }
            }
        }
        .blog-photo{
            order: 1;
            flex: 3;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1) 0px 2px 4px -1px rgba(0, 0, 0, 0.06);

            @media(min-width: 700px){
                order: 2;
            }
            @media(min-width: 800px){
                flex: 4;
            }

            img{
                display: block;
                width: 100%;
                height: 100%;
                object-fit: cover;
            }
        }
        &:nth-child(even){
            .blog-content{
                order: 2;
            }
            .blog-photo{
                order: 1
            }
        }
    }
    .no-user:first-child{
        .blog-content{
            background-color: #303030;
            color: #fff;
        }
    }
</style>