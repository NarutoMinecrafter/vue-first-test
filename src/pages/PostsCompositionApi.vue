<template>
  <div class="posts" ref="app">
    <h1>Страница с постами:</h1>
    <my-input v-model="searchQuery" v-focus placeholder="Поиск..." />
    <div class="btns">
      <my-button @click="createPost">Создать пост</my-button>
      <my-select v-model="selectedSort" :options="sortOptions" />
    </div>
    <my-dialog v-model:show="isShow">
      <post-form @create="onCreate" />
    </my-dialog>
    <div v-if="!isLoading">
      <post-list :posts="searchedPosts" @delete="onDelete" />
      <div v-intersection="loadMorePosts" class="observer"></div>
    </div>
    <div v-else>Loading...</div>
  </div>
</template>

<script lang="ts">
import PostForm from '@/components/PostForm.vue';
import PostList from '@/components/PostList.vue';
import { usePosts } from '@/hooks/usePosts'
import useSortedPosts from '@/hooks/useSortedPosts'
import useSearchInSortedPosts from '@/hooks/useSearchInSortedPosts'

export default {
  components: {
    PostForm,
    PostList,
  },
  data() {
    return {
      isShow: false,
      sortOptions: [
        { value: 'title', name: 'По названию' },
        { value: 'body', name: 'По описанию' },
      ],
    };
  },
  setup(props) {
    const { posts, totalPages, isLoading } = usePosts(10)
    const { selectedSort, sortedPosts } = useSortedPosts(posts)
    const { searchedPosts, searchQuery } = useSearchInSortedPosts(sortedPosts)

    return {
      posts,
      totalPages,
      isLoading,
      selectedSort,
      sortedPosts,
      searchedPosts,
      searchQuery
    }
  }
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
