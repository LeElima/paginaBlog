<template>
    <div class="profile">
    <Modal v-if="modalAtivo" :modalMessage="mensagemModal" v-on:fechar="fecharModal" />
    <div class="container">
      <h2>Configurações da Conta</h2>
      <div class="profile-info">
        <div class="initials">{{ $store.state.perfilIniciais }}</div>
        <div v-if="admin" class="admin-badge">
          
          <v-icon class="icone " color="white">mdi-account-hard-hat</v-icon>
          <span>Admin</span>
        </div>
        <div class="input">
          <label for="firstName">Nome:</label>
          <input type="text" id="firstName" v-model="firstName" />
        </div>
        <div class="input">
          <label for="lastName">Sobrenome:</label>
          <input type="text" id="lastName" v-model="lastName" />
        </div>
        <div class="input">
          <label for="username">Usuário:</label>
          <input type="text" id="username" v-model="username" />
        </div>
        <div class="input">
          <label for="email">Email:</label>
          <input disabled type="text" id="email" v-model="email" />
        </div>
        <button @click="updateProfile">Salvar</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Modal from "../components/Modal.vue";
import Vue from "vue";
export default Vue.extend({
    name:"Perfil",
    components:{
        Modal
    },
    data(){
        return{
            mensagemModal: "Changes were saved!",
            modalAtivo: false,
        }
    },
    computed: {
        firstName: {
            get():any {
                return this.$store.state.perfilNome;
            },
            set(payload:any) {
                this.$store.commit("mudarNome", payload);
            },
        },
        lastName: {
            get():any {
                return this.$store.state.perfilSobrenome;
            },
            set(payload:any) {
                this.$store.commit("mudarSobrenome", payload);
            },
        },
        username: {
            get():any {
                return this.$store.state.perfilUsuario;
            },
            set(payload:any) {
                this.$store.commit("mudarUsuario", payload);
            },
        },
        email():any {
          return this.$store.state.perfilEmail
        },
        admin(){
          return this.$store.state.perfilAdmin
        }
    },
    methods: {
        updateProfile() {
        this.$store.dispatch("atualizarUsuario");
        this.modalAtivo = !this.modalAtivo;
        },
        fecharModal() {
        this.modalAtivo = !this.modalAtivo;
        },
    },

})
</script>

<style lang="scss" scoped>
.profile {
  .container {
    max-width: 1000px;
    padding: 60px 25px;
    h2 {
      text-align: center;
      margin-bottom: 16px;
      font-weight: 300;
      font-size: 32px;
    }
    .profile-info {
      border-radius: 8px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      padding: 32px;
      background-color: #f1f1f1;
      display: flex;
      flex-direction: column;
      max-width: 600px;
      margin: 32px auto;
      .initials {
        position: initial;
        width: 80px;
        height: 80px;
        font-size: 32px;
        background-color: #303030;
        color: #fff;
        display: flex;
        align-self: center;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
      }
      .admin-badge {
        display: flex;
        align-self: center;
        color: #fff;
        font-size: 14px;
        padding: 8px 24px;
        border-radius: 8px;
        background-color: #303030;
        margin: 16px 0;
        text-align: center;
        text-transform: capitalize;
        .icone {
          width: 12px;
          height: auto;
          margin-right: 8px;
        }
      }
      .input {
        margin: 16px 0;
        label {
          font-size: 14px;
          display: block;
          padding-bottom: 6px;
        }
        input {
          width: 100%;
          border: none;
          background-color: #f2f7f6;
          padding: 8px;
          height: 50px;
          @media (min-width: 900px) {
          }
          &:focus {
            outline: none;
          }
        }
      }
      button {
        align-self: center;
      }
    }
  }
}
</style>