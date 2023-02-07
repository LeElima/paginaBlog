<template>
    <v-flex class="fill-height base">
        
        <v-row>
            <v-col cols="3">
                <cob-text-field
                    label="Nome"
                    placeholder="Nome Colaborador"
                    v-model="profissional.nome"
                >
                </cob-text-field>
            </v-col>
            <v-col cols="3">
                <cob-autocomplete
                    label="Cargo"
                    placeholder="Cargo Colaborador"
                    :items="cargos"
                    item-value="text"
                    item-text="text"
                    v-model="profissional.cargo"
                    clearable
                >
                </cob-autocomplete>
            </v-col>
            <v-col cols="3">
                <cob-date-picker
                    label="Data Inicio"
                    placeholder="Data Inicio Colaborador"
                    v-model="profissional.data"
                >
                </cob-date-picker>
            </v-col>
            <v-col cols="3">
                <br>
                <v-btn
                medium
                color="tertiary"
                @click="IncluirProfissional">
                    {{textoBotaoIncluir}}
                </v-btn>
            </v-col>
        </v-row>
    </v-flex>
</template>
<script>
    import Vue from "vue";
    import CobPanel from "@/components/CobPanel.vue";
    import CobAutoComplete from "@/components/CobAutoComplete.vue";
    import CobTextField from "@/components/CobTextField.vue";
    import CobDatePicker from "@/components/CobDatePicker.vue";
    export default Vue.extend( {
        name: "EstudoComponente01",
        props:{
            titulo: String,
            textoBotaoIncluir: String,
            cargos: Array,
        },
        components: {
      
        'cob-panel' : CobPanel,
        'cob-autocomplete': CobAutoComplete,
        'cob-text-field': CobTextField,
        'cob-date-picker': CobDatePicker,
    },
        data() {
            return {
                profissional:[{
                    nomeFuncionario: String,
                    cargoFuncionario: String, 
                    dataInicioFuncionario: String
                }]
            }
        },
        methods: {
            IncluirProfissional(){
                this.$emit('novoFuncionario', this.profissional);
            }
        }
    });
</script>

