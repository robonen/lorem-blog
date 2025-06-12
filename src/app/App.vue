<script setup lang="ts">
import { RouterView } from 'vue-router';
import { Header } from '@/widgets/Header';
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <Header />
    <main class="flex-1">
      <RouterView />
    </main>
  </div>
</template>
