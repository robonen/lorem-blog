<script lang="ts">
export interface CommentProps extends Omit<PostComment, 'text'> {}
</script>

<script setup lang="ts">
import type { PostComment } from '../types';
import { formatDateTime } from '@/shared/utils';

const props = defineProps<CommentProps>();
</script>

<template>
  <div class="flex items-center gap-3">
    <img
      class="w-10 h-10 rounded-full object-cover"
      :src="props.avatar"
      :alt="props.name"
    >
    <div class="flex flex-col">
      <span class="text-sm font-semibold text-gray-900">
        {{ props.name }}</span>
      <p class="text-sm">
        <slot />
      </p>
      <span class="text-xs text-foreground-muted-light">
        {{ formatDateTime(props.created_at) }}</span>
    </div>
  </div>
</template>
