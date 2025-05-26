<template>
  <Navbar></Navbar>
  <div class="bg-white">
    <div class="flex justify-center items-center mx-auto py-8">
      <h1 class="text-2xl text-black ml-2">為您推薦</h1>
    </div>
    <section class="px-4 sm:px-0">
      <ul
        class="mx-6 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 place-items-center p-0 list-none"
      >
        <li
          v-for="r in topTenRestaurants"
          :key="r.placeId"
          class="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl"
        >
          <RestaurantCard
            :restaurant="r"
            @click="handleRecentViewedRestaurant(r)"
          />
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

const handleRecentViewedRestaurant = (r) => {
  store.setRecentViewedRestaurant(r);
};
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
  transition:
    transform 0.2s ease-in-out,
    box-shadow 0.2s ease-in-out;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.25);
}

p {
  display: inline;
  text-align: left;
  line-height: 36px;
}
</style>
