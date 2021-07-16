<template>
  <div class="posts" ref="app">
    <h1>Страница с постами:</h1>
    <my-input :model-value="searchQuery" @update="setSearchQuery" v-focus placeholder="Поиск..." />
    <div class="btns">
      <my-button @click="createPost">Создать пост</my-button>
      <my-select :model-value="selectedSort" @update="setSelectedSort" :options="sortOptions" />
    </div>
    <my-dialog v-model:show="isShow">
      <post-form @create="onCreate" />
    </my-dialog>
    <div v-if="!isLoading">
      <post-list :posts="searchInSortedPosts" @delete="onDelete" />
      <div v-intersection="loadMorePosts" class="observer"></div>
    </div>
    <div v-else>Loading...</div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations, mapActions } from 'vuex'
import PostForm from '@/components/PostForm.vue';
import PostList from '@/components/PostList.vue';

export default {
  components: {
    PostForm,
    PostList,
  },
  data() {
    return {
      isShow: false,
    };
  },
  methods: {
    ...mapMutations({
      setPage: 'posts/setPage',
      setSearchQuery: 'posts/setSearchQuery',
      setSelectedSort: 'posts/setSelectedSort'
    }),
    ...mapActions({
      fetchPosts: 'posts/fetchPosts',
      loadMorePosts: 'posts/loadMorePosts'
    }),
    createPost() {
      this.isShow = true;
    },
    onCreate(post) {
      this.posts.push(post);
      this.isShow = false;
    },
    onDelete(post) {
      this.posts = this.posts.filter((arrPost) => arrPost.id !== post.id);
    },
  },
  mounted() {
    this.fetchPosts()
  },
  computed: {
    ...mapState({
      posts: state => state.posts.posts,
      isLoading: state => state.posts.isLoading,
      selectedSort: state => state.posts.selectedSort,
      searchQuery: state => state.posts.searchQuery,
      page: state => state.posts.page,
      limit: state => state.posts.limit,
      totalPages: state => state.posts.totalPages,
      sortOptions: state => state.posts.sortOptions
    }),
    ...mapGetters({
      sortedPosts: 'posts/sortedPosts',
      searchInSortedPosts: 'posts/searchInSortedPosts'
    })
  },
};
</script>

<style lang="css" scoped>
.btns {
  display: flex;
  justify-content: space-between;
}

.paginator {
  display: flex;
}

.observer {
  height: 30px;
  background-color: green;
}
</style>
