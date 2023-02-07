<template>
    <v-dialog v-model="dialog" persistent max-width="500px">
        <template v-slot:activator="{ on }">
            <v-btn :disabled="disabled" depressed tile x-small fab color="error" v-on="on"><v-icon dark>fas fa-trash-alt</v-icon></v-btn>
        </template>
        <v-card>
            <v-container>
                <v-toolbar class="modal-header" style="box-shadow: 0px 0px 0px 0px !important;">
                    <v-toolbar-title>Excluir</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-btn color="black" icon @click="dialog = false">
                        <v-icon>fas fa-times</v-icon>
                    </v-btn>
                </v-toolbar>
            </v-container>
            <v-divider></v-divider>
            <v-card-text>
                <v-row>
                    <v-col cols="12">
                        <v-label><p class=" mb-2 uppercase">Você realmente deseja excluir?</p></v-label>
                    </v-col>
                </v-row>
            </v-card-text>
            <v-divider></v-divider>
            <v-container>
                <v-col cols="12" class="pt-0 pb-0">
                    <v-card-actions class="d-flex justify-end">
                        <v-btn @click="excluir()" color="success">
                            Excluir
                        </v-btn>
                        <v-btn dark color="grey" @click="dialog = false">
                            Cancelar
                        </v-btn>
                    </v-card-actions>
                </v-col>
            </v-container>
        </v-card>
    </v-dialog>
</template>

<script>
    export default {
        name: "CobBtnExcluir",
        props: ["disabled"],
        data() {
            return {
                dialog: false,
            }
        },
        methods: {
            excluir(){
                this.dialog = false;
                this.$emit('excluir');
            }
        },
    };
</script>