<template>
  <div class="dialog" v-if="show" @click="hide">
    <div class="dialog__content" @click.stop>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import toggle from '@/mixins/toggle'

export default {
  name: 'my-dialog',
  mixins: [toggle]
};
</script>

<style lang="css" scoped>
.dialog {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  display: flex;
  background-color: rgba(0, 0, 0, 0.3);
}

.dialog__content {
  padding: 20px;
  margin: auto;
  background-color: #fff;
  border-radius: 20px;
}
</style>
