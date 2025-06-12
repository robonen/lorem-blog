<script setup lang="ts">
import { Logo } from '@/shared/icons';
import { NavigationMenu, type NavigationMenuItem } from '../NavigationMenu';

const items = [
  { name: 'Главная', path: '/' },
  { name: 'Блог', path: '/blog' },
] satisfies NavigationMenuItem[];
</script>

<template>
  <header class="p-4 dark bg-background text-foreground">
    <div class="mx-auto container flex space-x-18">
      <Logo class="h-6" aria-label="Logo" />
      <NavigationMenu :items />
    </div>
  </header>
</template>
