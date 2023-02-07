<template>
    <v-col cols="12">
        <v-container v-if="titulo" class="panel-heading col-md-12">{{titulo}}</v-container>
        <v-sheet class="box-sheet" width="100%">
            <v-container class="col-md-12">
                <slot></slot>
            </v-container>
        </v-sheet>
    </v-col>
</template>

<script>
    export default {
        name: "CobPanel",
        props: ['titulo']
    };
</script>