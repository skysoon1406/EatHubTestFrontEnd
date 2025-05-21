<template>
    <div v-if="show" class="modal-overlay" @click.self="closeModal">
      <div class="modal-container">
        <!-- 使用者頭像與名稱 -->
        <div class="user-info">
          <img :src="userAvatar" alt="頭像" class="avatar border border-black" />
          <span class="username text-black">{{ userName }}</span>
        </div>
  
        <!-- 星星評分 -->
        <div class="rating">
          <span 
            v-for="star in 5" 
            :key="star" 
            @click="setRating(star)" 
            :class="['star', { active: star <= rating }]"
          >
            ★
          </span>
        </div>
  
        <!-- 評論區 -->
        <textarea 
          v-model="content" 
          placeholder="請輸入評論..." 
          class="review-textarea placeholder-gray-300 px-2 py-1 text-s text-black"
        ></textarea>
  
    
        <div v-if="imageUrl" class="image-preview">
                    <img :src="imageUrl" alt="預覽圖片" />
        </div>
      
        <div class="flex flex-col items-center mx-auto gap-2">
            <label class="text-black border border-black text-center w-full py-1 rounded-full cursor-pointer" >
                上傳相片
                <input type="file" @change="handleFileUpload" hidden/>
                
            </label>
            <button @click="submitReview" class="border bg-black text-white w-full text-center py-1 rounded-full cursor-pointer">送出評論</button>
          
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const props = defineProps({
    show: Boolean,
    userName: String,
    userAvatar: String,
  });
  
  const emit = defineEmits(['close', 'submit']);
  

  const content = ref('');
  const rating = ref(0);
  const imageUrl = ref(null);
  
  // 關閉 Modal
  const closeModal = () => {
    emit('close');
  };
  
  // 設定評分
  const setRating = (star) => {
    rating.value = star;
  };
  
  // 圖片上傳處理
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      imageUrl.value = URL.createObjectURL(file);
    }
  };
  
  // 送出評論
  const submitReview = () => {
    if (content.value.trim()) {
      emit('submit', {
        content: content.value.trim(),
        rating: rating.value,
        imageUrl: imageUrl.value,
      });
      content.value = '';
      rating.value = 0;
      imageUrl.value = null;
      closeModal();
    }
  };
  </script>
  
  <style scoped>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.6);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
  }
  
  .modal-container {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    width: 80%;
    max-width: 400px;
  }
  
  .user-info {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 10px;
  }
  
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  
  .rating {
    display: flex;
    gap: 5px;
  }
  
  .star {
    font-size: 24px;
    cursor: pointer;
    color: gray;
  }
  
  .star.active {
    color: #ff0000;
    font-weight: bold;
  }
  
.review-textarea {
    width: 100%;
    height: 100px;
    margin: 10px 0;
    border: 1px solid black;
    border-radius: 5px;
  }
  
  .image-preview img {
    max-width: 100%;
    margin: 10px 0;
  }
  

  </style>
  