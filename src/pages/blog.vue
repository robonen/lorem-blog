<script setup lang="ts">
import { BlogHeader, BlogList, useProvidingPosts } from '@/widgets/Blog';

useProvidingPosts(() => fetch('/posts.json').then((response) => {
  if (!response.ok) {
    throw new Error('Failed to fetch posts');
  }

  return response.json();
}));
</script>

<template>
  <BlogHeader />
  <BlogList />
</template>
