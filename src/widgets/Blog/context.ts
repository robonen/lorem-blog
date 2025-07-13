import type { PostComment } from '@/entities/Comment';
import type { Post } from '@/entities/Post';
import { useAsyncState, useInjectionStore } from '@robonen/vue';
import { computed, reactive, shallowRef } from 'vue';
import { kmpSearch } from '@/shared/utils';

type PostItem = Post & {
  comments: PostComment[];
};

/**
 * Blog uses injection store pattern
 * @see https://deepwiki.com/robonen/lorem-blog/5.1-blog-content-system
 */
export const {
  useProvidingState: useProvidingPosts,
  useInjectedState: useInjectedPosts,
} = useInjectionStore((loader: () => Promise<any>) => {
  const {
    state: posts,
    isLoading: loading,
    executeImmediately: loadPosts,
  } = useAsyncState<PostItem[]>(
    async () => {
      const response = await loader();
      return response.data as PostItem[];
    },
    [],
    {
      onError(error) {
        console.error('Failed to load posts:', error);
      },
    },
  );

  const selectedPost = shallowRef<PostItem | null>(null);

  const filters = reactive({
    search: '',
    tags: new Set<string>(),
  });

  const filtersActive = computed(() => {
    return filters.search.trim() !== '' || filters.tags.size > 0;
  });

  const filteredPosts = computed(() => {
    const filteredByTags = posts.value.filter((post) => {
      if (filters.tags.size > 0)
        return Array.from(filters.tags).every(tag => post.tags.includes(tag));

      return true;
    });

    if (!filters.search)
      return filteredByTags;

    return filteredByTags.filter(post => kmpSearch(post.title, filters.search));
  });

  const availableTags = computed(() => {
    const tagsSet = new Set<string>();

    posts.value.forEach((post) => {
      post.tags.forEach(tag => tagsSet.add(tag));
    });

    return Array.from(tagsSet);
  });

  function toggleTag(tag: string) {
    if (filters.tags.has(tag))
      filters.tags.delete(tag);
    else
      filters.tags.add(tag);
  }

  function isTagActive(tag: string) {
    return filters.tags.has(tag);
  }

  function resetFilters() {
    filters.search = '';
    filters.tags.clear();
  }

  return {
    posts,
    loading,
    selectedPost,
    filters,
    filtersActive,
    filteredPosts,
    availableTags,
    loadPosts,
    toggleTag,
    isTagActive,
    resetFilters,
  };
});
