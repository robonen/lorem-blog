<script setup lang="ts">
import { ref } from 'vue';
import { ArrowIcon, CheckIcon, MagnifyingGlassIcon, PlusIcon } from '@/shared/icons';
import { Badge } from '@/shared/ui/Badge';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { useInjectedPosts } from '../context';

const filtersVisible = ref(false);
const { filters, filtersActive, availableTags, toggleTag, isTagActive, resetFilters } = useInjectedPosts()!;
</script>

<template>
  <div class="bg-surface text-surface-foreground py-6">
    <div class="mx-auto px-2 container" :class="$style.container">
      <h1 class="text-3xl font-bold text-gray-900" :class="$style.title">
        Блог
      </h1>
      <div class="relative" :class="$style.search">
        <Input v-model="filters.search" name="search" placeholder="Поиск" class="pl-8" />
        <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2" aria-hidden="true">
          <MagnifyingGlassIcon class="size-4 text-gray-400" />
        </span>
      </div>
      <div class="flex justify-end gap-2" :class="$style.filters">
        <Button
          v-if="filtersActive"
          variant="ghost"
          class="flex items-center gap-2 text-sm text-primary-dark"
          @click="resetFilters"
        >
          Очистить
        </Button>
        <Button
          variant="ghost"
          class="flex items-center gap-2 text-sm text-foreground-muted"
          @click="filtersVisible = !filtersVisible"
        >
          {{ filtersVisible ? 'Скрыть фильтры' : 'Фильтры' }}
          <ArrowIcon class="size-4 transition-transform" :class="{ 'rotate-180': filtersVisible }" />
        </Button>
      </div>
    </div>
  </div>
  <div v-if="filtersVisible" class="bg-surface text-surface-foreground pb-6">
    <div class="mx-auto px-2 container flex flex-wrap gap-2">
      <Button
        v-for="tag in availableTags"
        :key="tag"
        variant="ghost"
        @click="toggleTag(tag)"
      >
        <Badge :variant="isTagActive(tag) ? 'primary' : 'secondary'" class="flex items-center gap-2">
          {{ tag }}
          <PlusIcon v-if="!isTagActive(tag)" class="size-4" />
          <CheckIcon v-else class="size-4" />
        </Badge>
      </Button>
    </div>
  </div>
</template>

<style module>
.container {
  display: grid;
  grid-template-areas: 'title search filters';
  grid-template-columns: auto 30% 1fr;
  column-gap: calc(var(--spacing) * 10);
  row-gap: calc(var(--spacing) * 2);
}

@media (max-width: 768px) {
  .container {
    grid-template-areas:
      'title filters'
      'search search';
    grid-template-columns: 1fr;
  }
}

.title {
  grid-area: title;
}

.search {
  grid-area: search;
}

.filters {
  grid-area: filters;
}
</style>
