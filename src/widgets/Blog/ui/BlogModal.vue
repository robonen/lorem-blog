<script setup lang="ts">
import { computed, ref } from 'vue';
import Comment from '@/entities/Comment/ui/Comment.vue';
import { PostMeta, PostTitle } from '@/entities/Post';
import { useBodyScrollLock } from '@/shared/composables';
import { XIcon } from '@/shared/icons';
import { Badge } from '@/shared/ui/Badge';
import { Button } from '@/shared/ui/Button';
import { Textarea } from '@/shared/ui/Textarea';
import { useInjectedPosts } from '../context';

const { selectedPost } = useInjectedPosts()!;

const visible = computed({
  get: () => !!selectedPost.value,
  set: (value) => {
    if (!value)
      selectedPost.value = null;
  },
});

useBodyScrollLock(visible);

const MAX_COMMENT_LENGTH = 250;

const comment = ref<string>('');
const commentLength = computed(() => comment.value.length);
const isCommentValid = computed(() => commentLength.value <= MAX_COMMENT_LENGTH);

function clearComment() {
  comment.value = '';
}
</script>

<template>
  <Teleport v-if="visible" to="#teleports">
    <div class="fixed inset-0 bg-black/50 modal-backdrop" />
    <div class="fixed inset-0 flex" @click.self="visible = false">
      <div class="p-4 max-h-screen md:max-h-[98vh] w-full md:max-w-2xl md:m-auto md:rounded-lg overflow-auto flex flex-col gap-4 bg-surface text-surface-foreground relative">
        <Button
          variant="ghost"
          class="absolute top-4 right-4"
          @click="visible = false"
        >
          <XIcon class="size-5" />
          <span class="sr-only">Закрыть</span>
        </Button>
        <div class="flex flex-col gap-2">
          <PostTitle>
            {{ selectedPost!.title }}
          </PostTitle>
          <PostMeta
            :created-at="selectedPost!.created_at"
            :content="selectedPost!.content_full"
            :comments-length="selectedPost!.comments.length"
          />
        </div>
        <img
          class="h-full aspect-video object-cover rounded-lg"
          :src="selectedPost!.cover"
          :alt="selectedPost!.title"
        >
        <div class="flex flex-col gap-2">
          <p>
            {{ selectedPost!.content_full }}
          </p>
          <div class="flex gap-2">
            <Badge v-for="tag in selectedPost!.tags" :key="tag">
              {{ tag }}
            </Badge>
          </div>
        </div>
        <div class="flex flex-col gap-2">
          <div>
            <h2 class="inline font-semibold text-gray-900">
              Комментариев
            </h2>
            <span class="text-foreground-muted">{{ selectedPost!.comments.length }}</span>
          </div>
          <div>
            <Textarea
              v-model="comment"
              name="comment"
              placeholder="Введите комментарий"
              :class="{ 'border-danger! outline-danger!': !isCommentValid }"
            />
            <span v-if="commentLength > 0" class="text-xs text-foreground-muted">
              <span :class="{ 'text-danger': !isCommentValid }">
                {{ commentLength }}
              </span>
              из {{ MAX_COMMENT_LENGTH }} символов
            </span>
            <div v-if="commentLength > 0" class="flex justify-end gap-2">
              <Button variant="secondary" @click="clearComment">
                Отмена
              </Button>
              <Button :disabled="!isCommentValid">
                Опубликовать
              </Button>
            </div>
          </div>
          <div class="mt-2 flex flex-col gap-4">
            <Comment
              v-for="postComment in selectedPost!.comments"
              :id="postComment.id"
              :key="postComment.id"
              :name="postComment.name"
              :avatar="postComment.avatar"
              :created_at="postComment.created_at"
            >
              {{ postComment.text }}
            </Comment>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
