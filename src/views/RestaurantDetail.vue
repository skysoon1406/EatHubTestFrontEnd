<template>
  <!-- 外層容器設定固定寬度模擬手機螢幕 -->
  <div class="flex justify-center min-h-screen bg-gray-300">
    <div class="w-[390px] bg-white shadow-lg">
      <!-- 頂部導航欄 -->
      <div class="navbar bg-white shadow-sm px-4 py-3 border-b flex justify-between items-center">
  <!-- 左邊 Logo 區 -->
  <div class="flex items-center">
    <img src="/public/images/logo.png" alt="Logo" class="w-17 h-12 mr-2" />
  </div>

  <!-- 右邊 漢堡選單 -->
  <button class="btn btn-ghost btn-circle ">
    <font-awesome-icon :icon="['fas', 'bars']" class="text-3xl text-red-500"/>
  </button>
</div>
      

      <!-- 主要內容區域 - 使用滾動 -->
      <div class="h-[calc(100vh-64px)] overflow-y-auto">
        <div class="px-4 py-4">
          <!-- 餐廳主圖片 -->
          <div class="w-full aspect-[16/9] bg-gray-200 rounded-lg overflow-hidden mb-4">
            <img 
              :src="restaurant.image || 'https://picsum.photos/400/250'" 
              :alt="restaurant.name"
              class="w-full h-full object-cover"
            />
          </div>

          <!-- 餐廳名稱和導航按鈕 -->
          <div class="flex justify-between items-center mb-1">
  <!-- 左側：icon + 商家名稱 -->
            <div class="flex items-center">
            <font-awesome-icon :icon="['fas', 'home']" class="text-blue-500 mr-2" />
            <h1 class="text-xl font-bold">{{ restaurant.name || '藤原豆腐店' }}</h1>
            </div>

    <!-- 右側按鈕 -->
            <button class="btn btn-circle btn-lg">
    <!-- 可以放 icon 或其他內容 -->
  

            
              
              
              <button class=" btn-md bg-red-200  rounded-3xl px-2"> let's go</button>
              <font-awesome-icon :icon="['fas', 'location-arrow']" class="text-3xl" />
            </button>
          </div>

          <!-- 評分區塊 -->
          <div class="flex items-center mb-1">
            <div class="rating rating-sm">
              <input 
                type="radio" 
                name="rating-restaurant" 
                class="mask mask-star-2 bg-yellow-400" 
                v-for="n in 5" 
                :key="n" 
                :checked="n === Math.round(restaurant.rating)" 
                disabled 
              />
            </div>
            <span class="ml-2 text-sm text-gray-600">{{ restaurant.rating || '4.5' }}</span>
          </div>

          <!-- 地址區塊 -->
          <div class="flex items-start mb-4">
            <font-awesome-icon :icon="['fas', 'map-marker-alt']" class="text-gray-500 mt-0.5 mr-2" />
            <span class="text-sm text-gray-700">{{ restaurant.address || '地址載入中...' }}</span>
          </div>

          <!-- 地圖區塊 -->
          <div class="w-full aspect-[2/1] bg-gray-200 rounded-lg overflow-hidden mb-4">
            <GoogleMapEmbed 
              :map-url="'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.123456789012!2d-122.4194156846815!3d37.7749292797594!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808c8c8c8c8c%3A0x8c8c8c8c8c8c8c8c!2sMy+Coffee+Shop!5e0!3m2!1sen!2sus!4v1631234567890'"
    
              alt="地圖"
              class="w-full h-full object-cover"
            />
          </div>

          <!-- 營業時間區塊 -->
          <div class="mb-6">
            <h3 class="text-base font-bold mb-3">營業時間</h3>
            <div class="space-y-1 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-700">星期一</span>
                <span class="text-gray-700">12:00-15:00, 18:00-21:30</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-700">星期二</span>
                <span class="text-gray-700">12:00-15:00, 18:00-21:30</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-700">星期三</span>
                <span class="text-gray-700">12:00-15:00, 18:00-21:30</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-700">星期四</span>
                <span class="text-gray-700">12:00-15:00, 18:00-21:30</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-700">星期五</span>
                <span class="text-gray-700">12:00-15:00, 18:00-21:30</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-700">星期六</span>
                <span class="text-gray-700">12:00-15:00, 18:00-21:30</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-700">星期日</span>
                <span class="text-gray-700">12:00-15:00, 18:00-21:30</span>
              </div>
            </div>
          </div>

          <!-- 領取優惠券按鈕 -->
          <button 
  @click="toggleCoupon"
  :class="[
    'btn w-full rounded-lg mb-6 border transition-colors duration-300',
    couponClaimed ? 'bg-white text-black border-black' : 'bg-black text-white border-black'
  ]"
