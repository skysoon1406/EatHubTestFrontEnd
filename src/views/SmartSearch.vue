<template>
  <div class="p-4 max-w-md mx-auto">
    <!-- 選擇區 -->
    <div class="bg-orange-100 p-4 rounded-lg shadow-md mb-4">
      <h2 class="text-center font-bold mb-2">下一餐吃什麼？</h2>
      <div class="grid grid-cols-3 gap-2 mb-4">
        <select v-model="form.flavors" class="p-2 rounded">
          <option disabled value="">口味</option>
          <option>泰式</option>
          <option>台式</option>
          <option>素食</option>
        </select>
        <select v-model="form.mains" class="p-2 rounded">
          <option disabled value="">主食</option>
          <option>飯</option>
          <option>麵</option>
        </select>
        <select v-model="form.staples" class="p-2 rounded">
          <option disabled value="">主菜</option>
          <option>雞</option>
          <option>豬</option>
          <option>牛</option>
        </select>
      </div>
      <button
        @click="submitForm"
        class="bg-orange-500 text-white w-full py-2 rounded hover:bg-orange-600"
      >
        幫我選 🍽️
      </button>
    </div>

    <!-- 餐廳推薦區 -->
    <div class="bg-gray-50 p-4 rounded-lg shadow">
      <h3 class="text-lg font-bold mb-2">為您推薦</h3>

      <div v-for="(r, index) in displayList" :key="index" class="bg-white shadow p-3 rounded mb-2 flex">
        <div class="w-16 h-16 bg-gray-200 rounded mr-3">
          <img v-if="r.img_url" :src="r.img_url" class="w-full h-full object-cover rounded" />
        </div>
        <div class="flex-1">
          <p class="font-bold">{{ r.name }}</p>
          <p class="text-sm text-gray-600">⭐ {{ r.google_rating || "?" }}</p>
          <p class="text-sm text-gray-600">{{ r.address }}</p>
        </div>
        <div class="pl-2 text-gray-400">🤍</div>
      </div>

      <div v-if="results.length > 3" class="text-right">
        <button @click="showAll = !showAll" class="text-orange-500 mt-2 underline">
          {{ showAll ? '顯示較少' : 'Read More →' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
// import axios from 'axios'
import axios from '../axios';
import '../assets/styles/app.css';

const form = ref({
  flavors: '',
  mains: '',
  staples: ''
})

const results = ref([])
const showAll = ref(false)

const displayList = computed(() =>
  showAll.value ? results.value : results.value.slice(0, 3)
)

const submitForm = async () => {
  try {
    const response = await axios.post('http://localhost:8000/api/v1/restaurants/smartsearch/', {
      flavors: [form.value.flavors],
      mains: [form.value.mains],
      staples: [form.value.staples]
    })
    results.value = response.data.results || []
  } catch (error) {
    console.error('API 請求錯誤', error)
    console.error('🔥 錯誤內容:', err.response?.data || err)
    alert('取得推薦失敗')
  }
}
</script>
