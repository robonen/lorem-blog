<script setup lang="ts">
import type { NavigationMenuProps } from './types';
import { RouterLink } from 'vue-router';

const { items } = defineProps<NavigationMenuProps>();
</script>

<template>
  <nav>
    <ul class="flex items-center space-x-4">
      <li v-for="item in items" :key="item.name">
        <slot :item>
          <RouterLink
            class="p-2 rounded-md font-semibold transition-colors"
            active-class="text-primary bg-primary/10"
            :to="item.path"
          >
            {{ item.name }}
          </RouterLink>
        </slot>
      </li>
    </ul>
  </nav>
</template>
