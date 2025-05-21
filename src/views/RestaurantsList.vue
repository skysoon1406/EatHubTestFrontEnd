<template>
  <Navbar></Navbar>
  <div class="bg-white">
      <div class="flex justify-center items-center mx-auto py-8">
          <h1 class="text-2xl text-black ml-2">為您推薦</h1>
        </div>
      <section class="px-4 sm:px-0">
          <ul class="mx-6 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 place-items-center p-0 list-none">
            <li
              v-for="r in topTenRestaurants"
              :key="r.placeId"
              class="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl"
            >
            
            <RestaurantCard :restaurant="r" />
              <!-- <router-link :to="`/restaurants/${r.placeId}`" class="flex flex-row gap-4 w-full items-start">
                
                <div class="flex flex-col flex-1">
                  <div class="flex flex-row justify-between items-center">
                    <p class="inline-block  whitespace-nowrap truncate max-w-[8em] sm:max-w-[10em] md:max-w-[12em] font-bold text-black text-xs sm:text-base ">{{ r.name }}</p>
                  </div>
                  <p class="text-black text-xs sm:text-base">⭐ {{ r.googleRating }}</p>
                  <p class="inline-block truncate whitespace-nowrap  max-w-[8em] sm:max-w-[11em] md:max-w-[13em]  text-black text-xs sm:text-base ">{{ r.address }}</p>
                </div>
              </router-link> --> 
            </li>
          </ul>

    </section>
  </div>
<Footer></Footer>

</template>

<script setup>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import RestaurantCard from '@/components/RestaurantCard.vue'; 
import { ref, onMounted, computed } from 'vue';
import { useRestaurantStore } from '@/stores/restaurant';

const store = useRestaurantStore();
const topTenRestaurants = computed(() => store.restaurants.slice(0, 12));

// const restaurants = ref([
//   {
//     image: 'https://hips.hearstapps.com/hmg-prod/images/1-1525230190.jpg',
//     name: '王媽媽手作古早味',
//     rating: 4.5,
//     address: '新北市板橋區文化路一段100號之6，頂樓B室',
//   },
//   {
//     image:
//       'https://www.xianlaoman.com.tw/upload/products/20231101194532y2hnf.jpg',
//     name: '老王牛肉麵',
//     rating: 4.7,
//     address: '台北市大安區信義路三段100號',
//   },
//   {
//     image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38',
//     name: '阿強排骨飯',
//     rating: 4.6,
//     address: '台北市中山區南京東路三段88號',
//   },
//   {
//     image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe',
//     name: '小林臭豆腐',
//     rating: 4.3,
//     address: '新北市板橋區中山路二段222號',
//   },
//   {
//     image: 'https://images.unsplash.com/photo-1570197781559-4e8e54b1c9cd',
//     name: '大戶屋日式定食',
//     rating: 4.8,
//     address: '台中市西區美村路一段123號',
//   },
// ]);
</script>

<style scoped>
.card {
  border-radius: 12px;
  padding: 16px;
  background-color: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  gap: 20px;
}

.card:hover {
  transform: scale(1.05);
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.25);
}

p {
  display: inline;
  text-align: left;
  line-height: 36px;
}

</style>
