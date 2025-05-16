<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">我的優惠券</h1>

    <div v-if="coupons.length === 0" class="text-center text-gray-400 mt-8">
      目前尚未領取任何優惠券
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <CouponCard
        v-for="coupon in coupons"
        :key="coupon.uuid"
        :coupon="coupon"
        @deleted="onDeleted"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from '../axios'
import CouponCard from '../components/CouponCard.vue'

const coupons = ref([])

const onDeleted = (uuid) => {
  coupons.value = coupons.value.filter(c => c.uuid !== uuid)
}

onMounted(async () => {
  try {
    const res = await axios.get('/userCoupons/')
    coupons.value = res.data
  } catch (err) {
    console.error('載入優惠券失敗', err)
  }
})
</script>
