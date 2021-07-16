<template>
  <my-navbar></my-navbar>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script>
import MyNavbar from '@/components/MyNavbar.vue'
export default {
  components: {
    MyNavbar
  }
}
</script>

<style lang="css">
* {
  margin: 0;
  padding: 0;
}

.app {
  padding: 10px;
}
</style>