<script lang="ts">
export interface PostMetaProps {
  /**
   * Post creation date in ISO format.
   */
  createdAt: string;

  /**
   * Post content.
   */
  content: string;

  /**
   * Post comments length.
   */
  commentsLength: number;
}
</script>

<script setup lang="ts">
import { computed } from 'vue';
import { ChatIcon, ClockIcon } from '@/shared/icons';
import { calculateReadingTime, formatDate, pluralize } from '@/shared/utils';

const { createdAt, content, commentsLength } = defineProps<PostMetaProps>();

const readingTime = computed(() => calculateReadingTime(content));
const formattedDate = computed(() => formatDate(createdAt));
const formattedComments = computed(() => pluralize(commentsLength, ['комментарий', 'комментария', 'комментариев']));
</script>

<template>
  <ul class="flex items-center gap-x-4 text-foreground-muted text-sm">
    <li class="flex items-center gap-x-1" aria-label="Дата публикации">
      {{ formattedDate }}
    </li>
    <span class="size-1 rounded-full bg-foreground-muted" aria-hidden="true" />
    <li class="flex items-center gap-x-1" aria-label="Длительность чтения">
      <ClockIcon class="size-5" />
      {{ readingTime }} мин
    </li>
    <span class="size-1 rounded-full bg-foreground-muted" aria-hidden="true" />
    <li class="flex items-center gap-x-1" aria-label="Количество комментариев">
      <ChatIcon class="size-5" />
      {{ commentsLength }} {{ formattedComments }}
    </li>
  </ul>
</template>
