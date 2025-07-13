import { beforeEach, describe, expect, it, vi } from 'vitest';
import { nextTick } from 'vue';
import { useProvidingPosts } from '../context';

const mockPosts = [
  {
    id: 1,
    title: 'Vue.js Best Practices',
    content: 'Content about Vue.js',
    tags: ['vue', 'javascript', 'frontend'],
    comments: [
      { id: 1, postId: 1, content: 'Great post!', author: 'John' },
    ],
  },
  {
    id: 2,
    title: 'TypeScript Tips',
    content: 'Content about TypeScript',
    tags: ['typescript', 'javascript'],
    comments: [],
  },
  {
    id: 3,
    title: 'React vs Vue',
    content: 'Comparison of React and Vue',
    tags: ['react', 'vue', 'comparison'],
    comments: [
      { id: 2, postId: 3, content: 'Interesting comparison', author: 'Jane' },
    ],
  },
];

describe('blog Context', () => {
  let mockLoader: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockLoader = vi.fn().mockResolvedValue({ data: mockPosts });
  });

  it('should load posts on initialization', async () => {
    const context = useProvidingPosts(mockLoader);

    expect(context.loading.value).toBe(true);

    await nextTick();
    await nextTick();

    expect(mockLoader).toHaveBeenCalled();
    expect(context.posts.value).toEqual(mockPosts);
    expect(context.loading.value).toBe(false);
  });

  it('should filter posts by search term', async () => {
    const context = useProvidingPosts(mockLoader);
    await nextTick();

    context.filters.search = 'Vue';
    await nextTick();

    expect(context.filteredPosts.value).toHaveLength(2);
    expect(context.filteredPosts.value.map(p => p.title)).toEqual([
      'Vue.js Best Practices',
      'React vs Vue',
    ]);
  });

  it('should filter posts by tags', async () => {
    const context = useProvidingPosts(mockLoader);
    await nextTick();

    context.filters.tags.add('javascript');
    await nextTick();

    expect(context.filteredPosts.value).toHaveLength(2);
    expect(context.filteredPosts.value.map(p => p.title)).toEqual([
      'Vue.js Best Practices',
      'TypeScript Tips',
    ]);
  });

  it('should filter posts by multiple tags', async () => {
    const context = useProvidingPosts(mockLoader);
    await nextTick();

    context.filters.tags.add('vue');
    context.filters.tags.add('javascript');
    await nextTick();

    expect(context.filteredPosts.value).toHaveLength(1);
    expect(context.filteredPosts.value[0].title).toBe('Vue.js Best Practices');
  });

  it('should combine search and tag filters', async () => {
    const context = useProvidingPosts(mockLoader);
    await nextTick();

    context.filters.search = 'Vue';
    context.filters.tags.add('comparison');
    await nextTick();

    expect(context.filteredPosts.value).toHaveLength(1);
    expect(context.filteredPosts.value[0].title).toBe('React vs Vue');
  });

  it('should toggle tags correctly', async () => {
    const context = useProvidingPosts(mockLoader);
    await nextTick();

    expect(context.isTagActive('vue')).toBe(false);

    context.toggleTag('vue');
    expect(context.isTagActive('vue')).toBe(true);

    context.toggleTag('vue');
    expect(context.isTagActive('vue')).toBe(false);
  });

  it('should return available tags from all posts', async () => {
    const context = useProvidingPosts(mockLoader);

    await nextTick();
    await nextTick();

    const expectedTags = ['vue', 'javascript', 'frontend', 'typescript', 'react', 'comparison'];
    expect(context.availableTags.value.sort()).toEqual(expectedTags.sort());
  });

  it('should detect when filters are active', async () => {
    const context = useProvidingPosts(mockLoader);
    await nextTick();

    expect(context.filtersActive.value).toBe(false);

    context.filters.search = 'test';
    await nextTick();
    expect(context.filtersActive.value).toBe(true);

    context.filters.search = '';
    context.filters.tags.add('vue');
    await nextTick();
    expect(context.filtersActive.value).toBe(true);
  });

  it('should reset filters', async () => {
    const context = useProvidingPosts(mockLoader);
    await nextTick();

    context.filters.search = 'test';
    context.filters.tags.add('vue');
    context.filters.tags.add('javascript');

    context.resetFilters();

    expect(context.filters.search).toBe('');
    expect(context.filters.tags.size).toBe(0);
    expect(context.filtersActive.value).toBe(false);
  });

  it('should handle loading errors', async () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    const errorLoader = vi.fn().mockRejectedValue(new Error('Failed to load'));

    const context = useProvidingPosts(errorLoader);
    await nextTick();
    await nextTick();

    expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to load posts:', expect.any(Error));
    expect(context.loading.value).toBe(false);
    expect(context.posts.value).toEqual([]);

    consoleErrorSpy.mockRestore();
  });

  it('should allow manual reload of posts', async () => {
    const context = useProvidingPosts(mockLoader);
    await nextTick();

    mockLoader.mockClear();

    await context.loadPosts();

    expect(mockLoader).toHaveBeenCalled();
  });
});
