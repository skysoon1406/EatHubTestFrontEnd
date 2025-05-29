<template>
  <div class=" max-w-3xl w-full mx-auto p-6 ">

  </div>

</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from '@/axios';


const route = useRoute()
const router = useRouter()
const coupon = ref({})

const fetchCoupon = async () => {
  try {
    const res = await axios.get(`/coupons/${route.params.uuid}/`)
    console.log('API 回傳結果：', res.data)
    coupon.value = res.data.result
  } catch (err) {
    console.error('取得優惠券失敗', err)
  }
}



onMounted(() => {
  fetchCoupon()
})
</script>