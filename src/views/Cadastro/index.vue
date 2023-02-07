<template>

    <v-flex class="fill-height base">
        <div v-if="true">
            <v-row class="pa-12">

            <v-col>

                <cob-panel
                titulo="Pagina de Testes e Estudos - Fitros e Datas">

                    <template>

                        <v-dialog
                            persistent 
                            fullscreen 
                            hide-overlay
                            v-model="dialogCarregar"                  
                            content-class="loading-dialog">

                            <v-card
                                style="background-color: rgba(255, 255, 255, .15)"
                                class="vCardCarregar"
                                dark>    

                                <v-progress-circular                        
                                    indeterminate
                                    color="none"
                                    class="circularCarregar"
                                    :size="100">

                                    Carregando

                                    </v-progress-circular>   

                            </v-card>

                        </v-dialog>
                        
                    </template>

                    <v-row>
						<v-col cols="3">
                            <v-label>
                                <p class="mb-2 uppercase text-control">
                                    Nome
                                    
                                </p>
                            </v-label>
							<v-text-field
								placeholder="Pesquisar Pelo Nome"
								v-model="pesquisaNome"
							>
							</v-text-field>
						</v-col>
                        <v-col cols="3">
							<cob-autocomplete
								label="Cargo"
								placeholder="Pesquisar Pelo Cargo"
                                :items="cargos"
                                item-value="text"
                                item-text="text"
								v-model="pesquisaCargo"
                                clearable
							>
							</cob-autocomplete>
						</v-col>
                        <v-col cols="3">
                            <cob-date-picker
								label="Data Inicio"
								placeholder="Pesquisar Pela Data Inicio"
								v-model="pesquisaDataInicio"
							>
							</cob-date-picker>
						</v-col>
                        <v-col cols="3">
							<cob-date-picker
								label="Data Fim"
								placeholder="Pesquisar Pela Data Fim"
								v-model="pesquisaDataFim"
							>
							</cob-date-picker>
						</v-col>
					</v-row>

                    <v-row>
                        <v-col cols="12">
                            <v-data-table
                            :headers="headers"
                            :items="itemsFiltrados"
                            :footer-props="{
							'items-per-page-options': [10, 20, 30, 40, 50, -1],
						    }">
                                <template v-slot:item.action="{ item }">
                                    <v-flex class="d-flex" style="float: right">
                                        <cob-btn-editar class="mr-2"  />
                                        <cob-btn-excluir  />
                                    </v-flex>
                                </template>
                            </v-data-table>
                        </v-col>
                    </v-row>
                </cob-panel>

                <cob-panel
                titulo="Pagina de Testes e Estudos - Componentes">
                <v-tabs
                v-model="tabs">
                    <v-tab>Componente Um</v-tab>
                    <v-tab>Componente Dois</v-tab>
                    <v-tab>Componente Tres</v-tab>

                    <v-tabs-items v-model="tabs">
                    <v-tab-item>
                        <v-card
                        flat
                        >
                            <br>
                                <estudo-componente-01 
                                titulo="Teste passando informacoes para o componente" 
                                textoBotaoIncluir="Incluir" 
                                :cargos='cargos'
                                @novoFuncionario = "IncluirFuncionario"></estudo-componente-01>
                            
                        </v-card>
                    </v-tab-item>
                     <v-tab-item>
                        <v-card
                        flat
                        >
                            <v-row>
                                <v-col cols="2">
                                    <br>
                                        <v-btn
                                        medium
                                        color="tertiary"
                                        @click="dialogIncluir = true"
                                        >
                                            Incluir
                                        </v-btn>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-tab-item>
                </v-tabs-items>
                </v-tabs>
                
                </cob-panel>

            </v-col>

        </v-row>
        </div>
        <v-dialog v-model="dialogIncluir">
            <estudo-componente-02></estudo-componente-02>
        </v-dialog>


    </v-flex>

</template>

<script src="./script.ts" lang="ts"></script>