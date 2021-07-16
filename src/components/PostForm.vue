<template>
  <form class="form" @submit.prevent>
    <h1>Создать пост:</h1>
    <my-input
      type="text"
      placeholder="Название..."
      v-model="post.title"
      v-focus
    />
    <my-input
      type="text"
      placeholder="Описание..."
      v-model="post.body"
    />
    <my-button @click="createPost">Добавить</my-button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      post: {
        title: "",
        body: "",
      },
    };
  },
  methods: {
    createPost() {
      if (this.post.title && this.post.body) {
        this.$emit("create", { id: Date.now(), ...this.post });

        this.post = {
          title: "",
          body: "",
        };
      }
    },
  },
};
</script>

<style lang="css" scoped>
.form {
  display: flex;
  flex-direction: column;
  /* align-items: flex-end; */
}

.input {
  display: block;
  border: 2px solid aqua;
  padding: 5px;
  margin: 5px;
}
</style>
