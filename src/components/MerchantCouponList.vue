<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
    <merchant-coupon-card
      v-for="coupon in coupons"
      :key="coupon.uuid"
      :coupon="coupon"
      @deleted="refresh"
    />
  </div>
</template>

<script setup>
import MerchantCouponCard from './MerchantCouponCard.vue';

const props = defineProps({
  coupons: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(['refresh']);

const refresh = () => {
  emit('refresh');
};
</script>
