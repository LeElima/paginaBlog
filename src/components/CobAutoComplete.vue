<template>
    <div>
        <v-label v-if="label">
            <p class="mb-2 uppercase text-control">
                {{label}}
                <cob-info
                    v-if="tooltip"
                    :span="tooltip"
                ></cob-info>
            </p>
        </v-label>
        <v-autocomplete 
            v-model="valor" 
            :item-text="itemText" 
            :no-data-text="noDataText" 
            :item-value="itemValue"
            :items="items" 
            :rules="rules" 
            :disabled="disabled"
            :clearable="clearable"
            :placeholder="placeholder"
            clear-icon="fas fa-times"
            outlined 
            flat 
            dense 
            solo
        >
        </v-autocomplete>
    </div>
</template>

<script>
export default {
  name: "CobAutocomplete",
  props: {
    tooltip: String,
    placeholder: { type: String, default: "Selecione" },
    items: Array,
    value: [String, Number, Array],
    rules: Array,
    label: String,
    disabled: Boolean,
    itemText: String,
    itemValue: String,
    noDataText: String,
    clearable: Boolean
  },
  data() {
    return {
      valor: 0
    };
  },
  watch: {
    valor: {
      immediate: true,
      handler(novoValor) {
        this.$emit("input", novoValor);
      }
    },
    value: {
      immediate: true,
      handler(val) {
        this.valor = val;
      }
    }
  }
};
</script>