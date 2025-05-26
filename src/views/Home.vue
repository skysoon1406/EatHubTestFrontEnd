<template>
  <div>
    <Navbar></Navbar>
    <input type="checkbox" id="my-modal" class="modal-toggle" />
    <div class="modal">
      <div class="modal-box">
        <!-- Tabs -->
        <div role="tablist" class="tabs tabs-bordered mb-4">
          <input
            type="radio"
            name="tab"
            role="tab"
            class="tab"
            aria-label="口味"
            checked
          />
          <div role="tabpanel" class="tab-content p-4">
            <div class="space-y-2">
              <div class="flex gap-4 items-center">
                <label class="flex items-center gap-1">
                  <input
                    type="checkbox"
                    value="中式"
                    v-model="flavors"
                    class="checkbox"
                  />
                  <span>中式</span>
                </label>
                <label class="flex items-center gap-1">
                  <input
                    type="checkbox"
                    value="日式"
                    v-model="flavors"
                    class="checkbox"
                  />
                  <span>日式</span>
                </label>
              </div>
            </div>
          </div>

          <input
            type="radio"
            name="tab"
            role="tab"
            class="tab"
            aria-label="主食"
          />
          <div role="tabpanel" class="tab-content p-4">
            <div class="space-y-2">
              <div class="flex gap-4 items-center">
                <label class="flex items-center gap-1">
                  <input
                    type="checkbox"
                    value="牛肉"
                    v-model="mains"
                    class="checkbox"
                  />
                  <span>牛肉</span>
                </label>
                <label class="flex items-center gap-1">
                  <input
                    type="checkbox"
                    value="豬肉"
                    v-model="mains"
                    class="checkbox"
                  />
                  <span>豬肉</span>
                </label>
              </div>
            </div>
          </div>

          <input
            type="radio"
            name="tab"
            role="tab"
            class="tab"
            aria-label="類型"
          />
          <div role="tabpanel" class="tab-content p-4">
            <div class="space-y-2">
              <div class="flex gap-4 items-center">
                <label class="flex items-center gap-1">
                  <input
                    type="checkbox"
                    value="燉飯"
                    v-model="staples"
                    class="checkbox"
                  />
                  <span>燉飯</span>
                </label>
                <label class="flex items-center gap-1">
                  <input
                    type="checkbox"
                    value="火鍋"
                    v-model="staples"
                    class="checkbox"
                  />
                  <span>火鍋</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-action">
          <label for="my-modal" class="btn">確認</label>
        </div>
      </div>
    </div>

    <input type="checkbox" id="food-modal" class="modal-toggle" />
    <div class="modal">
      <div class="modal-box w-11/12 max-w-2xl">
        <h3 class="font-bold text-lg mb-4">請選擇餐點選項</h3>
      </div>
    </div>

    <div class="p-6 space-y-4 text-center">
      <div class="bg-primary card text-white p-4">
        <h2 class="text-4xl font-bold m-10">下一餐吃什麼？</h2>
        <div class="flex space-x-4">
          <div class="w-1/3 card bg-secondary text-neutral-content">
            <div class="card-body">
              <h2 class="text-center text-xl text-black">口味</h2>
            </div>
          </div>
          <div class="w-1/3 card bg-secondary text-primary-content">
            <div class="card-body">
              <h2 class="text-center text-xl text-black">主食</h2>
            </div>
          </div>
          <div class="w-1/3 card bg-secondary text-secondary-content">
            <div class="card-body">
              <h2 class="text-center text-xl text-black">類型</h2>
            </div>
          </div>
        </div>
        <br />
        <div class="flex justify-end">
          <label for="my-modal" class="btn btn-neutral align-item-end">
            <font-awesome-icon :icon="['fas', 'sliders']" />
          </label>
        </div>
        <br />
        <button class="btn btn-neutral btn-lg" @click="getRecommendations">
          請推薦我美食！
        </button>
      </div>
    </div>
    <div class="p-6 text-center relative">
      <h2 class="text-2xl font-bold mb-4 p-6">
        推薦結果 <span v-if="dishResult">：{{ dishResult }}</span>
      </h2>

      <!-- Loading 遮罩 -->
      <div
        v-if="isLoading"
        class="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10"
      >
        <span class="loading loading-spinner loading-lg text-primary"></span>
      </div>

      <div v-if="restaurants.length === 0">尚未有推薦</div>
      <div v-else class="grid gap-4">
        <RestaurantCard
          v-for="r in restaurants"
          :key="r.placeId"
          :restaurant="r"
          @click="handleRecentViewedRestaurant(r)"
        />
      </div>
      <br />
      <router-link to="/restaurants"
        ><button class="btn btn-primary btn-lg">看更多</button></router-link
      >
    </div>
    <Footer></Footer>
  </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import RestaurantCard from '@/components/RestaurantCard.vue';

import axios from 'axios';
import { ref, onMounted, computed } from 'vue';
import { useRestaurantStore } from '@/stores/restaurant';

const latitude = ref(null);
const longitude = ref(null);
const error = ref(null);
const store = useRestaurantStore();
const restaurants = computed(() => store.restaurants.slice(0, 3));
const dishResult = computed(() => store.dishResult);
const isLoading = ref(false);

onMounted(() => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        latitude.value = pos.coords.latitude;
        longitude.value = pos.coords.longitude;
      },
      (err) => {
        error.value = err.message;
      },
    );
  } else {
    error.value = '此瀏覽器不支援 Geolocation';
  }
});

const flavorsOptions = ['中式', '日式'];
const mainsOptions = ['豬肉', '牛肉'];
const staplesOptions = ['火鍋', '燉飯'];

const flavors = ref(flavorsOptions);
const mains = ref(mainsOptions);
const staples = ref(staplesOptions);

const handleRecentViewedRestaurant = (r) => {
  console.log(r);
  store.setRecentViewedRestaurant(r);
};

const getRecommendations = async () => {
  isLoading.value = true;

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
      payload,
    );
    store.setSelections(payload);
    store.setResults(data.result);
  } catch (err) {
    alert('取得推薦失敗');
  } finally {
    isLoading.value = false;
  }
};
</script>
