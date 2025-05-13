<template>
  <div class="p-4 max-w-md mx-auto">
    <!-- 選擇區 -->
    <div class="bg-orange-100 p-4 rounded-lg shadow-md mb-4">
      <h2 class="text-center font-bold mb-2">下一餐吃什麼？</h2>

      <!-- 口味 -->
      <div class="mb-3">
        <label class="font-semibold block mb-1">口味</label>
        <div class="flex gap-3">
          <label><input type="checkbox" value="泰式" v-model="form.flavors" /> 泰式</label>
          <label><input type="checkbox" value="台式" v-model="form.flavors" /> 台式</label>
          <label><input type="checkbox" value="素食" v-model="form.flavors" /> 素食</label>
          <label><input type="checkbox" value="麻辣" v-model="form.flavors" /> 麻辣</label>
          <label><input type="checkbox" value="日式" v-model="form.flavors" /> 日式</label>
          <label><input type="checkbox" value="清蒸" v-model="form.flavors" /> 清蒸</label>
        </div>
      </div>

      <!-- 主食 -->
      <div class="mb-3">
        <label class="font-semibold block mb-1">主食</label>
        <div class="flex gap-3">
          <label><input type="checkbox" value="飯" v-model="form.mains" /> 飯</label>
          <label><input type="checkbox" value="麵" v-model="form.mains" /> 麵</label>
        </div>
      </div>

      <!-- 主菜 -->
      <div class="mb-4">
        <label class="font-semibold block mb-1">主菜</label>
        <div class="flex gap-3">
          <label><input type="checkbox" value="雞" v-model="form.staples" /> 雞</label>
          <label><input type="checkbox" value="豬" v-model="form.staples" /> 豬</label>
          <label><input type="checkbox" value="牛" v-model="form.staples" /> 牛</label>
          <label><input type="checkbox" value="羊" v-model="form.staples" /> 羊</label>
          <label><input type="checkbox" value="魚" v-model="form.staples" /> 魚</label>
        </div>
      </div>

      <button
        @click="submitForm"
        class="bg-orange-500 text-white w-full py-2 rounded hover:bg-orange-600"
      >
        幫我選 🍽️
      </button>
    </div>
  </div>

  <div v-if="results.length > 0" class="bg-white rounded shadow p-4">
  <h3 class="text-lg font-semibold mb-2">推薦餐廳 🍜</h3>
  <ul class="space-y-2">
    <li v-for="r in results" :key="r.placeId" class="border-b pb-2">
      <div class="font-bold">{{ r.name }}</div>
      <div class="text-sm text-gray-600">{{ r.address }}</div>
      <div class="text-sm text-yellow-600">⭐ {{ r.rating }}</div>
    </li>
  </ul>
</div>
</template>

<script setup>
import { ref, computed } from 'vue'
// import axios from 'axios'
import axios from '../axios';
import '../assets/styles/app.css';

const form = ref({
  flavors: [],
  mains: [],
  staples: []
})
const results = ref([])
const submitForm = async () => {
  if (
    form.value.flavors.length === 0 &&
    form.value.mains.length === 0 &&
    form.value.staples.length === 0
  ) {
    alert('請至少選擇一個條件')
    return
  }

  try {
    const res = await axios.post('http://localhost:8000/api/v1/restaurants/smartsearch/', {
      flavors: form.value.flavors,
      mains: form.value.mains,
      staples: form.value.staples
    })
    results.value = res.data.results
    console.log('推薦結果：', res.data)
    alert('推薦完成！請查看 console 🔍')
  } catch (err) {
    console.error('發生錯誤：', err.response?.data || err)
    alert('取得推薦失敗')
  }
}
</script>