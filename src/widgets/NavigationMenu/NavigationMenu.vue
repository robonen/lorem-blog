<script lang="ts">
import type { NavigationMenuItem } from './types';

export interface NavigationMenuProps {
  items: NavigationMenuItem[];
}
</script>

<script setup lang="ts">
import { RouterLink } from 'vue-router';

const { items } = defineProps<NavigationMenuProps>();
</script>

<template>
  <ul class="flex items-center space-x-4">
    <li v-for="item in items" :key="item.name">
      <slot :item>
        <RouterLink
          class="p-2 rounded-md text-sm font-semibold transition-colors"
          active-class="text-primary bg-primary/10"
          :to="item.path"
        >
          {{ item.name }}
        </RouterLink>
      </slot>
    </li>
  </ul>
</template>
