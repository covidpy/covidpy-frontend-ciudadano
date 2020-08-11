export default {
  props: {
    itemsSource: {
      type: [String, Array],
      required: true
    },
    itemValue: {
      type: String,
      default: () => "id"
    },
    itemText: {
      type: String,
      default: () => "descripcion"
    },
  },
  data: () => ({
    loading: false,
    error: false,
    items: [],
    lastRequest: null,
  }),
  mounted() {
    this.getItems();
  },
  methods: {
    getItems() {
      if (this.itemsSource instanceof Array) {
        this.items = this.itemsSource;
      } else {
        this.loading = true;
        this.error = false;
        this.$http
          .get(
            this.itemsSource,
            {
              before: request => {
                if (this.lastRequest) {
                  this.lastRequest.abort();
                }
                this.lastRequest = request;
              }
            }
          )
          .then(r => r.json())
          .then(
            items => {
              this.items = items;
              this.loading = false;
              this.lastRequest = null;
            },
            () => {
              this.error = false;
              this.loading = false;
              this.lastRequest = null;
            }
          );
      }
    },
  },
  watch: {
    itemsSource: {
      immediate: true,
      deep: true,
      handler() {
        this.getItems();
      }
    }
  },
}
