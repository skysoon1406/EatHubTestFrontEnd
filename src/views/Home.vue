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
              <div
                class="flex gap-4 items-center"
                v-for="flavorsOption in flavorsOptions"
                :key="flavorsOption"
              >
                <label class="flex items-center gap-1">
                  <input
                    type="checkbox"
                    :value="flavorsOption"
                    v-model="flavors"
                    class="checkbox"
                  />
                  <span>{{ flavorsOption }}</span>
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
              <div
                class="flex gap-4 items-center"
                v-for="mainsOption in mainsOptions"
                :key="mainsOption"
              >
                <label class="flex items-center gap-1">
                  <input
                    type="checkbox"
                    :value="mainsOption"
                    v-model="mains"
                    class="checkbox"
                  />
                  <span>{{ mainsOption }}</span>
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
              <div
                class="flex gap-4 items-center"
                v-for="staplesOption in staplesOptions"
                :key="staplesOption"
              >
                <label class="flex items-center gap-1">
                  <input
                    type="checkbox"
                    :value="staplesOption"
                    v-model="staples"
                    class="checkbox"
                  />
                  <span>{{ staplesOption }}</span>
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
        <h2 class="text-4xl font-bold m-10">{{ t('index.title') }}</h2>
        <div class="flex space-x-4">
          <div class="w-1/3 card bg-secondary text-neutral-content">
            <div class="card-body flex items-center justify-center text-5xl">
              <font-awesome-icon
                :icon="flavorIcon"
                :style="{ color: 'var(--color-neutral)' }"
              />
            </div>
          </div>
          <div class="w-1/3 card bg-secondary text-neutral-content">
            <div class="card-body flex items-center justify-center text-5xl">
              <font-awesome-icon
                :icon="mainIcon"
                :style="{ color: 'var(--color-neutral)' }"
              />
            </div>
          </div>
          <div class="w-1/3 card bg-secondary text-neutral-content">
            <div class="card-body flex items-center justify-center text-5xl">
              <font-awesome-icon
                :icon="typeIcon"
                :style="{ color: 'var(--color-neutral)' }"
              />
            </div>
          </div>
        </div>
        <div class="flex justify-end mt-6">
          <label for="my-modal" class="btn btn-neutral align-item-end">
            <font-awesome-icon :icon="['fas', 'sliders']" />
          </label>
        </div>
        <br />
        <button class="btn btn-neutral btn-lg" @click="runSlotMachine">
          {{ t('index.ctaButton') }}
        </button>
      </div>
    </div>
    <div class="p-6 text-center relative">
      <h2 class="text-2xl font-bold mb-4 p-6">
        {{ t('index.recommendResultTitle') }}
        <span v-if="dishResult">：{{ dishResult }}</span>
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
      <router-link to="/restaurants">
        <button class="btn btn-primary btn-lg">
          {{ t('index.seeMoreButton') }}
        </button>
      </router-link>
    </div>
    <Footer></Footer>
  </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import RestaurantCard from '@/components/RestaurantCard.vue';
import { useAlertStore } from '@/stores/alert';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

import axios from '@/axios';
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

const flavorsOptions = [
  '中式',
  '台式',
  '日式',
  '泰式',
  '韓式',
  '越式',
  '港式',
  '椒麻',
  '咖哩',
  '麻辣',
  '酸辣',
  '碳烤',
  '番茄',
  '水煮',
  '滷/燉',
  '清蒸',
  '泡菜',
  '什錦',
  '酥炸',
  '味增',
  '香煎',
];
const mainsOptions = ['牛肉', '豬肉', '雞肉', '羊肉', '鮮魚', '海鮮', '蔬菜'];
const staplesOptions = [
  '火鍋',
  '燉飯',
  '便當',
  '炒飯',
  '丼飯',
  '酸菜魚',
  '湯麵',
  '乾麵',
  '義大利麵',
  '刀削麵',
  '水餃',
  '健康餐',
  '冬粉',
  '漢堡',
  '壽司',
  '鐵板燒',
  '比薩',
  '通心麵',
  '排餐',
  '板條',
  '包子',
];

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
    const { data } = await axios.post('restaurants/', payload);
    store.setSelections(payload);
    store.setResults(data.result);
  } catch {
    const alert = useAlertStore();
    alert.trigger('取得推薦失敗', 'error');
  } finally {
    isLoading.value = false;
  }
};
// 拉霸動畫
const flavorIcon = ref(['fas', 'utensils']);
const mainIcon = ref(['fas', 'utensils']);
const typeIcon = ref(['fas', 'utensils']);

const icons = [
  ['fas', 'mug-saucer'],
  ['fas', 'fish'],
  ['fas', 'lemon'],
  ['fas', 'shrimp'],
  ['fas', 'pizza-slice'],
  ['fas', 'pepper-hot'],
  ['fas', 'ice-cream'],
  ['fas', 'hotdog'],
  ['fas', 'egg'],
  ['fas', 'drumstick-bite'],
  ['fas', 'cookie'],
  ['fas', 'burger'],
  ['fas', 'bone'],
];

let flavorInterval, mainInterval, typeInterval;

const runSlotMachine = async () => {
  flavorInterval = setInterval(() => {
    flavorIcon.value = icons[Math.floor(Math.random() * icons.length)];
  }, 100);
  mainInterval = setInterval(() => {
    mainIcon.value = icons[Math.floor(Math.random() * icons.length)];
  }, 100);
  typeInterval = setInterval(() => {
    typeIcon.value = icons[Math.floor(Math.random() * icons.length)];
  }, 100);

  await getRecommendations();

  clearInterval(flavorInterval);
  clearInterval(mainInterval);
  clearInterval(typeInterval);

  flavorIcon.value = ['fas', 'lightbulb'];
  mainIcon.value = ['fas', 'lightbulb'];
  typeIcon.value = ['fas', 'lightbulb'];
};
</script>
