<template>
  <div class="bg-gray-300 sm:flex sm:justify-center">
    <div class="w-full sm:w-[390px] bg-white shadow-lg">
      <Navbar />
      
      <!-- 主要內容區域 -->
      <div class="min-h-[calc(100vh-64px)] px-4 py-4">
        <!-- 餐廳主圖片 -->
        <div class="w-full aspect-[16/9] bg-gray-200 rounded-lg overflow-hidden mb-4">
          <img
            :src="restaurant.imageUrl || 'https://picsum.photos/400/250'"
            :alt="restaurant.name"
            class="w-full h-full object-cover"
          />
        </div>

        <!-- 餐廳名稱和按鈕 -->
        <div class="flex justify-between items-center mb-1">
          <div class="flex items-center">
            <font-awesome-icon :icon="['fas', 'home']" class="text-blue-500 mr-2" />
            <h1 class="text-xl font-bold">{{ restaurant.name }}</h1>
          </div>
          
          <!-- 功能按鈕 -->
          <div class="flex space-x-2">
            <button @click="toggleFavorite" class="btn btn-circle">
              <font-awesome-icon 
                :icon="[isFavorite ? 'fas' : 'far', 'heart']" 
                :class="isFavorite ? 'text-red-500' : 'text-gray-500'" 
                class="text-2xl" 
              />
            </button>
            <button @click="navigateToAddress" class="btn btn-circle">
              <font-awesome-icon :icon="['fas', 'location-arrow']" class="text-3xl" />
            </button>
          </div>
        </div>
        
        <!-- 評分和地址 -->
        <div class="flex items-center mb-1">
          <font-awesome-icon :icon="['fas', 'star']" class="text-yellow-400" />
          <span class="ml-2 text-sm text-gray-600">{{ restaurant.googleRating || '4.5' }}</span>
          <span class="ml-1 text-xs text-gray-500">({{ restaurant.userRatingsTotal || 0 }})</span>
        </div>
        
        <div class="flex items-start mb-4">
          <font-awesome-icon :icon="['fas', 'map-marker-alt']" class="text-gray-500 mt-0.5 mr-2" />
          <span class="text-sm text-gray-700">{{ restaurant.address || '地址載入中...' }}</span>
        </div>

        <!-- 地圖區塊 -->
        <div class="w-full aspect-[2/1] bg-gray-200 rounded-lg overflow-hidden mb-4">
          <GoogleMapEmbed :mapUrl="mapUrl" alt="地圖" class="w-full h-full object-cover" />
        </div>

        <!-- 營業時間區塊 -->
        <div class="mb-6">
          <h3 class="text-base font-bold mb-3">營業時間</h3>
          <div class="space-y-1 text-sm">
            <div v-for="(hours, day) in formattedOpenHours" :key="day" class="flex justify-between">
              <span class="text-gray-700">{{ day }}</span>
              <span class="text-gray-700">{{ hours }}</span>
            </div>
          </div>
        </div>

        <!-- 優惠券按鈕 -->
        <button 
          @click="handleCouponClick"
          :class="[
            'btn w-full rounded-lg mb-2 border transition-colors duration-300',
            couponClaimed ? 'bg-white text-black border-black' : 
            isExpired ? 'bg-gray-300 text-gray-700' : 
            isNotStarted ? 'bg-gray-300 text-gray-700' : 'bg-black text-white'
          ]"
          :disabled="isExpired || isNotStarted"
        >
          <font-awesome-icon 
            :icon="couponIcon" 
            class="mr-2" 
          />
          {{ couponButtonText }}
        </button>

        <!-- 優惠券詳細資訊 -->
        <div v-if="coupon" class="bg-gray-50 rounded-lg p-4 mb-6">
          <h4 class="text-sm font-bold mb-2">優惠券詳細資訊</h4>
          
          <div class="space-y-2 text-sm">
            <div v-for="(value, key) in couponDetails" :key="key">
              <span class="text-gray-500">{{ key }}：</span>
              <span :class="key === '折扣值' ? 'font-medium text-red-500' : 'font-medium'">{{ value }}</span>
            </div>
            
            <div v-if="coupon.description">
              <span class="text-gray-500">使用說明：</span>
              <p class="mt-1 text-gray-700">{{ coupon.description }}</p>
            </div>
          </div>
          
          <div class="mt-3 text-xs text-gray-500">
            {{ couponStatusText }}
          </div>
        </div>

        <!-- 最新動態區塊 -->
        <div class="mb-6">
          <h3 class="text-base font-bold mb-3">最新動態</h3>
          <div class="card bg-base-100 shadow-sm border">
            <figure v-if="promotion.imageUrl" class="h-40">
              <img
                :src="promotion.imageUrl"
                :alt="promotion.title"
                class="w-full h-full object-cover"
              />
            </figure>
            <div class="card-body p-3">
              <h4 class="font-semibold text-sm">{{ promotion?.title || '暫無活動' }}</h4>
              <p class="text-sm">{{ promotion?.description || '目前沒有特別活動' }}</p>
              <p v-if="promotion?.startedAt" class="text-xs text-gray-500 mt-1">
                活動期間：{{ formatDate(promotion.startedAt) }} - {{ formatDate(promotion.endedAt) }}
              </p>
            </div>
          </div>
        </div>

        <!-- 評論區塊 -->
        <div class="mb-6">
          <div class="flex justify-between items-center mb-3">
            <h3 class="text-base font-bold">
              評論 <span class="text-sm text-gray-500 font-normal">(共 {{ reviews.length }} 則)</span>
            </h3>
            <button class="btn btn-sm bg-red-200 border-0 rounded-3xl px-6">
              <font-awesome-icon :icon="['far', 'clipboard']" /> 新增
            </button>
          </div>

          <div v-if="reviews.length === 0" class="text-center py-8 text-gray-500">
            暫無評論
          </div>

          <div v-else class="space-y-3">
            <div v-for="review in displayedReviews" :key="review.createdAt" class="bg-gray-50 rounded-lg p-4">
              <div class="flex items-start">
                <div class="avatar">
                  <div class="w-10 rounded-full">
                    <img :src="review.user.imageUrl || 'https://picsum.photos/40/40'" :alt="review.user.userName" />
                  </div>
                </div>
                <div class="ml-3 flex-1">
                  <div class="flex items-center mb-1">
                    <h4 class="font-semibold text-sm">{{ review.user.userName }}</h4>
                    <div class="ml-2 flex items-center">
                      <font-awesome-icon :icon="['fas', 'star']" class="text-yellow-400 text-xs" />
                      <span class="ml-1 text-xs text-gray-600">{{ review.rating }}</span>
                    </div>
                  </div>
                  <p class="text-sm text-gray-700">{{ review.content }}</p>
                  <p class="text-xs text-gray-400 mt-1">{{ formatDate(review.createdAt) }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- 查看更多按鈕 -->
          <button
            v-if="hasMoreReviews"
            @click="loadMoreReviews"
            class="btn btn-outline btn-sm w-full mt-4"
          >
            查看更多 <font-awesome-icon :icon="['fas', 'chevron-right']" class="ml-1" />
            <span class="text-xs text-gray-500 ml-1">
              (還有 {{ reviews.length - displayedReviewsCount }} 則)
            </span>
          </button>
          
          <div v-else-if="reviews.length > 5" class="text-center text-sm text-gray-500 mt-4">
            已顯示所有評論
          </div>
        </div>
      </div>
      <Footer />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import GoogleMapEmbed from '@/components/RecommendDetail/GoogleMapEmbed.vue';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import axios from '@/axios';

const route = useRoute();
const isFavorite = ref(false);
const couponClaimed = ref(false);
const displayedReviewsCount = ref(5);
const mapUrl = ref('');
const placeId = ref('');

// 餐廳基本信息
const restaurant = reactive({
  name: '',
  imageUrl: '',
  googleRating: 0,
  address: '',
  latitude: null,
  longitude: null,
  userRatingsTotal: 0,
  placeId: '',
});

// 優惠券信息
const coupon = ref({
  serialNumber: 'COUP2025001',
  startedAt: '2025-01-01T00:00:00Z',
  endedAt: '2025-12-31T23:59:59Z',
  title: '新客優惠 - 九折優惠券',
  description: '首次消費享有九折優惠',
  discountType: 'percentage',
  discountValue: 10,
  uuid: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
});

// 優惠活動信息
const promotion = ref({
  title: '週年慶特別活動',
  description: '本月壽星來店消費，出示證件即可獲得免費甜點一份！',
  startedAt: '2025-01-01T00:00:00Z',
  endedAt: '2025-01-31T23:59:59Z',
  imageUrl: 'https://picsum.photos/400/160?random=promo',
});

// 營業時間
const openHours = reactive({
  monday: null,
  tuesday: null,
  wednesday: null,
  thursday: null,
  friday: null,
  saturday: null,
  sunday: null,
});

// 用戶評論
const reviews = ref([{
  user: {
    userName: '美食喜相逢',
    imageUrl: 'https://picsum.photos/40/40?random=1',
    uuid: 'user-uuid-1',
  },
  rating: 2,
  content: '這裡的拉麵真的超級好吃！...',
  createdAt: '2025-01-15T14:30:00Z',
  imageUrl: null,
}]);

// 格式化天數顯示
const dayTranslation = {
  monday: '星期一',
  tuesday: '星期二', 
  wednesday: '星期三',
  thursday: '星期四',
  friday: '星期五',
  saturday: '星期六',
  sunday: '星期日'
};

// 計算屬性：格式化後的營業時間
const formattedOpenHours = computed(() => {
  const result = {};
  for (const [key, value] of Object.entries(openHours)) {
    result[dayTranslation[key]] = value || '未提供';
  }
  return result;
});

// 計算屬性：優惠券詳細信息
const couponDetails = computed(() => {
  if (!coupon.value) return {};
  
  return {
    '序號'   : coupon.value.serialNumber,
    '折扣類型': coupon.value.discountType === 'percentage' ? '折扣' : '金額折抵',
    '折扣值'  : coupon.value.discountType === 'percentage' ? 
              `${coupon.value.discountValue}%` : 
              `${coupon.value.discountValue}元`,
    '有效期間': `${formatDate(coupon.value.startedAt)} - ${formatDate(coupon.value.endedAt)}`
  };
});

// 計算屬性：當前應該顯示的評論
const displayedReviews = computed(() => reviews.value.slice(0, displayedReviewsCount.value));

// 計算屬性：是否還有更多評論可以顯示
const hasMoreReviews = computed(() => displayedReviewsCount.value < reviews.value.length);

// 計算屬性：優惠券是否已過期
const isExpired = computed(() => {
  if (!coupon.value?.endedAt) return false;
  return new Date(coupon.value.endedAt) < new Date();
});

// 計算屬性：優惠券活動是否尚未開始
const isNotStarted = computed(() => {
  if (!coupon.value?.startedAt) return false;
  return new Date(coupon.value.startedAt) > new Date();
});

// 計算屬性：優惠券按鈕文字
const couponButtonText = computed(() => {
  if (couponClaimed.value) return '已領取優惠券';
  if (isExpired.value) return '活動已結束';
  if (isNotStarted.value) return '活動尚未開始';
  return coupon.value?.title || '領取優惠券';
});

// 計算屬性：優惠券圖標
const couponIcon = computed(() => {
  if (couponClaimed.value) return ['fas', 'check'];
  if (isExpired.value || isNotStarted.value) return ['fas', 'clock'];
  return ['fas', 'ticket'];
});

// 計算屬性：優惠券狀態文本
const couponStatusText = computed(() => {
  if (isExpired.value) return '此優惠券已過期';
  if (isNotStarted.value) return '請於活動開始後再來領取';
  if (couponClaimed.value) return '使用時向店家出示此頁面';
  return '點擊上方按鈕領取優惠券';
});

// 方法：導航到地址
const navigateToAddress = () => {
  if (placeId.value) {
    window.open(`https://www.google.com/maps/place/?q=place_id:${placeId.value}`, '_blank');
  } else if (restaurant.latitude && restaurant.longitude) {
    window.open(`https://www.google.com/maps?q=${restaurant.latitude},${restaurant.longitude}`, '_blank');
  }
};

// 方法：切換最愛狀態
const toggleFavorite = async () => {
  const isLoggedIn = await checkAuth();
  if (!isLoggedIn) {
    alert('請先登入才能收藏餐廳');
    return;
  }
  
  try {
    const restaurantUuid = route.params.id;
    if (isFavorite.value) {
      await axios.delete(`/restaurants/${restaurantUuid}/favorites/`);
    } else {
      await axios.post(`/restaurants/${restaurantUuid}/favorites/`);
    }
    isFavorite.value = !isFavorite.value;
  } catch (error) {
    alert('更新最愛狀態失敗，請稍後再試');
  }
};

// 方法：處理優惠券按鈕點擊
const handleCouponClick = async () => { 
  if (isExpired.value) {
    alert('活動已結束');
    return;
  }
  if (isNotStarted.value) {
    alert('活動尚未開始');
    return;
  }
  if (couponClaimed.value) {
    alert('您已領取過此優惠券');
    return;
  }
  
  const isLoggedIn = await checkAuth();
  if (!isLoggedIn) {
    alert('請先登入才能領取優惠券');
    return;
  }
  
  try {
    await axios.post(`/coupons/${coupon.value.uuid}/claim/`);
    couponClaimed.value = true;
  } catch (error) {
    const message = error.response?.data?.message || '請稍後再試';
    alert('領取優惠券失敗：' + message);
  }
};

// 方法：載入更多評論
const loadMoreReviews = () => {
  displayedReviewsCount.value += 10;
};

// 方法：日期格式化
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
};

