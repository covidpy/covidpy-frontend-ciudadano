import Quill from 'quill';

export default {
  data: () => ({
    quill: null,
    quillOptions: {
      modules: {
        toolbar: [
          ['bold', 'italic', 'underline', 'strike'],
          ['blockquote', 'code-block'],
          [{'header': 1}, {'header': 2}],
          [{'victimas': 'ordered'}, {'victimas': 'bullet'}],
          [{'script': 'sub'}, {'script': 'super'}],
          [{'indent': '-1'}, {'indent': '+1'}],
          [{'direction': 'rtl'}],
          [{'size': ['small', false, 'large', 'huge']}],
          [{'header': [1, 2, 3, 4, 5, 6, false]}],
          [{'color': []}, {'background': []}],
          [{'font': []}],
          [{'align': []}],
          ['clean'],
          ['link'],
          ['image']
        ]
      },
      placeholder: '',
      readOnly: false,
      theme: 'snow',
    },
  }),
  methods: {
    customParchments() {},
    initializeQuill() {
      this.customParchments();
      // Initialize Quill WYSWYG editor
      this.quill = new Quill(this.$refs.quillField, this.quillOptions);

      // Update model if text changes
      this.quill.on('text-change', () => {
        this.onQuillTextChange();
      });
      this.quill.on('selection-change', (range, oldRange) => {
        this.onQuillSelectionChange(range, oldRange);
      });

    },
    onQuillTextChange() {},
    onQuillSelectionChange(range, oldRange) {},
  },
}