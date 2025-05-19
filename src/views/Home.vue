<template>
  <div>
    <Navbar></Navbar>
    <div class="p-6 space-y-4">
      <h1 class="text-2xl font-bold">下一餐吃什麼？</h1>
      <!-- 多選項目 -->
      <div class="space-y-2">
        <label class="font-semibold">口味</label>
        <div class="flex gap-2">
          <input
            type="checkbox"
            value="中式"
            v-model="flavors"
            class="checkbox"
          />
          <span>中式</span>
          <input
            type="checkbox"
            value="日式"
            v-model="flavors"
            class="checkbox"
          />
          <span>日式</span>
        </div>
      </div>

      <div class="space-y-2">
        <label class="font-semibold">主食</label>
        <div class="flex gap-2">
          <input
            type="checkbox"
            value="牛肉"
            v-model="mains"
            class="checkbox"
          />
          <span>牛肉</span>
          <input
            type="checkbox"
            value="豬肉"
            v-model="mains"
            class="checkbox"
          />
          <span>豬肉</span>
        </div>
      </div>

      <div class="space-y-2">
        <label class="font-semibold">類型</label>
        <div class="flex gap-2">
          <input
            type="checkbox"
            value="燉飯"
            v-model="staples"
            class="checkbox"
          />
          <span>燉飯</span>
          <input
            type="checkbox"
            value="火鍋"
            v-model="staples"
            class="checkbox"
          />
          <span>火鍋</span>
        </div>
      </div>

      <!-- 提交按鈕 -->
      <button class="btn btn-primary" @click="getRecommendations">
        推薦我餐廳！
      </button>
    </div>
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-4">推薦結果</h1>
      <div v-if="restaurants.length === 0">尚未有推薦</div>
      <div v-else class="grid gap-4">
        <div
          v-for="r in restaurants"
          :key="r.placeId"
          class="card bg-base-100 shadow-md p-4"
        >
          <router-link :to="`/restaurants/${r.placeId}`">
            <h2 class="text-xl font-semibold">{{ r.name }}</h2>
          </router-link>
          <p>{{ r.address }}</p>
          <p>⭐️ 評分：{{ r.googleRating }}</p>
        </div>
      </div>
      <hr />
      <br />
      <router-link to="/restaurants"
        ><button class="btn btn-primary">看更多</button></router-link
      >
    </div>
    <Footer></Footer>
  </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import axios from 'axios';
import { ref, onMounted, computed } from 'vue';
import { useRestaurantStore } from '@/stores/restaurant';

const latitude = ref(null);
const longitude = ref(null);
const error = ref(null);
const store = useRestaurantStore();
const restaurants = computed(() => store.restaurants.slice(0, 3));

onMounted(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        latitude.value = pos.coords.latitude;
        longitude.value = pos.coords.longitude;
      },
      (err) => {
        error.value = err.message;
      }
    );
  } else {
    error.value = '此瀏覽器不支援 Geolocation';
  }
});

const flavors = ref([]);
const mains = ref([]);
const staples = ref([]);

const getRecommendations = async () => {
  const payload = {
    flavors: flavors.value,
    mains: mains.value,
    staples: staples.value,
    userLocation: {
      latitude: latitude.value,
      longitude: longitude.value,
    },
  };

  try {
    const { data } = await axios.post(
      'http://localhost:8000/api/v1/restaurants/',
      payload
    );
    store.setSelections(payload);
    store.setResults(data.result);
  } catch (err) {
    alert('取得推薦失敗');
  }
};
</script>
