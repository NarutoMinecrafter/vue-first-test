<template>
  <div class="navbar">
    <my-button @click="$router.push('/')">Main page</my-button>
    <my-button @click="$router.push('/about')">About page</my-button>
    <my-button @click="$router.push('/posts')">Posts page</my-button>
    <my-button @click="$router.push('/posts-store')">Posts store page</my-button>
    <my-button @click="$router.push('/posts-comp-api')">Posts composition api page</my-button>
  </div>
</template>

<script>
import MyButton from './UI/MyButton.vue';
export default {
  components: { MyButton },};
</script>

<style lang="css" scoped>
.navbar {
  display: flex;
  padding: 10px;
  background-color: teal;
  box-shadow: 0 2px 4px gray;
  justify-content: center;
}
</style>