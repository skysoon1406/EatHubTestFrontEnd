<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
    <merchant-promotion-card
      v-for="promotion in promotions"
      :key="promotion.uuid"
      :promotion="promotion"
      @deleted="refresh"
    />
  </div>
</template>

<script setup>
import MerchantPromotionCard from './MerchantPromotionCard.vue';

const props = defineProps({
  promotions: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(['refresh']);

const refresh = () => {
  emit('refresh');
};
</script>
