<template>
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
    <merchant-coupon-card
      v-for="coupon in localCoupons"
      :key="coupon.uuid"
      :coupon="coupon"
      @deleted="removeCoupon"
    />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import MerchantCouponCard from './MerchantCouponCard.vue';

const props = defineProps({
  coupons: {
    type: Array,
    required: true,
  },
});

// 為了能在列表中做刪除操作，用 local 副本處理
const localCoupons = ref([...props.coupons]);

// 若父層 props coupons 有更新，自動同步
watch(
  () => props.coupons,
  (newVal) => {
    localCoupons.value = [...newVal];
  }
);

// 刪除指定優惠券
const removeCoupon = (uuid) => {
  localCoupons.value = localCoupons.value.filter((c) => c.uuid !== uuid);
};
</script>
