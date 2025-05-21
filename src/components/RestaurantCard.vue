<template>
  <div class="card shadow-md p-4 flex flex-col sm:flex-row gap-4">
    <div class="w-full sm:w-32 h-32 flex-shrink-0">
      <img
        :src="restaurant.imageUrl"
        alt=""
        class="w-full h-full object-cover rounded"
      />
    </div>

    <div class="flex flex-col justify-between w-full">
      <router-link :to="`/restaurants/${restaurant.uuid}`">
        <h4 class="text-lg font-semibold line-clamp-1" :title="restaurant.name">
          {{ restaurant.name }}
        </h4>
      </router-link>
      <p class="text-sm text-gray-600 line-clamp-2">
        {{ restaurant.address }}
      </p>
      <p class="text-sm">⭐️ 評分：{{ restaurant.googleRating }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  restaurant: {
    type: Object,
    required: true,
  },
});
</script>
