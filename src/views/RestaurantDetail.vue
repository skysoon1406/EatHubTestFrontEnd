<template>
  <Navbar class="w-full" />
  <div class="w-full px-2">
    <!-- 餐廳主圖片 -->
    <div class="w-full h-64 bg-gray-200 overflow-hidden mb-4">
      <img
        :src="restaurant.imageUrl || 'https://picsum.photos/1200/400'"
        :alt="restaurant.name"
        class="w-full h-full object-cover"
      />
    </div>

    <!-- 餐廳名稱與操作按鈕 -->
    <div class="flex justify-between items-center mb-1">
      <div class="flex items-center">
        <font-awesome-icon :icon="['fas', 'home']" class="text-blue-500 mr-2" />
        <h1 class="text-xl font-bold">{{ restaurant.name }}</h1>
      </div>
      <div class="flex space-x-2">
        <ShareButton
          :restaurant-name="restaurant.name"
          :restaurant-rating="restaurant.googleRating || '4.5'"
        />
        <button @click="toggleFavorite" class="btn btn-circle">
          <font-awesome-icon
            :icon="[isFavorite ? 'fas' : 'far', 'heart']"
            :class="isFavorite ? 'text-red-500' : 'text-gray-500'"
            class="text-2xl"
          />
        </button>
        <button @click="navigateToAddress" class="btn btn-circle">
          <font-awesome-icon
            :icon="['fas', 'location-arrow']"
            class="text-3xl"
          />
        </button>
      </div>
    </div>

    <!-- 評分與地址 -->
    <div class="flex items-center mb-1">
      <font-awesome-icon :icon="['fas', 'star']" class="text-yellow-400" />
      <span class="ml-2 text-sm text-gray-600">{{
        restaurant.googleRating
      }}</span>
      <span class="ml-1 text-xs text-gray-500"
        >({{ restaurant.userRatingsTotal }})</span
      >
    </div>
    <div class="flex items-start mb-4">
      <font-awesome-icon
        :icon="['fas', 'map-marker-alt']"
        class="text-gray-500 mt-0.5 mr-2"
      />
      <span class="text-sm text-gray-700">{{ restaurant.address }}</span>
    </div>

    <!-- 地圖區塊 -->
    <div class="w-full h-48 bg-gray-200 overflow-hidden mb-4">
      <GoogleMapEmbed
        :mapUrl="mapUrl"
        alt="地圖"
        class="w-full h-full object-cover"
      />
    </div>

    <!-- 營業時間 -->
    <div class="mb-6">
      <h3 class="text-base font-bold mb-3">營業時間</h3>
      <div class="space-y-1 text-sm">
        <div
          v-for="(hours, day) in formattedOpenHours"
          :key="day"
          class="flex justify-between"
        >
          <span
            :class="[
              'text-gray-700',
              {
                'underline underline-offset-5 font-bold text-primary':
                  day === today,
              },
            ]"
            >{{ day }}</span
          >
          <span
            :class="[
              'text-gray-700',
              {
                'underline underline-offset-5 font-bold text-primary':
                  day === today,
              },
            ]"
            >{{ hours }}</span
          >
        </div>
      </div>
    </div>

    <!-- 優惠券輪播 -->
    <CouponCarousel
      v-if="coupons.length"
      :coupons="coupons"
      :claimedStatus="claimedStatus"
      class="mb-6"
    />

    <!-- 最新動態輪播 -->
    <PromotionCarousel
      v-if="promotions.length"
      :promotions="promotions"
      class="mb-6"
    />

    <!-- 評論區塊 -->
    <div class="mb-6">
      <div class="flex justify-between items-center mb-3">
        <h3 class="text-base font-bold">
          評論
          <span class="text-sm text-gray-500 font-normal"
            >(共 {{ reviews.length }} 則)</span
          >
        </h3>
        <button
          :disabled="hasReviewed"
          @click="handleAddReviewClick"
          class="btn btn-sm border border-gray-400 text-gray-600 rounded-3xl px-6 cursor-pointer hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ hasReviewed ? '已評論' : '＋ 新增' }}
        </button>
      </div>

      <div class="space-y-3">
        <div v-if="reviews.length === 0" class="text-center py-8 text-gray-500">
          暫無評論
        </div>
        <ReviewModal
          v-if="showModal"
          :show="showModal"
          :userName="user?.userName || ''"
          userAvatar="https://cdn-icons-png.flaticon.com/512/266/266033.png"
          @close="showModal = false"
          @submit="submitReview"
        />
        <div
          v-for="(review, index) in displayedReviews"
          :key="index"
          class="bg-gray-100 rounded-lg p-4"
        >
          <div class="flex items-start">
            <div class="avatar">
              <div class="w-10 rounded-full">
                <img
                  :src="
                    review.user?.imageUrl ||
                    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
                  "
                />
              </div>
            </div>
            <div class="ml-3 flex-1">
              <div class="flex flex-col items-left mb-1">
                <h4 class="font-semibold text-sm text-black">
                  {{ review.user.userName }}
                </h4>
                <div class="flex items-center">
                  <font-awesome-icon
                    :icon="['fas', 'star']"
                    class="text-yellow-400 text-xs"
                  />
                  <span class="ml-1 text-xs text-gray-600">{{
                    review.rating
                  }}</span>
                </div>
              </div>
              <p class="text-sm text-gray-700">{{ review.content }}</p>
              <img
                v-if="review.imageUrl"
                :src="review.imageUrl"
                alt="上傳圖片"
                class="mt-2 max-w-xs w-full rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      <button
        v-if="displayedCount < reviews.length"
        @click="displayedCount += 10"
        class="mt-4 mb-6 px-4 py-1 border border-gray-400 text-gray-600 rounded-full text-sm hover:bg-gray-100 transition mx-auto block"
      >
        查看更多
        <font-awesome-icon :icon="['fas', 'chevron-right']" class="ml-1" />
        <span class="text-xs text-gray-500 ml-1"
          >(還有 {{ reviews.length - displayedCount }} 則)</span
        >
      </button>

      <div
        v-else-if="reviews.length > 5"
        class="text-center text-sm text-gray-500 mt-4"
      >
        已顯示所有評論
      </div>
    </div>
  </div>
  <Footer />
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import axios from '@/axios';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import GoogleMapEmbed from '@/components/GoogleMapEmbed.vue';
import PromotionCarousel from '@/components/PromotionCarousel.vue';
import CouponCarousel from '@/components/CouponCarousel.vue';
import ReviewModal from '@/components/AddReview.vue';
import ShareButton from '@/components/ShareButton.vue';
import { useAuthStore } from '../stores/auth';
import { useAlertStore } from '@/stores/alert';
import { storeToRefs } from 'pinia';

