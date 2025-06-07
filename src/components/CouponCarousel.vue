<template>
  <!-- 外層限制輪播寬度與 overflow -->
  <div class="overflow-hidden">
    <div
      class="flex transition-transform duration-500"
      :style="`transform: translateX(-${currentIndex * 100}%);`"
    >
      
      <div
        v-for="(coupon, index) in coupons"
        :key="coupon.uuid"
        class="w-full flex-shrink-0 mt-4 "
      >
        <div class="bg-gray-100 rounded-lg p-4">
         

          <!-- 詳細內容 -->
          <h4 class="text-base md:text-xl font-bold mb-2">優惠券詳細資訊</h4>
          <div class="space-y-2 text-sm">
            <div>
              <span class="text-gray-500 text-base md:text-lg">標題：</span>
              <span class="font-medium text-base md:text-lg">{{ coupon.title }}</span>
            </div>
            <div>
              <span class="text-gray-500 text-base md:text-lg">折扣：</span>
              <span class="font-medium text-red-500 text-base md:text-lg">{{
                coupon.discount
              }}</span>
            </div>
            <div>
              <span class="text-gray-500 text-base md:text-lg">期間：</span>
              <span class="font-medium text-base md:text-lg">
                {{ formatDate(coupon.startedAt) }} ~
                {{ formatDate(coupon.endedAt) }}
              </span>
            </div>
            <div v-if="coupon.description">
              <span class="text-gray-500 text-base md:text-lg">使用說明：</span>
              <p class="text-gray-700 text-base md:text-lg mb-4">{{ coupon.description }}</p>
            </div>
          </div>

         
          <button
            @click="claimCoupon(coupon.uuid)"
            :class="[
              'btn w-full rounded-lg mb-2 border transition-colors duration-300 text-base md:text-lg cursor-pointer ',
              claimedLocal[coupon.uuid]
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed text-base md:text-lg'
                : 'bg-primary text-white hover:bg-neutral text-base md:text-lg',
            ]"
            :disabled="claimedLocal[coupon.uuid]"
          >
            <font-awesome-icon :icon="['fas', 'ticket-alt']" class="mr-2 " />
            {{ claimedLocal[coupon.uuid] ? '已領取' : '領取優惠券' }}
          </button>

        </div>
      </div>
    </div>
  </div>

  <!-- 點點控制器 -->
  <div v-if="coupons.length > 1" class="flex justify-center mt-3 space-x-2 ">
    <button
      v-for="(dot, index) in coupons.length"
      :key="index"
      class="w-3 h-3 rounded-full"
      :class="currentIndex === index ? 'bg-black' : 'bg-gray-300'"
      @click="goToSlide(index)"
    ></button>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, reactive } from 'vue';
import axios from '@/axios';

const props = defineProps({
  coupons: { type: Array, required: true },
  claimedStatus: { type: Object, default: () => ({}) },
});

const currentIndex = ref(0);
const isAnimating = ref(false);
let intervalId = null;

const claimedLocal = reactive({});

const nextSlide = () => {
  if (isAnimating.value || props.coupons.length === 0) return;
  isAnimating.value = true;
  currentIndex.value = (currentIndex.value + 1) % props.coupons.length;
  setTimeout(() => {
    isAnimating.value = false;
  }, 500);
};

const goToSlide = (index) => {
  if (isAnimating.value || index === currentIndex.value) return;
  isAnimating.value = true;
  currentIndex.value = index;
  setTimeout(() => {
    isAnimating.value = false;
  }, 500);
};

const claimCoupon = async (uuid) => {
  if (claimedLocal[uuid]) return;

  try {
    await axios.post(`/coupons/${uuid}/claim/`);
    claimedLocal[uuid] = true;
    alert('優惠券領取成功');
  } catch (error) {
    const message = error.response?.data?.message || '請稍後再試';
    alert(`領取優惠券失敗：${message}`);
  }
};

onMounted(() => {
  intervalId = setInterval(nextSlide, 10000);
  props.coupons.forEach((c) => {
    claimedLocal[c.uuid] = props.claimedStatus[c.uuid] || false;
  });
});

onUnmounted(() => {
  clearInterval(intervalId);
});

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString();
}
</script>