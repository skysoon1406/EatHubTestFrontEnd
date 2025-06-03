<script setup>
import { onMounted } from 'vue';
import api from '@/axios';
import '@/assets/styles/app.css';
import AlertCenter from '@/components/AlertCenter.vue';

onMounted(async () => {
  try {
    await api.get('/auth/csrf');
  } catch {}
});
</script>

<!-- src/App.vue -->
<template>
  <router-view />
  <alert-center />
</template>

<style scoped></style>
