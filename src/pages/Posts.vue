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
      <post-list :posts="searchInSortedPosts" @delete="onDelete" />
      <div v-intersection="loadMorePosts" class="observer"></div>
      <!-- <div class="paginator">
        <p v-for="pageNumber in totalPages" :key="pageNumber" @click="changePage(pageNumber)" :class="{
          'current': pageNumber === page
          }">{{pageNumber}}</p>
      </div> -->
    </div>
    <div v-else>Loading...</div>
  </div>
</template>

<script>
import axios from 'axios';
import PostForm from '@/components/PostForm.vue';
import PostList from '@/components/PostList.vue';

export default {
  components: {
    PostForm,
    PostList,
  },
  data() {
    return {
      posts: [],
      isShow: false,
      isLoading: false,
      selectedSort: '',
      searchQuery: '',
      page: 1,
      limit: 10,
      totalPages: 0,
      sortOptions: [
        { value: 'title', name: 'По названию' },
        { value: 'body', name: 'По описанию' },
      ],
    };
  },
  methods: {
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
    async fetchPosts() {
      this.isLoading = true;

      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts?_limit=${this.limit}&_page=${this.page}`
        );

        this.totalPages = Math.ceil(
          response.headers['x-total-count'] / this.limit
        );
        this.posts = response.data;
      } catch (e) {
        alert(e);
      } finally {
        this.isLoading = false;
      }
    },
    async loadMorePosts() {
      this.page += 1;

      try {
        const response = await axios.get(
          'https://jsonplaceholder.typicode.com/posts',
          {
            params: {
              _page: this.page,
              _limit: this.limit,
            },
          }
        );

        this.totalPages = Math.ceil(
          response.headers['x-total-count'] / this.limit
        );
        this.posts = this.posts.concat(response.data);
      } catch (e) {
        alert(e);
      }
    },
    // changePage(pageNumber) {
    //   this.page = pageNumber
    //   this.fetchPosts()
    // }
  },
  mounted() {
    this.fetchPosts()
  },
  computed: {
    sortedPosts() {
      return Array.from(this.posts).sort((post1, post2) =>
        post1[this.selectedSort]?.localeCompare(post2[this.selectedSort])
      );
    },
    searchInSortedPosts() {
      return this.sortedPosts.filter((post) =>
        post.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
  },
  watch: {
    // selectedSort(newValue) {
    //   this.posts.sort((post1, post2) => post1[newValue].localeCompare(post2[newValue]))
    // }
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

/* .paginator p {
  display: block;
  border: 2px solid lightskyblue;
  padding: 2px;
  margin: 2px;
}

.current {
  border: 3px solid blueviolet !important;
} */

.observer {
  height: 30px;
  background-color: green;
}
</style>
