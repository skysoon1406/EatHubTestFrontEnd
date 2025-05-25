<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
    <merchant-promotion-card
      v-for="promotion in localPromotions"
      :key="promotion.uuid"
      :promotion="promotion"
      @deleted="removePromotion"
    />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import MerchantPromotionCard from './MerchantPromotionCard.vue';

const props = defineProps({
  promotions: {
    type: Array,
    required: true,
  },
});

const localPromotions = ref([...props.promotions]);

watch(
  () => props.promotions,
  (newVal) => {
    localPromotions.value = [...newVal];
  }
);

const removePromotion = (uuid) => {
  localPromotions.value = localPromotions.value.filter((p) => p.uuid !== uuid);
};
</script>
