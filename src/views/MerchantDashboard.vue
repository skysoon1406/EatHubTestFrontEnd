<template>
  <component :is="Navbar" />

  <div class="px-4 py-6 max-w-6xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">{{ restaurantName }}</h1>

    <!-- Tab 與新增按鈕 -->
    <div class="flex justify-between items-center mb-6">
      <!-- 左側：Tab 切換按鈕 -->
      <div class="flex gap-4">
        <button
          class="btn w-[110px]"
          :class="activeTab === 'coupon' ? 'btn-primary' : 'btn-outline'"
          @click="setTab('coupon')"
        >
          優惠券
        </button>
        <button
          class="btn w-[110px]"
          :class="activeTab === 'promotion' ? 'btn-primary' : 'btn-outline'"
          @click="setTab('promotion')"
        >
          活動
        </button>
      </div>

      <!-- 右側：新增按鈕 -->
      <button
        class="btn btn-accent"
        @click="
          router.push(
            activeTab === 'coupon'
              ? '/merchant/coupons/create'
              : '/merchant/promotions/create'
          )
        "
      >
        新增{{ activeTab === 'coupon' ? '優惠券' : '活動' }}
      </button>
    </div>

    <!-- 清單元件切換 -->
    <component
      :is="activeTab === 'coupon' ? MerchantCouponList : MerchantPromotionList"
      v-bind="activeTab === 'coupon' ? { coupons } : { promotions }"
    />
  </div>

  <component :is="Footer" />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from '@/axios';

import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import MerchantCouponList from '@/components/MerchantCouponList.vue';
import MerchantPromotionList from '@/components/MerchantPromotionList.vue';

const route = useRoute();
const router = useRouter();

const activeTab = ref(route.query.tab === 'promotion' ? 'promotion' : 'coupon');
const setTab = (tab) => {
  activeTab.value = tab;
  router.replace({ query: { ...route.query, tab } });
};

const restaurantName = ref('');
const coupons = ref([]);
const promotions = ref([]);

onMounted(async () => {
  try {
    // const res = await axios.get('/api/v1/merchants/me/');
    // const result = res.data.result;

    // mock 資料測試用
    const result = {
      restaurant: {
        name: '麵屋武藏 本店',
        uuid: '8eb03a32-d421-4c41-a614-fdf0fa9ea651',
      },
      coupons: [
        {
          uuid: 'f234e567-89bc-01de-gh23-456789012345',
          serial_number: 'ABC123XYZ',
          created_at: '2025-05-10T10:00:00Z',
          started_at: '2025-05-15T00:00:00Z',
          ended_at: '2025-05-31T23:59:59Z',
          title: '母親節 85 折',
          description: '限母親節週末使用',
          discount: '8.5折 折價券',
          total: 100,
          redeemed_count: 42,
          used_count: 18,
        },
        {
          uuid: 'b345e678-90cd-12ef-hi34-567890123456',
          serial_number: 'DIS100XYZ',
          created_at: '2025-06-01T09:00:00Z',
          started_at: '2025-06-05T00:00:00Z',
          ended_at: '2025-06-30T23:59:59Z',
          title: '滿千折百',
          description: '單筆滿 1000 元可用',
          discount: '100元 折價券',
          total: 200,
          redeemed_count: 77,
          used_count: 51,
        },
      ],
      promotions: [
        {
          uuid: 'd123e456-78ab-90cd-ef12-345678901234',
          title: '夏日優惠祭',
          description: '全品項 9 折，消暑再加碼！',
          created_at: '2025-07-01T08:00:00Z',
          started_at: '2025-07-01T00:00:00Z',
          ended_at: '2025-07-15T23:59:59Z',
          image_url: 'https://picsum.photos/seed/summer/300/300',
        },
        {
          uuid: 'e234f567-89bc-01de-gh23-456789012345',
          title: '炸雞日 88 折',
          description: '限時三天，炸雞控快衝！',
          created_at: '2025-08-01T12:00:00Z',
          started_at: '2025-08-01T00:00:00Z',
          ended_at: '2025-08-03T23:59:59Z',
          image_url: 'https://picsum.photos/seed/chicken/300/300',
        },
      ],
    };

    restaurantName.value = result.restaurant.name;
    coupons.value = result.coupons;
    promotions.value = result.promotions;
  } catch (err) {
    console.error('取得商家資料失敗:', err);
  }
});
</script>
