<template>
  <div class="post">
    <div>
      <div><strong>Название:</strong> {{post.title}}</div>
      <div><strong>Описание:</strong> {{post.body}}</div>
    </div>
    <div class="btns">
      <my-button @click="$router.push(`/posts/${post.id}`)">Открыть</my-button>
      <my-button @click="$emit('delete', post)">Удалить</my-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      required: true
    }
  }
}
</script>

<style scoped>
.post {
  border: 2px solid blue;
  padding: 5px;
  margin: 5px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.btns {
  display: flex;
}
</style>