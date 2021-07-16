<template>
  <input class="input" type="text" :value="modelValue" @input="updateInput" />
</template>

<script>
export default {
  name: 'my-input',
  props: {
    modelValue: [String, Number],
  },
  methods: {
    updateInput(e) {
      this.$emit('update:modelValue', e.target.value)
    }
  },
};
</script>

<style lang="css" scoped>
.input {
  display: block;
  border: 2px solid aqua;
  padding: 5px;
  margin: 5px;
}
</style>