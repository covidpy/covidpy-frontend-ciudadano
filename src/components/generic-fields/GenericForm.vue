<script>
  import SelectField from './SelectField';
  import DatetimeField from './DatetimeField';
  import DateField from './DateField';
  import PasswordField from './PasswordField';
  import TextField from "./TextField";
  import RadioField from "./RadioField";
  import PrettyRadioField from "./PrettyRadioField";
  import CheckboxField from "./CheckboxField";
  import StepSliderField from "./StepSliderField";
  import genericFormMixin from "./mixins/genericFormMixin";
  import TempField from "./TempField";
  import SmileyField from "./SmileyField";

  export default {
    name: "GenericForm",
    mixins: [genericFormMixin],
    data() {
      return {
        fieldMapping: {
          Int: (createElement, field) => {
            let props = this.defaultFieldProps(field);
            props.props.type = 'number';
            props.props.hint = field.hintText;
            props.props.outlined = true;
            props.props.label = field.label + (field.isRequired ? '(Requerido)': '');
            return createElement('v-text-field', props);
          },
          String: (createElement, field) => {
            const props = this.defaultFieldProps(field);
            props.props.icon = field.icon;
            return createElement(
              TextField, props
            );
          },
          Password: (createElement, field) => createElement(
            PasswordField, this.defaultFieldProps(field)
          ),
          Select: (createElement, field) => {
            let props = this.defaultFieldProps(field);
            props.props.itemsSource = field.optionsSource;
            props.props.itemValue = field.optionsIdProp;
            props.props.itemText = field.optionsTextProp;
            return createElement(SelectField, props);
          },
          Radio: (createElement, field) => {
            let props = this.defaultFieldProps(field);
            props.props = {
              ...props.props,
              ...this.defaultSelectProps(field),
            };
            props.props.horizontal = field.horizontal;
            return createElement(RadioField, props);
          },
          PrettyRadio: (createElement, field) => {
            let props = this.defaultFieldProps(field);
            props.props = {
              ...props.props,
              ...this.defaultSelectProps(field),
            };
            return createElement(PrettyRadioField, props);
          },
          MultiSelect: (createElement, field) => {
            let props = this.defaultFieldProps(field);
            props.props.itemsSource = field.optionsSource;
            props.props.itemValue = field.optionsIdProp;
            props.props.itemText = field.optionsTextProp;
            props.props.multi = true;
            return createElement(SelectField, props);
          },
          DateTime: (createElement, field) => createElement(
            DatetimeField, this.defaultFieldProps(field)
          ),
          Date: (createElement, field) => createElement(
            DateField, this.defaultFieldProps(field)
          ),
          TextArea: (createElement, field) => {
              let props = this.defaultFieldProps(field);
              props.props.outlined = true;
            props.props['auto-grow'] = true;
            return createElement('v-textarea', props);
          },
          Bool: (createElement, field) => {
            let props = this.defaultFieldProps(field);
            props.props['false-value'] = false;
            props.props.value = undefined;
            props.props['input-value'] = this.value[field.fieldName];
            props.on = {
              change: (event) => {
                this.value[field.fieldName] = event;
                this.$emit('input', this.value);
              },
            };
            return createElement('v-checkbox', props);
          },
          CheckList: (createElement, field) => {
            let props = this.defaultFieldProps(field);
            props.props = {
              ...props.props,
              ...this.defaultSelectProps(field),
            };
            props.props.horizontal = field.horizontal;
            return createElement(CheckboxField, props);
          },
          StepSlider: (createElement, field) => {
            let props = this.defaultFieldProps(field);
            props.props = {
              ...props.props,
              ...this.defaultSelectProps(field),
            };
            props.props.horizontal = field.horizontal;
            return createElement(StepSliderField, props);
          },
          Temp: (createElement, field) => {
            let props = this.defaultFieldProps(field);
            return createElement(TempField, props);
          },
          Smiley: (createElement, field) => {
            let props = this.defaultFieldProps(field);
            props.props = {
              ...props.props,
              ...this.defaultSelectProps(field),
            };
            return createElement(SmileyField, props);
          },
        },
      };
    },
    watch: {
      // errorMessages: {
      //   deep: true,
      //   handler(val) {
      //     console.log('val', val);
      //     console.log('errors', this.errorMessages);
      //     const firstError = this.fields
      //       .find(f =>
      //         this.errorMessages[f.fieldName] && this.errorMessages[f.fieldName].length > 0);
      //     console.log(firstError);
      //     console.log('refs', this.$refs);
      //     this.$vuetify.goTo(this.$refs[firstError.fieldName]);
      //   },
      // },
    },
    methods: {
      defaultSelectProps(field) {
        const props = {};
        props.itemsSource = typeof(field.optionsSource) === 'string' && field.optionsSource.startsWith("[") ? JSON.parse(field.optionsSource) : field.optionsSource;
        props.itemValue = field.optionsIdProp;
        props.itemText = field.optionsTextProp;
        return props;
      },
      defaultFieldProps(field) {
        return {
          attrs: {
            name: field.fieldName,
          },
          ref: field.fieldName,
          props: {
            label: field.label,
            // Si es conditional, no le hace caso al is required
            required: field.conditions && field.conditions.length > 0 ?
              field.isRequired && this.checkFieldConditions(field) : field.isRequired,
            errorMessages: this.errorMessages[field.fieldName] || [],
            value: this.value[field.fieldName],
            hintText: field.hintText,
            readonly: this.readonly || field.readonly,
            clearable: this.clearable,
            name: field.fieldName,
            disabled: this.disabled || field.disabled,
            appendIcon: field.appendIcon,
            ...field.meta,
          },
          on: {
            input: (event) => {
              this.value[field.fieldName] = event;
              if (this.errorMessages && this.errorMessages[field.fieldName]) {
                this.errorMessages[field.fieldName] = [];
              }
              this.$emit('input', this.value);
            },
            appendEvent: (event) => {
                let obj = {
                    field: field.fieldName,
                    value: event
                };
                this.$emit('appendEvent', obj);
            }
          },
          ref: field.fieldName,
          style: {
            "max-width": "100%",
            "min-width": !!field.inputLength
              ? `${field.inputLength}ch`
              : !!field.fieldMaxLength
                ? `${field.fieldMaxLength}ch`
                : ""
          },
        };
      }
    },
    render(h) {
      let fieldsComponents = this.fields ? this.fields
        .filter(field => !this.ignoreFields.includes(field.fieldName))
        .map((field, idx) => {
            if (!Array.isArray(field)) {
              // Si es un campo, envolvemos en un array
              field = [field];
            }
            // Si es un array, devolvemos varias columnas
            const children = field
              .filter(f => this.checkFieldConditions(f)
              ).map(f => {
                if (!this.fieldMapping[f.fieldType]) {
                  throw Error(`${f.fieldType} no es un tipo de campo válido`);
                }
                return h('v-col', {key: f.fieldName},
                  [this.fieldMapping[f.fieldType](h, f)]
                );
              });
            return h('v-row', {key: 'row' + idx,props: {justify: 'start', align: 'center', noGutters: this.noGutters}}, children);
          }
        ) : [];
      return h('v-container', {
        class: `generic-form ${this.disabled ? 'disabled' : ''}`,
        props: {fluid: true}
      },
        [
          h('v-fade-transition', {props: {group: true, origin: 'center'}}, fieldsComponents)
        ]
      );
    },
  }
</script>

<style scoped>
  .generic-form.disabled {
    opacity: .23;
  }
</style>
