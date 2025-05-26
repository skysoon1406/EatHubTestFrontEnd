<template>
  <div class="relative">
    <!-- 垃圾桶 -->
    <button
      class="absolute top-3 right-3 z-10 bg-white/80 backdrop-blur-sm rounded-full p-1 shadow"
      @click.stop="showConfirm = true"
    >
      <font-awesome-icon
        :icon="['fas', 'trash']"
        class="text-xl text-gray-500 hover:text-red-500"
      />
    </button>

    <!-- 卡片 -->
    <div
      class="flex border border-gray-300 rounded-xl p-6 bg-white text-black hover:shadow-lg cursor-pointer gap-4"
      @click="showQr = true"
    >
      <!-- 圖片區 -->
      <img
        :src="
          coupon.coupon.restaurant?.image_url ||
          'https://via.placeholder.com/96'
        "
        alt="店家圖片"
        class="w-24 h-24 object-cover rounded-md bg-gray-100"
      />

      <!-- 文字區 -->
      <div class="flex-1 flex flex-col justify-between">
        <div class="text-lg font-bold">
          {{ coupon.coupon.restaurant?.name || '（無餐廳名稱）' }}
        </div>
        <div class="text-sm mt-2">優惠方案：{{ discountText }}</div>
        <div class="text-sm">
          有效期限：{{ formatDate(coupon.coupon.ended_at) }}
        </div>
      </div>
    </div>

    <!--  QR Code 彈窗 -->
    <div
      v-if="showQr"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      @click.self="showQr = false"
    >
      <div class="bg-white text-black p-6 rounded-xl text-center w-[280px]">
        <div class="text-lg font-bold mb-4">優惠券 QR Code</div>
        <img
          :src="`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${coupon.uuid}`"
          alt="QR Code"
          class="mx-auto"
        />
        <p class="text-sm mt-3">
          使用期限：{{ formatDate(coupon.coupon.ended_at) }}
        </p>
      </div>
    </div>

    <!--  刪除確認彈窗 -->
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
import { ref, computed } from 'vue';
import axios from '@/axios';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useAlertStore } from '@/stores/alert';

const props = defineProps({
  coupon: Object,
});
const emit = defineEmits(['deleted']);

const showQr = ref(false);
const showConfirm = ref(false);

const formatDate = (str) => {
  if (!str) return '';
  return new Date(str).toLocaleDateString();
};

const discountText = computed(() => {
  const type = props.coupon?.coupon?.discount_type;
  const value = props.coupon?.coupon?.discount_value;
  if (!type || value == null) return '（無折扣資料）';
  return type === 'amount' ? `折價 ${value} 元` : `折扣 ${value} %`;
});

const confirmDelete = async () => {
  try {
    await axios.delete(`/user-coupons/${props.coupon.uuid}`);
    emit('deleted', props.coupon.uuid);
  } catch {
    const alert = useAlertStore();
    alert.trigger('刪除失敗請稍後再試', 'error');
  } finally {
    showConfirm.value = false;
  }
};
</script>
