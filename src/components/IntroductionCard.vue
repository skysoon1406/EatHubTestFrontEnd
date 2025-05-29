<template>
  <div class="bg-secondary py-12 px-6">
    <h2 class="text-2xl font-bold text-center text-primary mb-4">功能介紹</h2>
    <p class="text-center text-neutral mb-6">探索 EatHub 為你準備的強大功能</p>
    <div
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto"
    >
      <div
        v-for="(feature, index) in features"
        :key="index"
        class="bg-white rounded-xl shadow-md overflow-hidden text-neutral w-full max-w-sm mx-auto"
      >
        <img
          :src="feature.img"
          alt="功能圖片"
          class="w-full h-48 object-cover"
        />
        <div class="p-4 space-y-2">
          <h3 class="text-lg font-bold text-primary">{{ feature.title }}</h3>
          <p class="text-sm">{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import card01 from '@/assets/images/home_card01.png';
import card02 from '@/assets/images/home_card02.png';
import card03 from '@/assets/images/home_card03.png';
import card04 from '@/assets/images/home_card04.png';

const features = [
  {
    title: '智慧推薦在地美食',
    description:
      '整合 Google Map API 和 Open AI 的 API 進行智慧推薦，讓使用者輕鬆找到在地適合美食！',
    img: card01,
  },
  {
    title: '收藏和瀏覽餐廳紀錄',
    description:
      '使用者可以蒐藏並記錄瀏覽過的推薦美食餐廳，不用煩惱下一餐吃什麼，治癒你的選擇性障礙！',
    img: card02,
  },
  {
    title: '導航餐廳和評論分享',
    description:
      '透過一鍵式導航，可以直接導航享受美食，同時留下評論，紀錄和分享美食心得！',
    img: card03,
  },
  {
    title: '商家動態和優惠行銷',
    description:
      '提供後台讓商家可以上傳優惠券和商家動態，帶來整合行銷功效，吸引來客數量。',
    img: card04,
  },
];
</script>