// 方法：檢查認證狀態
const checkAuth = async () => {
  try {
    await axios.get('/auth/me');
    return true;
  } catch (error) {
    return false;
  }
};

// 方法：獲取餐廳數據
const fetchRestaurantData = async () => {
  try {
    const restaurantUuid = route.params.id;
    const response = await axios.get(`/restaurants/${restaurantUuid}`);
    const data = response.data;
    
    if (data?.result?.restaurant) {
      // 更新餐廳基本信息
      Object.assign(restaurant, data.result.restaurant);
      placeId.value = data.result.restaurant.placeId;
      
      // 設置地圖URL
      if (restaurant.latitude && restaurant.longitude) {
        mapUrl.value = `https://www.google.com/maps?q=${restaurant.latitude},${restaurant.longitude}&z=18&output=embed`;
      } else {
        mapUrl.value = 'https://www.google.com/maps?q=25.0459993,121.5170414&z=18&output=embed';
      }
      
      // 更新營業時間
      if (data.result.restaurant.openHours) {
        Object.assign(openHours, data.result.restaurant.openHours);
      }
    }
    
    // 更新其他數據
    if (data.result.promotion) promotion.value = data.result.promotion;
    if (data.result.coupon) coupon.value = data.result.coupon;
    if (data.result.reviews?.length > 0) reviews.value = data.result.reviews;
    
    // 設定用戶狀態
    if (data.result.userStatus) {
      if (data.result.userStatus.hasClaimedCoupon !== undefined) {
        couponClaimed.value = data.result.userStatus.hasClaimedCoupon;
      }
      if (data.result.userStatus.hasFavorited !== undefined) {
        isFavorite.value = data.result.userStatus.hasFavorited;
      }
    }
    
  } catch (error) {
    if (error.response?.status === 404) {
      alert('找不到該餐廳資料');
    } else {
      alert('載入餐廳資料失敗，請稍後再試');
    }
  }
};

// 組件載入時執行
onMounted(fetchRestaurantData);
</script>

<style scoped>
.btn.bg-black {
  background-color: rgb(252, 88, 0);
  border-color: rgb(255, 255, 255);
}

.btn.bg-white {
  background-color: rgb(255, 255, 255);
  border: 1px solid black;
}
</style>