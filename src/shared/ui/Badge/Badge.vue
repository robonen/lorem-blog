<script lang="ts">
import type { BadgeVariant } from './types';
import { badgeVariants } from './types';

export interface BadgeProps {
  variant?: BadgeVariant;
}
</script>

<script setup lang="ts">
const props = withDefaults(defineProps<BadgeProps>(), {
  variant: 'secondary',
});
</script>

<template>
  <span class="px-3 py-1 text-xs font-semibold rounded-full transition-colors" :class="badgeVariants[props.variant]">
    <slot />
  </span>
</template>
