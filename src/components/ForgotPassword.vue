<template>
    <Navbar></Navbar>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-8 max-w-2xl">
      <!-- 忘記密碼卡片 -->
      <div class="bg-white rounded-lg shadow-sm">
        <!-- 標題區域 -->
        <div class="bg-orange-500 text-white px-6 py-4 rounded-t-lg">
          <h1 class="text-xl font-bold text-center">忘記密碼</h1>
        </div>
        
        <!-- 表單內容區域 -->
        <div class="p-8">
          <!-- 說明文字 -->
          <div class="text-center mb-8">
            <p class="text-gray-700 text-base leading-relaxed">
              請輸入註冊時的 Email📩，<br>我們會寄送重設密碼的連結給您。
            </p>
          </div>
          
          <!-- 郵件輸入區域 -->
          <div class="mb-8">
            <div class="relative">
              <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2v10a2 2 0 002 2z"/>
                </svg>
              </div>
              <input 
                v-model="email"
                type="email" 
                placeholder="Email"
                class="w-full pl-12 pr-4 py-4 bg-gray-100 border-0 rounded-lg text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:bg-white"
              />
            </div>
          </div>
          
          <!-- 確認送出按鈕 -->
          <div>
            <button 
              @click="handleSubmit"
              class="w-full bg-orange-500 hover:bg-blue-300 text-white font-medium py-4 px-6 rounded-lg cursor-pointer"
            >
              確認送出➡️
            </button>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from '@/axios';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';

const email = ref('');

const handleSubmit = async () => {
  if (!email.value) {
    alert('請輸入郵件地址');
    return;
  }
  
  try {
    const response = await axios.post('/auth/forgot-password/', {
      email: email.value
    });
    
    // 成功時顯示訊息
    alert('重設密碼郵件已發送，請檢查您的郵箱');
    email.value = ''; // 清空輸入框
    
  } catch (error) {
    console.error('發送重設密碼郵件失敗:', error);
    
    // 檢查錯誤回應的詳細資訊
    if (error.response) {
      const status = error.response.status;
      const data = error.response.data;
      
      console.log('錯誤狀態:', status);
      console.log('錯誤資料:', data);
      console.log('完整錯誤回應:', error.response);
      
      // 根據您修正後的後端來處理
      if (status === 404) {
        // 後端正確處理User.DoesNotExist，返回404
        alert(data.error || '找不到此郵件地址的用戶');
      } else if (status === 400) {
        // 請求格式錯誤或缺少email
        alert(data.error || '請求格式錯誤，請檢查郵件地址');
      } else if (status === 500) {
        // 郵件發送失敗
        alert(data.error || '郵件發送失敗，請稍後再試');
      } else {
        alert('發生未知錯誤，請稍後再試');
      }
    } else if (error.request) {
      // 網路連線問題
      console.log('網路請求錯誤:', error.request);
      alert('網路連線錯誤，請檢查網路連線');
    } else {
      // 其他錯誤
      console.log('其他錯誤:', error.message);
      alert('發生未知錯誤，請稍後再試');
    }
  }
};
</script>