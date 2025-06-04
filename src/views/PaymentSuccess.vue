<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4">
    <div class="max-w-md w-full bg-white rounded-2xl shadow-xl p-6 text-center">
      <div v-if="isLoading" class="animate-pulse text-gray-500">
        載入付款資訊中...
      </div>

      <div v-else-if="isSuccess && orderData">
        <h2 class="text-2xl font-bold text-green-600 mb-2">付款成功 🎉</h2>
        <p class="text-gray-700">感謝您升級為 VIP 商家！</p>
        <div class="mt-4 text-sm text-gray-600">
          訂單編號：<span class="font-mono">{{ orderData.orderId }}</span>
        </div>
        <button
          @click="goHome"
          class="mt-6 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow transition"
        >
          返回首頁
        </button>
      </div>

      <div v-else class="text-red-600">
        <h2 class="text-xl font-bold mb-2">付款資訊異常</h2>
        <p>{{ errorMsg }}</p>
      </div>
    </div>
  </div>
</template>