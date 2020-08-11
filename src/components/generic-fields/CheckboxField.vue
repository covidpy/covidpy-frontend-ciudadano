<script>
  import fieldMixin from "./mixins/fieldMixin";
  import selectFieldMixin from "./mixins/selectFieldMixin";

  export default {
    name: "CheckboxField",
    mixins: [fieldMixin, selectFieldMixin],
    props: {
      horizontal: {
        type: Boolean,
        default: false,
      },
    },
    render(h) {
      let self = this;
      const checkboxList = [
        h('p', self.label),
        self.items.map(
          item => h(
            'v-checkbox',
            {
              props: {
                key: item[self.itemValue],
                loading: self.loading,
                label: item[self.itemText],
                required: self.required,
                'input-value': self.value,
                'error-messages': self.errorMessages,
                hint: self.hintText,
                readonly: self.readonly,
                name: self.name,
                disabled: self.disabled,
                value: item[self.itemValue],
              },
              on: {
                change: e => self.$emit('input', e),
              },
            }
          )
        ),
      ];
      const conditionalRow = self.horizontal ?
        [h('v-row', checkboxList)] : checkboxList;
      return h('v-container', {props: {fluid: true}}, conditionalRow);
    },
  }
</script>

<style scoped>

</style>
