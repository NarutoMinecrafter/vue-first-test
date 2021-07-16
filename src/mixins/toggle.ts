export default {
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    hideDialog() {
      // @ts-ignore
      this.$emit('update:show', false);
    },
  }
};