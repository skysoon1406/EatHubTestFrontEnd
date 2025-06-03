<template>
  <div class="fixed inset-0  bg-[rgba(0,0,0,0.9)]  z-50 flex justify-center items-center">
    <div class="bg-white p-6 rounded-lg shadow-md max-w-md w-full">

      <!-- 升級訊息 -->
      <div v-if="message" class="mb-4 text-sm text-orange-600 bg-orange-100 p-2 rounded">
        ⚠️ {{ message }}
      </div>


      <!-- 升級固定說明 -->
      <div class="mb-4 text-sm text-gray-700 flex items-center gap-2">
        <font-awesome-icon :icon="['fa-solid', 'fa-crown']" class="text-yellow-500" />
        <span>
            <div>升級為 VIP 店家可發佈更多優惠券與動態，享更多專屬權益</div>
            <div>VIP 店家優惠券與動態可各發佈至多 3 則 </div>
        </span>
      </div>


      

      <!-- Tab 切換 -->
      <div class="flex gap-4 mb-4">
        <button
          v-for="plan in plans"
          :key="plan.planType"
          class="btn"
          :class="activePlan === plan.planType ? 'btn-primary' : 'btn-outline'"
          @click="activePlan = plan.planType"
        >
          {{ plan.planType === 'monthly' ? '按月付款' : '按年付款' }}
        </button>
      </div>

      <!-- 價格顯示 -->
      <div class="mb-2 text-sm">
        價格：
        <template v-if="currentPlan">
          NT${{ currentPlan.amount }}
        </template>
        <template v-else>
          <span class="text-gray-500">目前尚未開放購買方案，請稍後再試。</span>
        </template>
      </div>

      <!-- 關閉按鈕 -->
      <div class="mt-6 text-right">
        <button class="btn btn-sm" @click="$emit('close')">關閉</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from '@/axios'

// 傳入 props
defineProps({ message: String })

// 狀態管理
const activePlan = ref('monthly')
const plans = ref([])

// 動態計算目前方案
const currentPlan = computed(() =>
  plans.value.find(p => p.planType === activePlan.value)
)

onMounted(async () => {

    const res = await axios.get('/payments/products/')
    plans.value = res.data

})
</script>
