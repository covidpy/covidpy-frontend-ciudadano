<template>
  <div id="html-input">
    <slot name="toolbar"></slot>
    <div name="input" ref="quillField"></div>
  </div>
</template>

<script>
import Quill from 'quill';

export default {
  name: 'HtmlInput',
  props: {
    value: {
      type: String,
    },
  },
  data: () => ({
    quill: null,
    quillOptions: {
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],
          [{ 'header': 1 }, { 'header': 2 }],
          [{ 'script': 'sub' }, { 'script': 'super' }],
          [{ 'indent': '-1' }, { 'indent': '+1' }],
          [{ 'direction': 'rtl' }],
          [{ 'size': ['small', false, 'large', 'huge'] }],
          [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
          [{ 'color': [] }, { 'background': [] }],
          [{ 'font': [] }],
          [{ 'align': [] }],
          ['clean'],
          ['link'],
          ['image']
        ]
      },
      readOnly: false,
      theme: 'snow',
    },
    html: null,
  }),
  mounted () {
    this.initializeQuill();
  },
  watch: {
    value (val) {
      if (this.quill && val !== this.html) {
        this.quill.clipboard.dangerouslyPasteHTML(val);
      }
    },
  },
  methods: {
    initializeQuill () {
      let quillAttributors = [
        'attributors/style/align',
        'attributors/style/background',
        'attributors/style/color',
        'attributors/style/direction',
        'attributors/style/font',
        'attributors/style/size',
      ];

      for (let attributor of quillAttributors) {
        Quill.register(Quill.import(attributor), true);
      }

      // Initialize Quill WYSWYG editor
      this.quill = new Quill(this.$refs.quillField, this.quillOptions);

      if (this.value) {
        this.$nextTick(() => {
          this.quill.clipboard.dangerouslyPasteHTML(this.value);
        });
      }

      // Update model if text changes
      this.quill.on('text-change', () => {
        this.html = this.$refs.quillField.children[0].innerHTML;
        this.$emit('input', this.html);
      });
    },
  },
};
</script>

<style scoped>

  .ql-editor {
    white-space: normal !important;
  }
</style>
