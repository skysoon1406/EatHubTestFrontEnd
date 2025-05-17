<template>
  <!-- 頂部導航欄 -->
  <div
    class="navbar bg-white shadow-sm px-4 py-3 border-b flex justify-between items-center"
  >
    <!-- 左邊 Logo 區 -->
    <div class="flex items-center">
      <a href="/">
        <img src="@/assets/images/logo.png" alt="Logo" class="w-25 h-12 mr-2" />
      </a>
    </div>

    <!-- 右邊 漢堡選單 -->
    <button class="btn btn-ghost btn-circle">
      <font-awesome-icon
        :icon="['fas', 'bars']"
        class="text-3xl text-red-500"
      />
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

defineProps({});
</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
