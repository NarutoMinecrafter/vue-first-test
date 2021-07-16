import axios from 'axios';
import { onMounted, ref } from 'vue';

export function usePosts(limit: number) {
  const posts = ref([]);
  const totalPages = ref(0);
  const isLoading = ref(true);
  const fetching = async () => {
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${1}`
      );

      totalPages.value = Math.ceil(response.headers['x-total-count'] / limit);
      posts.value = response.data;
    } catch (e) {
      alert(e);
    } finally {
      isLoading.value = false;
    }
  };

  onMounted(fetching);

  return { posts, totalPages, isLoading };
}
