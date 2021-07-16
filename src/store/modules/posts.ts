import axios from 'axios';

export const posts = {
  state: () => ({
    posts: [],
    isLoading: false ,
    selectedSort: '' ,
    searchQuery: '' ,
    page: 1 ,
    limit: 10 ,
    totalPages: 0 ,
    sortOptions: [
      { value: 'title', name: 'По названию' },
      { value: 'body', name: 'По описанию' },
    ],
  }),
  getters: {
    sortedPosts(state: any): any {
      return Array.from(state.posts).sort((post1, post2) =>
        // @ts-ignore
        post1[state.selectedSort]?.localeCompare(post2[state.selectedSort])
      );
    },
    searchInSortedPosts(state: any, getters: any): any {
      return getters.sortedPosts.filter((post: any) =>
        post.title.toLowerCase().includes(state.searchQuery.toLowerCase())
      );
    },
  },
  mutations: {
    setPosts(state: any, newPosts: any) {
      state.posts = newPosts;
    },
    setIsLoading(state: any, newIsLoading: any) {
      state.isLoading = newIsLoading;
    },
    setSelectedSort(state: any, newSelectedSort: any) {
      state.selectedSort = newSelectedSort;
    },
    setSearchQuery(state: any, newSearchQuery: any) {
      state.searchQuery = newSearchQuery;
    },
    setPage(state: any, newPage: any) {
      state.page = newPage;
    },
    setLimit(state: any, newLimit: any) {
      state.limit = newLimit;
    },
    setTotalPages(state: any, newTotalPages: any) {
      state.totalPages = newTotalPages;
    },
    setSortOptions(state: any, newSortOptions: any) {
      state.sortOptions = newSortOptions;
    },
  },
  actions: {
    async fetchPosts({ state, commit }: any) {
      commit('setLoading', true)

      try {
        const response = await axios.get(
          `https://jsonplaceholder.typicode.com/posts?_limit=${state.limit}&_page=${state.page}`
        );

        commit(
          'setTotalPages',
          Math.ceil(response.headers['x-total-count'] / state.limit)
        );

      commit('setPosts', response.data);
      } catch (e) {
        console.log(e);
      } finally {
      commit('setLoading', false);
      }
    },
    async loadMorePosts({ state, commit }: any) {
      commit('setPage', state.page + 1);

      try {
        const response = await axios.get(
          'https://jsonplaceholder.typicode.com/posts',
          {
            params: {
              _page: state.page,
              _limit: state.limit,
            },
          }
        );

        commit(
          'setTotalPages',
          Math.ceil(response.headers['x-total-count'] / state.limit)
        );

      commit('setPosts', state.posts.concat(response.data));
      } catch (e) {
        console.log(e);
      }
    },
  },
  namespaced: true
};
