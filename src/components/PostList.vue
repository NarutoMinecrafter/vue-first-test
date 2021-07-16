<template>
  <div class="posts" v-if="posts.length">
    <h1>Посты:</h1>
    <transition-group name="post-list">
      <post-item v-for="post in posts" :post="post" :key="post.id" @delete="$emit('delete', post)" />
    </transition-group>
  </div>
  <div v-else>
    <h1 style="color: red">Постов пока нет :(</h1>
  </div>
</template>

<script>
import PostItem from '@/components/PostItem'

export default {
  components: {
    PostItem
  },
  props: {
    posts: {
      type: Array,
      required: true
    }
  }
};
</script>

<style lang="css" scoped>
.post-list-item {
  display: inline-block;
  margin-right: 10px;
}

.post-list-enter-active,
.post-list-leave-active {
  transition: all 0.4s ease;
}

.post-list-enter-from,
.post-list-leave-to {
  opacity: 0;
  transform: translateX(130px);
}

.post-list-move {
  transition: transform 0.4s ease;
}
</style>