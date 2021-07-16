import { computed, Ref, ref } from 'vue';

export default function useSortedPosts(posts: Ref<any[]>) {
  const selectedSort = ref('');
  const sortedPosts = computed(() => {
    return Array.from(posts.value).sort((post1, post2) =>
      post1[selectedSort.value]?.localeCompare(post2[selectedSort.value])
    );
  });

  return { selectedSort, sortedPosts }
}
