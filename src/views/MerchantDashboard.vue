<template>
  <MerchantNavBar />

  <div class="px-4 py-6 max-w-6xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">{{ restaurantName }}
          <span v-if="role === 'vip_merchant'" class="badge badge-primary">
            <font-awesome-icon :icon="['fa-solid', 'fa-crown']" /> VIP
          </span>
          <span v-else-if="role === 'merchant'" class="px-2 py-0.5 text-xs font-semibold text-gray-600 bg-gray-200 rounded-full">
            一般店家
          </span>
    </h1>
    <p v-if="role === 'merchant'"  class="text-sm text-gray-600 mb-4">
      您目前為 <span class="font-semibold text-primary">一般商家</span>，升級為 VIP 可發佈更多優惠券與活動 
      <button  @click="openUpgradeModal()" class=" inline-flex items-center gap-1 text-xs font-semibold text-white bg-orange-500 px-3 py-1 rounded-full hover:bg-orange-600 transition ml-2">
        <font-awesome-icon :icon="['fa-solid', 'fa-crown']" />  立即升級！ 
      </button>
    </p>

    <!-- Tab 與新增按鈕 -->
    <div class="flex justify-between items-center mb-6">
      <!-- 左側：Tab 切換按鈕 -->
      <div class="flex gap-4">
        <button
          class="btn w-[110px]"
          :class="activeTab === 'coupon' ? 'btn-primary' : 'btn-outline'"
          @click="setTab('coupon')"
        >
          優惠券
        </button>
        <button
          class="btn w-[110px]"
          :class="activeTab === 'promotion' ? 'btn-primary' : 'btn-outline'"
          @click="setTab('promotion')"
        >
          商家動態
        </button>
      </div>

      <!-- 右側：新增按鈕 -->
      <button
        class="btn btn-accent"
        @click="
          router.push(
            activeTab === 'coupon'
              ? '/merchant/coupons/create'
              : '/merchant/promotions/create',
          )
        "
      >
        新增{{ activeTab === 'coupon' ? '優惠券' : '商家動態' }}
      </button>
    </div>

    <!-- 清單元件切換 -->
    <component
      :is="activeTab === 'coupon' ? MerchantCouponList : MerchantPromotionList"
      v-bind="activeTab === 'coupon' ? { coupons } : { promotions }"
      @refresh="fetchDashboard"
    />
  </div>

    <UpgradeModal
    v-if="showUpgradeModal"
    :message="upgradeMessage"
    @close="showUpgradeModal = false"
    />

  <component :is="Footer" />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from '@/axios';
import MerchantNavBar from '@/components/MerchantNavBar.vue';
import Footer from '@/components/Footer.vue';
import MerchantCouponList from '@/components/MerchantCouponList.vue';
import MerchantPromotionList from '@/components/MerchantPromotionList.vue';
import UpgradeModal from '@/components/MerchantUpgradeModal.vue'

const route = useRoute();
const router = useRouter();

const activeTab = ref(route.query.tab === 'promotion' ? 'promotion' : 'coupon');
const setTab = (tab) => {
  activeTab.value = tab;
  router.replace({ query: { ...route.query, tab } });
};

const restaurantName = ref('');
const coupons = ref([]);
const promotions = ref([]);
const role = ref(''); 

const fetchDashboard = async () => {
  try {
    const res = await axios.get('/merchants/me/');
    const result = res.data.result;
    restaurantName.value = result.restaurant.name;
    coupons.value = result.coupons;
    promotions.value = result.promotions;
    role.value = result.merchantStatus.role;
  } catch (err) {
    console.error('取得商家資料失敗:', err);
  }
};

const showUpgradeModal = ref(false)
const upgradeMessage = ref(null)
const openUpgradeModal = (message = null) => {
  upgradeMessage.value = message
  showUpgradeModal.value = true
}

onMounted(fetchDashboard);
</script>
