<template>
  <v-autocomplete
      :items="items"
      :item-value="itemValue"
      :item-text="itemText"
      :loading="loading"
      :label="label"
      :multiple="multi"
      :chips="multi"
      :deletable-chips="!required && !readonly"
      :required="required"
      :prepend-icon="icon"
      :value="value"
      :error-messages="errorMessages"
      outlined
      :clearable="!required && !readonly"
      :readonly="readonly"
      @input="$emit('input', $event)"
      :name="name"
      :disabled="disabled"
      :hint="hintText"
      persistent-hint
      no-data-text="Sin datos encontrados"
      :append-outer-icon="value ? appendIcon : ''"
      @click:append-outer="appendEvent($event)"
  >
  <template v-if="multi" v-slot:selection="data">
    <v-tooltip v-if="data.item[itemText].length > chipsMaxLength" bottom max-width="520px">
      <template v-slot:activator="{ on }">
        <span v-on="on">
          <v-chip
          :input-value="data.selected"
          close
          class="chip--select-multi"
          @click:close="remove(data.item)"
        >
          <template>
            {{ formatChipText(data.item[itemText]) }}
          </template>
          {{ data.item.name }}
        </v-chip>
        </span>
      </template>
        {{data.item[itemText]}}
    </v-tooltip>
    <template v-else>
      <v-chip
        :input-value="data.selected"
        close
        class="chip--select-multi"
        @click:close="remove(data.item)"
      >
        <template>
          {{ formatChipText(data.item[itemText]) }}
        </template>
        {{ data.item.name }}
      </v-chip>
    </template>
  </template>
  </v-autocomplete>
</template>

<script>
import fieldMixin from "./mixins/fieldMixin";
import selectFieldMixin from "./mixins/selectFieldMixin";

export default {
  name: "SelectField",
  mixins: [fieldMixin, selectFieldMixin],
  props: {
    multi: {
      type: Boolean,
      default: () => false
    }
  },
  data() {
    return {
      chipsMaxLength: 64
    };
  },
  methods: {
    formatChipText(text) {
      if (text.length > this.chipsMaxLength) {
        return text.substring(0, this.chipsMaxLength) + "...";
      }

      return text;
    },
    remove(item) {
      if(!this.required && !this.readonly) {
        this.$emit("input", this.value.filter(i => i !== item[this.itemValue]));
      }
    },
    appendEvent(event) {
      if(this.items && this.items.length > 0){
        let value = this.items.find(i => i[this.itemValue] === this.value);
        this.$emit('appendEvent', value)
      }
    }
  },
};
</script>

<style scoped>
</style>
