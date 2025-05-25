<template>
  <div class="relative">
    <!-- 刪除按鈕 -->
    <button
      class="absolute top-3 right-3 z-10 bg-white/80 backdrop-blur-sm rounded-full p-1 shadow"
      @click.stop="showConfirm = true"
    >
      <font-awesome-icon
        :icon="['fas', 'trash']"
        class="text-xl text-gray-500 hover:text-red-500"
      />
    </button>

    <!-- 卡片內容 -->
    <router-link :to="`/merchant/coupons/${coupon.uuid}`">
      <div
        class="border border-gray-300 rounded-xl p-6 bg-white text-black hover:shadow-lg"
      >
        <div class="text-lg font-bold">{{ coupon.title }}</div>
        <div class="text-sm mt-1 text-gray-600">
          優惠內容：{{ coupon.discount }}
        </div>
        <div class="text-sm text-gray-600">
          有效期限：{{ formatDate(coupon.ended_at) }}
        </div>

        <div class="text-sm text-gray-600 mt-2">
          發行數量：{{ coupon.total ?? '未設定' }} 張
        </div>
        <div class="text-sm text-gray-600">
          已領取：{{ coupon.claimed_count }} 張 ・已使用：{{
            coupon.used_count
          }}
          張
        </div>
      </div>
    </router-link>

    <!-- 刪除確認彈窗 -->
    <div
      v-if="showConfirm"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      @click.self="showConfirm = false"
    >
      <div class="bg-white text-black p-6 rounded-xl text-center w-[260px]">
        <div class="text-xl font-bold mb-4">確認刪除？</div>
        <font-awesome-icon
          :icon="['fas', 'trash']"
          class="text-6xl text-gray-500 mb-4"
        />
        <div class="flex justify-center gap-4">
          <button
            class="border border-black text-black px-4 py-1 rounded"
            @click="showConfirm = false"
          >
            取消
          </button>
          <button
            class="bg-black text-white px-4 py-1 rounded"
            @click="confirmDelete"
          >
            確認刪除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from '@/axios';

const props = defineProps({
  coupon: Object,
});
const emit = defineEmits(['deleted']);

const showConfirm = ref(false);

const formatDate = (str) => {
  if (!str) return '';
  return new Date(str).toLocaleDateString();
};

const confirmDelete = async () => {
  try {
    await axios.delete(`/merchant/coupons/${props.coupon.uuid}`);
    emit('deleted', props.coupon.uuid);
  } catch {
    alert('刪除失敗，請稍後再試');
  } finally {
    showConfirm.value = false;
  }
};
</script>

<style scoped></style>