const route = useRoute();
const alert = useAlertStore();
const auth = useAuthStore();
const { user } = storeToRefs(auth);
const restaurant = reactive({});
const openHours = reactive({});
const mapUrl = ref('');
const placeId = ref('');
const isFavorite = ref(false);
const promotions = ref([]);
const coupons = ref([]);
const claimedStatus = ref({});
const reviews = ref([]);
const showModal = ref(false);
const hasReviewed = ref(false);

const displayedCount = ref(5);
const displayedReviews = computed(() =>
  reviews.value.slice(0, displayedCount.value),
);

const today = computed(() => {
  const weekday = new Date()
    .toLocaleDateString('en-US', { weekday: 'long' })
    .toLowerCase();
  return dayTranslation[weekday];
});

const formattedOpenHours = computed(() => {
  const result = {};
  for (const [key, value] of Object.entries(openHours)) {
    result[dayTranslation[key]] = value || '未提供';
  }
  return result;
});

const dayTranslation = {
  monday: '星期一',
  tuesday: '星期二',
  wednesday: '星期三',
  thursday: '星期四',
  friday: '星期五',
  saturday: '星期六',
  sunday: '星期日',
};

const fetchRestaurantData = async () => {
  try {
    const restaurantUuid = route.params.id;
    const response = await axios.get(`/restaurants/${restaurantUuid}`);
    const data = response.data.result;

    Object.assign(restaurant, data.restaurant);
    Object.assign(openHours, data.restaurant.openHours || {});
    placeId.value = data.restaurant.placeId;
    mapUrl.value = `https://www.google.com/maps?q=${restaurant.latitude},${restaurant.longitude}&z=18&output=embed`;

    promotions.value = data.promotion || [];
    coupons.value = data.coupon || [];
    claimedStatus.value = data.userStatus?.hasClaimedCoupon || {};
    isFavorite.value = data.userStatus?.hasFavorited || false;
    reviews.value = data.reviews || [];
    hasReviewed.value = data.userStatus?.hasReviewed || false;
  } catch (error) {
    alert.trigger('載入餐廳資料失敗', 'error');
  }
};

const handleAddReviewClick = async () => {
  try {
    await axios.get('/auth/me');
    showModal.value = true;
  } catch {
    alert.trigger('請先登入才能評論', 'error');
  }
};

const submitReview = async (data) => {
  try {
    const restaurantUuid = route.params.id;
    const formData = new FormData();
    formData.append('content', data.content);
    formData.append('rating', Number(data.rating) || 5);
    if (data.imageFile) formData.append('image', data.imageFile);

    const response = await axios.post(
      `/restaurants/${restaurantUuid}/reviews/`,
      formData,
    );
    reviews.value.unshift(response.data);
    hasReviewed.value = true;
    alert.trigger('評論送出成功', 'success');
    showModal.value = false;
  } catch {
    alert.trigger('評論失敗', 'error');
  }
};

const toggleFavorite = async () => {
  try {
    await axios.get('/auth/me');
    const restaurantUuid = route.params.id;
    if (isFavorite.value) {
      await axios.delete(`/restaurants/${restaurantUuid}/favorites/`);
    } else {
      await axios.post(`/restaurants/${restaurantUuid}/favorites/`);
    }
    isFavorite.value = !isFavorite.value;
  } catch {
    alert.trigger('請先登入才能收藏餐廳', 'error');
  }
};

const navigateToAddress = () => {
  if (placeId.value) {
    window.open(
      `https://www.google.com/maps/place/?q=place_id:${placeId.value}`,
      '_blank',
    );
  } else if (restaurant.latitude && restaurant.longitude) {
    window.open(
      `https://www.google.com/maps?q=${restaurant.latitude},${restaurant.longitude}`,
      '_blank',
    );
  }
};

onMounted(fetchRestaurantData);
</script>
