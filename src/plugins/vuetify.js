import Vue from 'vue';
import Vuetify, {
  VAppBar,
  VLayout,
  VCard,
  VCardText,
  VTextField,
  VToolbar,
  VBtn,
  VNavigationDrawer,
  VList,
  VListItem,
  VSpacer,
  VMenu,
  VToolbarItems,
  VCheckbox,
  VTextarea,
  VCalendar,
  VDatePicker,
  VChip,
  VAutocomplete,
  VSkeletonLoader,
  VImg,
  VRow,
  VCol,
  VContainer,
  VStepper,
  VStepperHeader,
  VStepperItems,
  VStepperContent,
  VStepperStep,
  VIcon,
  VExpandTransition,
  VFadeTransition,
} from 'vuetify/lib';
import es from "vuetify/lib/locale/es";
import { Touch } from 'vuetify/lib/directives'

Vue.use(Vuetify, {
  components: {
    VAppBar,
    VLayout,
    VCard,
    VCardText,
    VTextField,
    VToolbar,
    VBtn,
    VNavigationDrawer,
    VList,
    VListItem,
    VSpacer,
    VMenu,
    VToolbarItems,
    VCheckbox,
    VTextarea,
    VCalendar,
    VDatePicker,
    VChip,
    VAutocomplete,
    VSkeletonLoader,
    VImg,
    VRow,
    VCol,
    VContainer,
    VStepper,
    VStepperHeader,
    VStepperItems,
    VStepperContent,
    VStepperStep,
    VIcon,
    VExpandTransition,
    VFadeTransition,
  },
  directives: {
    Touch
  },
});
export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: '#0a2052',
        secondary: '#5853ed',
        error: '#F44336',
        accent: '#FA6980',
      },
    },
  },
  options: {
    customProperties: true,
  },
  icons: {
    iconfont: 'md', // default is 'mdi'
  },
  lang: {
    locales: { es },
    current: 'es',
  }
})
