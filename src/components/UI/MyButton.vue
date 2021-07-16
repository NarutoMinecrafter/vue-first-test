<template>
  <button class="btn">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'my-button'
};
</script>

<style lang="css" scoped>
.btn {
  display: block;
  border: 2px solid aqua;
  padding: 5px;
  margin: 5px;
  width: max-content;
}
</style>