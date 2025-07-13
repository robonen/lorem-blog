<script setup lang="ts">
import type { ButtonProps } from './types';
import { computed } from 'vue';
import { buttonSizes, buttonVariants } from './types';

const props = withDefaults(defineProps<ButtonProps>(), {
  variant: 'primary',
  size: 'base',
  type: 'button',
});

const styles = computed(() => [
  buttonVariants[props.variant],
  buttonSizes[props.size],
]);
</script>

<template>
  <button class="rounded cursor-pointer transition-colors" :class="styles" :type="props.type">
    <slot />
  </button>
</template>
