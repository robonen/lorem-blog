<script setup lang="ts">
import { PostContent, PostMeta, PostTitle } from '@/entities/Post';
import { SearchListIcon } from '@/shared/icons';
import { Badge } from '@/shared/ui/Badge';
import { Button } from '@/shared/ui/Button';
import { useInjectedPosts } from '../context';
import BlogModal from './BlogModal.vue';

const { loading, filteredPosts, selectedPost } = useInjectedPosts()!;
</script>

<template>
  <BlogModal />
  <div
    v-if="filteredPosts.length > 0"
    class="mx-auto container mt-4 p-4 md:p-7 bg-surface text-surface-foreground rounded-lg grid md:grid-cols-2 xl:grid-cols-3 gap-x-5 gap-y-10"
  >
    <Button
      v-for="post in filteredPosts"
      :key="post.id"
      variant="ghost"
      @click="selectedPost = post"
    >
      <figure class="flex flex-col gap-y-2 text-start">
        <img
          class="rounded-lg object-cover aspect-[1.6]"
          :src="post.cover"
          :alt="post.title"
        >
        <figcaption class="contents">
          <PostMeta
            :created-at="post.created_at"
            :content="post.content_full"
            :comments-length="post.comments.length"
          />
          <PostTitle as="h2">
            {{ post.title }}
          </PostTitle>
          <PostContent>
            {{ post.content_short }}
          </PostContent>
          <div class="flex items-center gap-x-2">
            <Badge v-for="tag in post.tags" :key="tag">
              {{ tag }}
            </Badge>
          </div>
        </figcaption>
      </figure>
    </Button>
  </div>
  <div v-else-if="!loading" class="container mx-auto mt-4 p-16 bg-surface text-surface-foreground rounded-lg">
    <SearchListIcon class="mx-auto size-12 text-gray-400" />
    <div class="mx-auto max-w-[300px] text-sm text-center">
      <h2 class="text-foreground-muted font-semibold mt-4">
        Поиск не дал результатов
      </h2>
      <p class="text-foreground-muted-light">
        Повторите поиск или используйте фильтр для структуризации контента
      </p>
    </div>
  </div>
</template>
