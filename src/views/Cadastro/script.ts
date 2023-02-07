import Vue from "vue";
import EstudoComponente01 from "@/views/Cadastro/Componentes/EstudoComponente01.vue"
import EstudoComponente02 from "@/views/Cadastro/Componentes/EstudoComponente02.vue"
import CobPanel from "@/components/CobPanel.vue"
import CobAutoComplete from "@/components/CobAutoComplete.vue"
import CobTextField from "@/components/CobTextField.vue"
import CobDatePicker from "@/components/CobDatePicker.vue"
import CobBtnEditar from "@/components/CobBtnEditar.vue"
import CobBtnExcluir from "@/components/CobBtnExcluir.vue"

export default Vue.extend({
    components: {
        'estudo-componente-01': EstudoComponente01,
        'estudo-componente-02': EstudoComponente02,
        'cob-panel' : CobPanel,
        'cob-autocomplete': CobAutoComplete,
        'cob-text-field': CobTextField,
        'cob-date-picker': CobDatePicker,
        'cob-btn-editar': CobBtnEditar,
        'cob-btn-excluir ': CobBtnExcluir
    },
    data(){
        return{
            dialogCarregar: false,
            panelPrincipal: true,
            dialogIncluir: false, 
            pesquisaNome: "", 
            pesquisaCargo: "", 
            pesquisaDataInicio: "", 
            pesquisaDataFim: "", 
            tabs: "",
            tab:"",
            cargos:[
                {
                    value: 0,
                    text: "Analista"
                },
                {
                    value: 1,
                    text: "Programador"
                },
                {
                    value: 2,
                    text: "Estagiario"
                },
            ],
            headers:[
                {
                    text:"Nome",
                    value: "nomeFuncionario",
                },
                {
                    text:"Cargo",
                    value: "cargoFuncionario",
                },
                {
                    text:"Data Inicio",
                    value: "dataInicioFuncionario",
                },
                {
                    text:"Data Fim",
                    value: "dataFimFuncionario",
                },
                {
                    text: "",
                    value: "action"
                }
            ],
            items:[
                {
                    nomeFuncionario: "Paulo",
                    cargoFuncionario: "Analista",
                    dataInicioFuncionario: "05/11/2011",
                    dataFimFuncionario: ""
                },
                {
                    nomeFuncionario: "Marcia",
                    cargoFuncionario: "Analista",
                    dataInicioFuncionario: "18/07/2006",
                    dataFimFuncionario: ""
                },
                {
                    nomeFuncionario: "Leandro",
                    cargoFuncionario: "Programador",
                    dataInicioFuncionario: "02/03/2022",
                    dataFimFuncionario: ""
                },
                {
                    nomeFuncionario: "Victor",
                    cargoFuncionario: "Estagiario",
                    dataInicioFuncionario: "01/02/2021",
                    dataFimFuncionario: ""
                },
                {
                    nomeFuncionario: "Diogo",
                    cargoFuncionario: "Estagiario",
                    dataInicioFuncionario: "01/02/2021",
                    dataFimFuncionario: ""
                },
                {
                    nomeFuncionario: "Guilherme",
                    cargoFuncionario: "Estagiario",
                    dataInicioFuncionario: "01/02/2021",
                    dataFimFuncionario: "01/05/2021"
                },
                {
                    nomeFuncionario: "Davi",
                    cargoFuncionario: "Estagiario",
                    dataInicioFuncionario: "01/02/2021",
                    dataFimFuncionario: "01/07/2021"
                },
            ],
        }


    },
    created(){

    },
    computed:{
        itemsFiltrados():any{
            var condicoes:any = []
            if(this.pesquisaNome){
                condicoes.push(this.filtrarNome)
            }
            if(this.pesquisaCargo){
                condicoes.push(this.filtrarCargo)
            }
            if(this.pesquisaDataInicio){
                condicoes.push(this.filtrarDataInicio)
            }
            if(this.pesquisaDataFim){
                condicoes.push(this.filtrarDataFim)
            }
            if(condicoes.length>0){
                return this.items.filter((items) =>{
                    return condicoes.every((condicao:any) =>{
                        return condicao(items)
                    })
                })
            } return this.items
        },
    },
    methods:{
        stringToDate(data: string){
            if(data || data!= null){
                const dataAlterada = data.replace(/(..)\/(..)\/(....)/, '$3-$2-$1');
                var dataConvertida = new Date(dataAlterada);
                return dataConvertida;
            }
        },
        filtrarNome(item:any){
            if(item.nomeFuncionario != null){
                return item.nomeFuncionario.toLowerCase().includes(this.pesquisaNome.toLowerCase());
            }
        },
        filtrarCargo(item:any){
            if(item.cargoFuncionario != null){
                return item.cargoFuncionario.toLowerCase().includes(this.pesquisaCargo.toLowerCase());
            }
        },
        filtrarDataInicio(item:any){
            if(item.dataInicioFuncionario != null){
                var dataInicio:any = this.stringToDate(item.dataInicioFuncionario)
                var dataPesquisaInicio:any = this.stringToDate(this.pesquisaDataInicio)
                if(dataInicio>= dataPesquisaInicio){
                    return item.dataInicioFuncionario
                }
            }
        },
        filtrarDataFim(item:any){
            if(item.dataFimFuncionario != null){
                var dataFim:any = this.stringToDate(item.dataFimFuncionario)
                var dataPesquisaFim:any = this.stringToDate(this.pesquisaDataFim)
                if(dataFim<= dataPesquisaFim){
                    return item.dataInicioFuncionario
                }
            }
        },
        IncluirFuncionario(item:any){
            var profissional:any = {
                nomeFuncionario : item.nome,
                cargoFuncionario : item.cargo,
                dataInicioFuncionario : item.data,
                dataFimFuncionario : null
            }
            this.items.push(profissional)
        }
    }
})