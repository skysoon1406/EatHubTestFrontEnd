<template>
  <div>
    <Navbar></Navbar>
<<<<<<< HEAD
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
=======
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

    <div class="p-6 space-y-4">
      <div class="card bg-orange-600 shadow-xl p-6">
        <h2 class="text-xl font-bold mb-4">下一餐吃什麼？</h2>

        <div class="flex space-x-4">
          <div class="card w-1/3 bg-neutral-content text-neutral-content">
            <div class="card-body">
              <h2 class="text-center text-xl text-black">口味</h2>
            </div>
          </div>
          <div class="card w-1/3 bg-neutral-content text-primary-content">
            <div class="card-body">
              <h2 class="text-center text-xl text-black">主食</h2>
            </div>
          </div>
          <div class="card w-1/3 bg-neutral-content text-secondary-content">
            <div class="card-body">
              <h2 class="text-xl text-center text-black">類型</h2>
            </div>
          </div>
        </div>
        <br />
        <div class="flex justify-end">
          <label for="my-modal" class="btn btn-primary w-1/12 align-item-end">
            <font-awesome-icon :icon="['fas', 'sliders']" />
          </label>
        </div>
        <br />
        <button class="btn btn-primary" @click="getRecommendations">
          幫我選！
        </button>
      </div>
    </div>
    <div class="p-6">
      <h2 class="text-2xl font-bold mb-4">推薦結果</h2>
>>>>>>> 61e3845 (feat: update Home style)
      <div v-if="restaurants.length === 0">尚未有推薦</div>
      <div v-else class="grid gap-4">
        <div
          v-for="r in restaurants"
          :key="r.placeId"
<<<<<<< HEAD
          class="card bg-base-100 shadow-md p-4"
        >
          <router-link :to="`/restaurants/${r.placeId}`">
=======
          class="card shadow-md p-4"
        >
          <router-link :to="`/restaurants/${r.uuid}`">
>>>>>>> 61e3845 (feat: update Home style)
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
<<<<<<< HEAD
const mains = ref([]);
=======
const mains = ref(['豬肉', '牛肉']);
>>>>>>> 61e3845 (feat: update Home style)
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
