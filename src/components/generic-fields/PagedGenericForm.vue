<template>
  <v-stepper
      class="elevation-0"
      v-model="currentStep"
      v-touch="{
                            left: stepUp,
                            right: stepDown,
                         }"
  >
    <v-stepper-header v-if="!noHeader">
      <template v-for="(page, idx) of pages">
        <v-stepper-step
                        :step="idx + 1"
                        editable
                        :key="'step' + idx" />
        <v-divider v-if="idx !== pages.length - 1" :key="'divider' + idx"/>
      </template>
    </v-stepper-header>
    <v-stepper-items>
      <v-stepper-content v-for="(page, idx) of pages"
                         class="pa-0"
                         :step="idx + 1"
                         :key="'content' + idx">
        <GenericForm :fields="page"
                     v-if="page"
                     :value="value"
                     :error-messages="errorMessages"
                     :disabled="disabled"
                     :no-gutters="noGutters"
                     :clearable="clearable"
                     :headers="headers"
                     :readonly="readonly"
                     @input="$emit('input', value)" />
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
import genericFormMixin from './mixins/genericFormMixin';
import GenericForm from './GenericForm';
import {flattenFields} from "../utils/utils";

export default {
  name: 'PagedGenericForm',
  components: { GenericForm },
  mixins: [genericFormMixin, ],
  props: {
    noHeader: {
      type: Boolean,
      default: () => false,
    },
    step: {
      type: Number,
      required: false,
    },
  },
  methods: {
    stepUp() {
      if (this.currentStep !== this.pageNumber) {
        this.currentStep++;
      }
    },
    stepDown() {
      if (this.currentStep !== 1) {
        this.currentStep--;
      }
    },
  },
  data: () => ({
    currentStep: 1,
  }),
  watch: {
    pageNumber: {
      immediate: true,
      handler(val) {
        this.$emit('update:pageNumber', val);
      }
    },
    step(val) {
      this.currentStep = val;
    },
    currentStep: {
      inmediate: true,
      handler(val) {
        this.$emit('update:step', val);
      }
    },
    errorMessages: {
      handler(val) {
        if (val) {
          const fields = flattenFields(this.fields);
          const errorField = fields.find(f => val[f.fieldName] && val[f.fieldName].length > 0);
          if (errorField) {
            this.currentStep = errorField.page + 1 <= this.pageNumber ? errorField.page + 1 : this.pageNumber;
          }
        }
      },
    },
  },
  computed: {
    pageNumber() {
      return this.pages ? this.pages.length : null;
    },
    pages () {
      const fields = flattenFields(this.fields);
      return fields.reduce((currPage, field) => {
        if (!currPage[field.page]) {
          currPage[field.page] = [];
        }
        currPage[field.page].push([field]);
        return currPage;
      }, []).filter(
        page => {
          const fields = flattenFields(page);
          return fields.some(f => this.checkFieldConditions(f));
        }
      );
    },
  },
};
</script>

<style scoped>

</style>
