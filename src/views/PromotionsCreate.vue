<template>
    <Navbar></Navbar>
  <div class="p-6 max-w-md mx-auto">
    <h2 class="text-xl font-bold border-brown-800 pl-2 mb-6">新增動態</h2>

    <form @submit.prevent="submitPromotion" enctype="multipart/form-data" class="space-y-5">
      <input
        v-model="form.title"
        type="text"
        placeholder="動態標題"
        required
        class="w-full border border-gray-400 rounded px-4 py-2"
      />

      <textarea
        v-model="form.description"
        placeholder="請輸入動態內容…"
        rows="5"
        required
        class="w-full border border-gray-400 rounded px-4 py-2"
      ></textarea>

      <div class="border border-gray-400 rounded p-4 text-center">
        <label class="block mb-2 text-gray-600 text-sm">請上傳 JPG、PNG、HEIC 格式的圖片，檔案大小不應超過 1MB，以確保圖片品質顯示。</label>
        <input type="file" @change="handleImage" accept="image/*" class="mx-auto" />
        <img v-if="previewUrl" :src="previewUrl" class="mt-4 w-full rounded shadow" />
      </div>

      <button type="submit" class="w-full bg-black text-white  py-2 rounded-full font-bold">確認送出</button>
    </form>
  </div>
<Footer></Footer>
</template>

<script setup>
import { ref } from 'vue'
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import axios from '@/axios';


const form = ref({
  title: '',
  description: '',
  image: null,
})

const previewUrl = ref(null)

function handleImage(event) {
  const file = event.target.files[0]
  if (file) {
    form.value.image = file
    previewUrl.value = URL.createObjectURL(file)
  }
}

async function submitPromotion() {
  const formData = new FormData()
  formData.append('title', form.value.title)
  formData.append('description', form.value.description)
  if (form.value.image) {
    formData.append('image', form.value.image)
  }

  try {
    const response = await axios.post(
      `/promotions/`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
      }
    )

    alert('動態已成功建立！')
    form.value.title = ''
    form.value.description = ''
    form.value.image = null
    previewUrl.value = null

  } catch (error) {
    if (error.response && error.response.data) {
        const errors = error.response.data
        if (typeof errors.error === 'string') {
            alert('送出失敗：' + errors.error)
            return
        }
        let message = ''
        for (const key in errors){
            const value = Array.isArray(errors[key]) ? errors[key][0] : errors[key]
            message += `${key}：${value}\n`
        }
      alert('送出失敗：\n' + message)
    } else {
      alert('送出失敗，請確認網路或伺服器狀態')
    }
  }
}
</script>

<style scoped>
.border-brown-800 {
  border-color: #4b2e2e;
}
</style>