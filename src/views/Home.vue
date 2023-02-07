<template>
  <!-- <hello-world /> -->
  <cob-panel>
    <cob-auto-complete
    :label="'Teste de Titulo'"
    :items="Items">
    </cob-auto-complete>
  </cob-panel>
</template>

<script lang="ts">
import CobAutoComplete from '@/components/CobAutoComplete.vue';
import CobPanel from '@/components/CobPanel.vue';
import Vue from 'vue';
import HelloWorld from '../components/HelloWorld.vue';

export default Vue.extend({
  name: 'Home',

  components: {
    HelloWorld,
    CobPanel,
    CobAutoComplete,
  },
  data(){
  return{
    Items: [
      {
      text: "João",
      value: 0
      },
      {
      text: "Maria",
      value: 1
      },
      {
      text: "Paulo",
      value: 2
      },
    ],
  }
  
},
  
});


</script>
