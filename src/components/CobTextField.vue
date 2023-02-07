<template>
  <div>
    <v-label>
      <p class="mb-2 uppercase text-control">
        {{ label }}&nbsp;
      </p>
    </v-label>
    <v-text-field
      :rules="rules"
      :value="value"
      @input.native="$emit('input', $event.target.value)"
      @keypress="validarDigita($event)"
      @change="change($event)"
      @click="click($event)"
      :placeholder="placeholder"
      :disabled="disabled"
      :append-outer-icon="appendOuterIcon"
      :append-icon="appendInnerIcon"      
      :counter="counter"
      :maxlength="maxlength"
      :min="0"
      :reverse="reverse"
      :suffix="sufix"
      :prefix="prefix"
      v-mask="mask"
      outlined
      flat
      dense
      solo
      required
      hide-details
    ></v-text-field>
  </div>
</template>

<script>
import Vue from "vue";
export default {
  name: "CobTextField",
  props: {
    tooltip: String,
    placeholder: String,
    value: [String, Number],
    rules: Array,
    label: String,
    disabled: Boolean,
    appendOuterIcon: String,
    appendInnerIcon: String,
    type: String,
    counter: Number,
    maxlength: [Number, String],
    mask: String,
    reverse: Boolean,
    prefix: String,
    sufix: String,
  },
  methods: {
    validarDigita($event) {
      if (this.type === "number") {
        var keyCode = $event.charCode ? $event.charCode : $event.which;
        if (keyCode < 48 || keyCode > 57) {
          $event.preventDefault();
        }
      }
    },
    change(event){
      this.$emit("change", event)
    },
    click(event){
      this.$emit("click", event)
    }
  },
};
</script>