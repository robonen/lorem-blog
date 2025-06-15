<script lang="ts">
export interface PostTitleProps {
  as?: keyof HTMLElementTagNameMap;
}
</script>

<script setup lang="ts">
const { as: tag = 'h1' } = defineProps<PostTitleProps>();
</script>

<template>
  <component :is="tag" class="text-xl font-semibold">
    <slot />
  </component>
</template>