>
  <font-awesome-icon 
    :icon="couponClaimed ? ['fas', 'check'] : ['fas', 'ticket']" 
    class="mr-2" 
  />
  {{ couponClaimed ? '已領取優惠券' : '領取優惠券' }}
</button>

          <!-- 最新動態區塊 -->
          <div class="mb-6">
            <h3 class="text-base font-bold mb-3">最新動態</h3>
            <div class="space-y-3">
              <div class="card bg-base-100 shadow-sm border">
                <figure class="h-40">
                  <img src="https://picsum.photos/400/160?random=news" alt="動態圖片" class="w-full h-full object-cover" />
                </figure>
                <div class="card-body p-3">
                  <p class="text-sm">為您推薦各式新鮮沙拉，健康輕食，營養均衡，讓您吃得安心又健康。歡迎來店品嚐！</p>
                  <p class="text-xs text-gray-500 mt-1">週三大特惠：沙拉8折優惠！趕快來品嚐！</p>
                </div>
              </div>
            </div>
          </div>

          <!-- 評論區塊 -->
          <div class="mb-6">
            <div class="flex justify-between items-center mb-3">
              <h3 class="text-base font-bold">評論</h3>
              <button class="btn btn-sm bg-red-200 border-0 rounded-3xl px-6">
                <font-awesome-icon :icon="['far', 'clipboard']" /> 新增
              </button>
            </div>
            
            <div class="space-y-3">
              <!-- 評論項目 1 -->
              <div class="bg-gray-50 rounded-lg p-4">
                <div class="flex items-start">
                  <div class="avatar">
                    <div class="w-10 rounded-full">
                      <img src="https://picsum.photos/40/40?random=1" alt="avatar" />
                    </div>
                  </div>
                  <div class="ml-3 flex-1">
                    <div class="flex items-center mb-1">
                      <h4 class="font-semibold text-sm">使用者名稱</h4>
                      <div class="rating rating-xs ml-2">
                        <input type="radio" class="mask mask-star-2 bg-yellow-400" checked disabled />
                        <input type="radio" class="mask mask-star-2 bg-yellow-400" checked disabled />
                        <input type="radio" class="mask mask-star-2 bg-yellow-400" checked disabled />
                        <input type="radio" class="mask mask-star-2 bg-yellow-400" checked disabled />
                        <input type="radio" class="mask mask-star-2 bg-gray-300" disabled />
                      </div>
                    </div>
                    <p class="text-sm text-gray-700">這山區實在，地點方便且，價格合理！菜色一定要試試看的地板。中式西餐都有，而且份量十足，適合用餐餐聚。味道的幫得了，真的很推薦給大家想吃！</p>
                  </div>
                </div>
              </div>
              
              <!-- 評論項目 2 -->
              <div class="bg-gray-50 rounded-lg p-4">
                <div class="flex items-start">
                  <div class="avatar">
                    <div class="w-10 rounded-full">
                      <img src="https://picsum.photos/40/40?random=2" alt="avatar" />
                    </div>
                  </div>
                  <div class="ml-3 flex-1">
                    <div class="flex items-center mb-1">
                      <h4 class="font-semibold text-sm">使用者名稱</h4>
                      <div class="rating rating-xs ml-2">
                        <input type="radio" class="mask mask-star-2 bg-yellow-400" checked disabled />
                        <input type="radio" class="mask mask-star-2 bg-yellow-400" checked disabled />
                        <input type="radio" class="mask mask-star-2 bg-yellow-400" checked disabled />
                        <input type="radio" class="mask mask-star-2 bg-yellow-400" checked disabled />
                        <input type="radio" class="mask mask-star-2 bg-gray-300" disabled />
                      </div>
                    </div>
                    <p class="text-sm text-gray-700">這山區實在，地點方便且，價格合理！菜色一定要試試看的地板。中式西餐都有，而且份量十足，適合用餐餐聚。味道的幫得了，真的很推薦給大家想吃！</p>
                  </div>
                </div>
              </div>
            </div>

            <!-- 查看更多按鈕 -->
            <button class="btn btn-outline btn-sm w-full mt-4">
              查看更多 <font-awesome-icon :icon="['fas', 'chevron-right']" class="ml-1" />
            </button>
          </div>
        </div>

        <!-- 頁尾 -->
        <footer class="bg-gray-800 text-white py-8 px-4">
          <div class="grid grid-cols-3 gap-4 mb-6">
            <div>
              <div class="flex items-center mb-3">
                
                <div>
                  <img src="/public/images/logo_w.png" alt="Logo" class="w-17 h-12 mr-2" />
                </div>
              </div>
              <p class="text-xs text-gray-400 leading-relaxed">
                電話：<br>02-123456789<br>
                營業時間：<br>10:00-20:00<br>
                地址：<br> 台北市中山區東海路1號
              </p>
            </div>
            
            <div>
              <h4 class="font-bold mb-3 text-sm">關於我們</h4>
              <ul class="text-xs text-gray-400 space-y-1">
                <li>服務項目</li>
                <li>聯繫方式</li>
                <li>條款與政策</li>
              </ul>
            </div>
            
            <div>
              <h4 class="font-bold mb-3 text-sm">社群媒體</h4>
              <ul class="text-xs text-gray-400 space-y-1">
                <li>Facebook</li>
                <li>Instagram</li>
                <li>Twitter</li>
              </ul>
            </div>
          </div>
          
          <div class="text-center text-xs text-gray-400 pt-4 border-t border-gray-700">
            © 2024 尋飽 EatHub. All rights reserved.
          </div>
        </footer>
      </div>
    </div>
  </div>

