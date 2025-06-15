<script lang="ts">
import type { TextareaHTMLAttributes } from 'vue';

export interface InputProps {
  name: TextareaHTMLAttributes['name'];
}
</script>

<script setup lang="ts">
import { useTemplateRef, watch } from 'vue';
import { useTextAreaAutosize } from '@/shared/composables';
import { XIcon } from '@/shared/icons';
import { Button } from '../Button';

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<InputProps>();
const model = defineModel<string>();

const textarea = useTemplateRef('textarea');

const { resize } = useTextAreaAutosize(textarea);
watch(model, resize);

function clear() {
  model.value = '';
}
</script>

<template>
  <div class="relative w-full">
    <Button
      v-if="model?.length"
      variant="ghost"
      class="absolute top-2 right-1 text-foreground-muted"
      @click="clear"
    >
      <XIcon class="size-5" />
      <span class="sr-only">Очистить</span>
    </Button>
    <textarea
      ref="textarea"
      v-model="model"
      class="w-full pl-4 pr-6 py-2 resize-none text-sm rounded border border-gray-200 outline-primary"
      v-bind="{ ...$attrs, ...props }"
    />
  </div>
</template>
