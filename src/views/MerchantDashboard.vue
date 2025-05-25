<template>
  <component :is="Navbar" />

  <div class="px-4 py-6 max-w-6xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">商家後台 - {{ restaurantUuid }}</h1>

    <div class="flex gap-4 mb-6">
      <button
        :class="activeTab === 'coupon' ? activeClass : inactiveClass"
        @click="activeTab = 'coupon'"
      >
        優惠券
      </button>
      <button
        :class="activeTab === 'promotion' ? activeClass : inactiveClass"
        @click="activeTab = 'promotion'"
      >
        活動
      </button>
    </div>

    <component
      :is="activeTab === 'coupon' ? MerchantCouponList : MerchantPromotionList"
      v-bind="
        activeTab === 'coupon'
          ? { coupons: dummyCoupons }
          : { promotions: dummyPromotions }
      "
    />
  </div>

  <component :is="Footer" />
</template>

<script setup>
import { ref } from 'vue';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import MerchantCouponList from '@/components/MerchantCouponList.vue';
import MerchantPromotionList from '@/components/MerchantPromotionList.vue';

const { restaurantUuid } = defineProps(['restaurantUuid']);
const activeTab = ref('coupon');
const activeClass = 'bg-blue-600 text-white px-4 py-2 rounded';
const inactiveClass = 'bg-gray-200 text-gray-700 px-4 py-2 rounded';

const dummyCoupons = [
  {
    uuid: 'c1',
    title: '母親節 85 折',
    discount: '8.5折 折價券',
    started_at: '2025-05-01T00:00:00Z',
    ended_at: '2025-05-31T00:00:00Z',
    total: 100,
    description: '限母親節週末使用',
    claimed_count: 42,
    used_count: 18,
  },
  {
    uuid: 'c2',
    title: '滿千折百',
    discount: '100元 折價券',
    started_at: '2025-06-01T00:00:00Z',
    ended_at: '2025-06-30T00:00:00Z',
    total: 200,
    description: '單筆滿 1000 元可用',
    claimed_count: 77,
    used_count: 51,
  },
  {
    uuid: 'c2',
    title: '滿千折百',
    discount: '100元 折價券',
    started_at: '2025-06-01T00:00:00Z',
    ended_at: '2025-06-30T00:00:00Z',
    total: 200,
    description: '單筆滿 1000 元可用',
    claimed_count: 77,
    used_count: 51,
  },
  {
    uuid: 'c2',
    title: '滿千折百',
    discount: '100元 折價券',
    started_at: '2025-06-01T00:00:00Z',
    ended_at: '2025-06-30T00:00:00Z',
    total: 200,
    description: '單筆滿 1000 元可用',
    claimed_count: 77,
    used_count: 51,
  },
];
const dummyPromotions = [
  {
    uuid: 'p1',
    title: '夏日優惠祭',
    description: '全品項 9 折，消暑再加碼！',
    started_at: '2025-07-01T00:00:00Z',
    ended_at: '2025-07-15T00:00:00Z',
    image_url: 'https://picsum.photos/seed/promo1/300/300',
  },
  {
    uuid: 'p2',
    title: '炸雞日 88 折',
    description: '限時三天，炸雞控快衝！',
    started_at: '2025-08-01T00:00:00Z',
    ended_at: '2025-08-03T00:00:00Z',
    image_url: 'https://picsum.photos/seed/promo2/300/300',
  },
  {
    uuid: 'p3',
    title: '會員回饋週',
    description: '',
    started_at: '2025-08-10T00:00:00Z',
    ended_at: '2025-08-17T00:00:00Z',
    image_url: 'https://picsum.photos/seed/promo3/300/300',
  },
  {
    uuid: 'p3',
    title: '會員回饋週',
    description: '',
    started_at: '2025-08-10T00:00:00Z',
    ended_at: '2025-08-17T00:00:00Z',
    image_url: 'https://picsum.photos/seed/promo3/300/300',
  },
  {
    uuid: 'p3',
    title: '會員回饋週',
    description: '',
    started_at: '2025-08-10T00:00:00Z',
    ended_at: '2025-08-17T00:00:00Z',
    image_url: 'https://picsum.photos/seed/promo3/300/300',
  },
];
</script>
