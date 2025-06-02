<template>
  <div class="modal bg-white p-6 rounded-lg shadow-md">
    <!-- Optional message -->
    <div v-if="message" class="mb-4 text-sm text-orange-600 bg-orange-100 p-2 rounded">
      ⚠️ {{ message }}
    </div>

    <!-- Tab switch -->
    <div class="flex gap-4 mb-4">
      <button
        v-for="plan in plans"
        :key="plan.plan_type"
        :class="activePlan === plan.plan_type ? 'btn-primary' : 'btn-outline'"
        @click="activePlan = plan.plan_type"
      >
        {{ plan.plan_type === 'monthly' ? '按月付款' : '按年付款' }}
      </button>
    </div>

    <!-- Content from backend -->
    <div v-if="currentPlan">
      <p class="text-sm mb-2">價格：NT${{ currentPlan.amount }}</p>
      <div class="flex gap-3">
        <button class="btn btn-success" @click="pay('linepay')">LINEPAY</button>
        <button class="btn btn-outline" @click="pay('ecpay')">綠界支付</button>
      </div>
    </div>
  </div>
</template>