</template>
<script setup>

import { ref, reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import GoogleMapEmbed from '../components/RecommendDetail/GoogleMapEmbed.vue'
import axios from '../axios'


// 使用 useRoute 取得路由資訊
const route = useRoute()



// 定義響應式資料
const restaurant = reactive({
  name: '',
  image: '',
  rating: 4.5,
  address: '',
  latitude: null,
  longitude: null
})

const businessHours = reactive({
  monday: '12:00-15:00, 18:00-21:30',
  tuesday: '12:00-15:00, 18:00-21:30',
  wednesday: '12:00-15:00, 18:00-21:30',
  thursday: '12:00-15:00, 18:00-21:30',
  friday: '12:00-15:00, 18:00-21:30',
  saturday: '12:00-15:00, 18:00-21:30',
  sunday: '12:00-15:00, 18:00-21:30'
})

const couponClaimed = ref(false)
const latestNews = ref([])
const comments = ref([])
const showAddComment = ref(false)
const mapUrl = ref('')

// 定義方法
const fetchRestaurantData = async () => {
  try {
    const restaurantId = route.params.id
    
    // 從後端取得資料
    const res = await axios.get(`/restaurants/${restaurantId}`)
    
    // 更新餐廳資料
    Object.assign(restaurant, res.data)
    
    // 判斷是否有經緯度
    if (res.data.latitude && res.data.longitude) {
      mapUrl.value = `https://www.google.com/maps?q=${res.data.latitude},${res.data.longitude}&z=18&output=embed`
    } else {
      // 預設使用台北車站座標
      mapUrl.value = 'https://www.google.com/maps?q=25.0459993,121.5170414&z=18&output=embed'
    }
    
    // 如果需要更新其他資料（營業時間、動態、評論等）
    if (res.data.businessHours) {
      Object.assign(businessHours, res.data.businessHours)
    }
    if (res.data.latestNews) {
      latestNews.value = res.data.latestNews
    }
    if (res.data.comments) {
      comments.value = res.data.comments
    }
    
  } catch (error) {
    console.error('Error fetching restaurant data:', error)
  }
}

const toggleCoupon = () => {
  if (!couponClaimed.value) {
    claimCoupon()
  }
}

const claimCoupon = async () => {
  try {
    const restaurantId = route.params.id
    await axios.post(`/restaurants/${restaurantId}/coupons/claim`)
    couponClaimed.value = true
  } catch (error) {
    console.error('Error claiming coupon:', error)
  }
}

const navigateToAddress = () => {
  if (restaurant.address) {
    window.open(`https://maps.google.com?q=${encodeURIComponent(restaurant.address)}`, '_blank')
  }
}

// 組件載入時執行
onMounted(() => {
  fetchRestaurantData()
})
</script>


<style scoped>
/* 固定手機版面寬度 */
.w-\[390px\] {
  width: 390px;
}
  
/* 確保按鈕在點擊時顏色變化正確 */
.btn:focus {
  outline: none;
}

/* 優惠券按鈕樣式 */
.btn.bg-black {
  background-color: rgb(252, 88, 0);
  border-color: rgb(255, 255, 255);
}

.btn.bg-white {
  background-color: rgb(255, 255, 255);
  border: 1px solid black;
}

/* 導航欄高度固定 */
.navbar {
  height: 64px;
}

/* 內容區域高度計算 */
.h-\[calc\(100vh-64px\)\] {
  height: calc(100vh - 64px);
}

</style>