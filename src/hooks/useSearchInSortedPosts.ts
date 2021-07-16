import { computed, Ref, ref } from 'vue';

export default function useSearchInSortedPosts(sortedPosts: Ref<any[]>) {
  const searchQuery = ref('');
  const searchedPosts = computed(() => {
    return sortedPosts.value.filter((post) =>
      post.title.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  });

  return { searchedPosts, searchQuery };
}
