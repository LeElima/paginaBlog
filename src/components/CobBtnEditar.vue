<template>
    <v-btn depressed tile x-small fab color="default" @click="editar()" dark><v-icon>fas fa-pencil-alt</v-icon></v-btn>
</template>

<script>
    export default {
        name: "CobBtnEditar",
        methods: {
            editar(){
                this.$emit('editar');
            }
        },
    };
</script>