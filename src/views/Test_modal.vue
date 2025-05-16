<template>
    <div>
      <button @click="showModal = true" class="border border-white px-4 py-2 rounded-full">新增評論</button>


    <!-- userName 跟 userAvatar 待更新成變數 -->
      <CommentModal
        :show="showModal"
        userName="UserName"
        userAvatar="https://cdn-icons-png.flaticon.com/512/266/266033.png"
        @close="showModal = false"
        @submit="handleComment"
      />
  
    <!-- 顯示在畫面上的樣式 -->
      <ul>
        <li v-for="(comment, index) in comments" :key="index">
          <p>使用者：{{ comment.userName }}</p>
          <p>評分：{{ comment.rating }} 星</p>
          <p>留言：{{ comment.comment }}</p> 
          <img v-if="comment.imageUrl" :src="comment.imageUrl" alt="上傳圖片" />
        </li>
      </ul>
    </div>
  </template>
  
  <script setup>
//   需要遷入詳細頁面的部分
  import { ref } from 'vue';
  import CommentModal from '../components/AddComment.vue';
  
  const showModal = ref(false);
  const comments = ref([]);

//   下面 userName 也待更新
  
  const handleComment = (data) => {
    comments.value.push({
      userName: '測試用戶',
      comment: data.comment,
      rating: data.rating,
      imageUrl: data.imageUrl,
    });
  };
  </script>
  

  