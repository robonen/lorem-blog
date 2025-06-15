<script lang="ts">
import type { InputHTMLAttributes } from 'vue';
import { XIcon } from '@/shared/icons';
import { Button } from '../Button';

export interface InputProps {
  name: InputHTMLAttributes['name'];
  placeholder?: InputHTMLAttributes['placeholder'];
  type?: InputHTMLAttributes['type'];
}
</script>

<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
});

const model = defineModel<string>();

function clear() {
  model.value = '';
}
</script>

<template>
  <div class="w-full relative">
    <Button
      v-if="model?.length"
      variant="ghost"
      class="absolute top-2 right-1 text-foreground-muted"
      @click="clear"
    >
      <XIcon class="size-5" />
      <span class="sr-only">Очистить</span>
    </Button>
    <input
      v-model="model"
      class="w-full p-2 pr-5 bg-gray-100 placeholder-gray-400 text-sm rounded outline-primary"
      v-bind="{ ...$attrs, ...props }"
    >
  </div>
</template>
