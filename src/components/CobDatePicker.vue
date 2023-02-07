<template>
    <div>
        <template v-if="!value">
            <v-label>
                <p v-if="label" class=" mb-2 uppercase text-control">
                    {{label}}
                    <cob-info v-if="tooltip" :span="tooltip">
                    </cob-info>
                </p>
            </v-label>
            <v-menu :ref="nome" v-model="menu" :close-on-content-click="false" transition="scale-transition" offset-y max-width="290px" min-width="290px">
                <template v-slot:activator="{on}">
                    <v-text-field v-if="required" :disabled="disabled" clearable clear-icon="fas fa-times" maxlength="10" @keypress="validarDigita($event)" :rules="[rules.date, rules.required]" placeholder="DD/MM/AAAA" @input="formatarData()" v-model="data" prepend-inner-icon="far fa-calendar-alt" @blur="date = parseDate(date)" v-on="on" outlined flat dense solo></v-text-field>
                    <v-text-field v-else :disabled="disabled" clearable clear-icon="fas fa-times" maxlength="10" @keypress="validarDigita($event)" :rules="[rules.date]" placeholder="DD/MM/AAAA" @input="formatarData()" v-model="data" prepend-inner-icon="far fa-calendar-alt" @blur="date = parseDate(date)" v-on="on" outlined flat dense solo></v-text-field>
                </template>
                <v-date-picker v-model="date" max="9999-12-31" min="1950-01-01" no-title @input="menu = false"></v-date-picker>
            </v-menu>
        </template>
        <template v-else>
            <v-label>
                <p v-if="label" class=" mb-2 uppercase text-control">
                    {{label}}
                    <cob-info v-if="tooltip" :span="tooltip">
                    </cob-info>
                </p>
            </v-label>
            <v-menu :ref="nome" v-model="menu" :close-on-content-click="false" transition="scale-transition" offset-y max-width="290px" min-width="290px">
                <template v-slot:activator="{on}">
                    <v-text-field v-if="required" :disabled="disabled" clearable clear-icon="fas fa-times" maxlength="10" @keypress="validarDigita($event)" :rules="[rules.date, rules.required]" placeholder="DD/MM/AAAA" @input="formatarData()" v-model="data" prepend-inner-icon="far fa-calendar-alt" @blur="date = parseDate(data)" v-on="on" outlined flat dense solo></v-text-field>
                    <v-text-field v-else :disabled="disabled" clearable clear-icon="fas fa-times" maxlength="10" @keypress="validarDigita($event)" :rules="[rules.date]" placeholder="DD/MM/AAAA" @input="formatarData()" v-model="data" prepend-inner-icon="far fa-calendar-alt" @blur="date = parseDate(data)" v-on="on" outlined flat dense solo></v-text-field>
                </template>
                <v-date-picker v-model="date" max="9999-12-31" min="1950-01-01" no-title @input="menu = false"></v-date-picker>
            </v-menu>
        </template>
    </div>
</template>

<script>
export default {
  name: "CobDatePicker",
  props: {
    nome: String,
    tooltip: String,
    value: [String, Number],
    label: String,
    disabled: Boolean,
    required: Boolean
  },
  data() {
    return {
      date: null,
      menu: false,
      data: this.value,
      rules: {
        required: value => !!value || "É necessaria adicionar uma data.",
        date: value => {
          const pattern = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/;
          if (!value) return true;

          return pattern.test(value) || value.length === 0 || "Data inválida.";
        }
      }
    };
  },
  watch: {
    date(val) {
      this.data = this.formatDate(this.date);
      //    this.$emit('input', this.date)
    },
    value: {
      immediate: true,
      handler(val) {
        if (val != null && val.includes("-")) {
          this.data = this.formatDate(val);
        } else {
          this.data = val;
        }
      }
    },
    data: function(novoValor) {
      this.$emit("input", novoValor);
    }
  },
  methods: {
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${day}/${month}/${year}`;
    },
    parseDate(date) {
      if (!date) return null;

      const [day, month, year] = date.split("/");

      if (!month) return null;

      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },
    formatarData() {
      if (!this.data) return null;

      if (this.data.length == 2 || this.data.length == 5)
        this.data = this.data + "/";
    },
    validarDigita($event) {
      var keyCode = $event.charCode ? $event.charCode : $event.which;
      if (keyCode < 48 || keyCode > 57) {
        $event.preventDefault();
      }
    }
  }
};
</script>

<style>
.v-date-picker-header .v-btn__content .v-icon::before {
  color: grey;
}
.v-date-picker-table .v-btn__content {
  color: grey;
}
.v-date-picker-table {
  height: 315px;
}
.v-date-picker-table table {
  height: 300px;
}
</style>