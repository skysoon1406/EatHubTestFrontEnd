<template>
  <!-- 外層容器設定固定寬度模擬手機螢幕 -->
  <div class="container-outer">
    <div class="container-inner">
      <!-- 導航欄 -->
      <div class="navbar">
        <div class="navbar-title">找不到頁面</div>
      </div>
      
      <!-- 星星背景 - 不再需要ref -->
      <div class="stars-container">
        <!-- 使用CSS生成的星星，不需要任何DOM元素 -->
      </div>
      
      <!-- 主要內容區域 -->
      <div class="main-content">
        <div class="error-code">404</div>
        <h1 class="message">哎呀！您迷失在太空了</h1>
        <p class="sub-message">您尋找的頁面似乎漂浮到了宇宙的另一端</p>
        
        <svg class="astronaut" viewBox="0 0 24 24" ref="astronaut">
          <path fill="#ffffff" d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M17,13L12,18L7,13H10V9H14V13H17Z" />
        </svg>
        
        <button class="home-button" @click="navigateToHome">返回主頁</button>
      </div>
      
      <!-- 飛船 -->
      <img class="ufo w-24 h-24 scale-250" src="@/assets/images/logo.png" alt="UFO Image" />
      
      <!-- 行星 -->
      <div class="planet"></div>
      
      <!-- 頁腳 -->
      <div class="footer">
        © {{ currentYear }} EatHub餐廳推薦 | 所有權利保留
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const astronaut = ref(null);

// 計算當前年份
const currentYear = computed(() => new Date().getFullYear());

// 導航到首頁
const navigateToHome = () => {
  router.push('/');
};

// 滑鼠移動事件處理
const handleMouseMove = (e) => {
  if (!astronaut.value || window.innerWidth <= 640) return;
  
  const x = e.clientX / window.innerWidth - 0.5;
  const y = e.clientY / window.innerHeight - 0.5;
  
  astronaut.value.style.transform = `translateY(${y * 20}px) translateX(${x * 20}px) rotate(${x * 10}deg)`;
};

// 只使用一個onMounted鉤子
onMounted(() => {
  // 添加滑鼠移動事件
  window.addEventListener('mousemove', handleMouseMove);
});

// 使用onUnmounted來清理事件監聽
onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove);
});
</script>

<style scoped>
/* 與您的前端設計保持一致的外層與內層容器 */
.container-outer {
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  background-color: #e5e7eb; /* bg-gray-300 */
}

.container-inner {
  width: 100%;
  background-color: #0a0e29; /* 深色背景配合太空主題 */
  color: #ffffff;
  position: relative;
  overflow: hidden;
}

@media (min-width: 640px) {  /* sm breakpoint */
  .container-inner {
    width: 390px;
    min-height: 100vh;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
  }
}

/* 導航欄 */
.navbar {
  height: 64px;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background-color: rgba(10, 14, 41, 0.9);
  position: relative;
  z-index: 10;
}

.navbar-title {
  font-weight: bold;
  font-size: 1.25rem;
  flex-grow: 1;
  text-align: center;
  color: #ffffff;
}

/* 頁腳 */
.footer {
  padding: 1rem;
  background-color: rgba(10, 14, 41, 0.9);
  text-align: center;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.875rem;
  position: relative;
  z-index: 10;
}

/* 全新的CSS星星背景 */
.stars-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  z-index: 0;
  background: radial-gradient(ellipse at bottom, #0a0e29 0%, #050714 100%);
}

/* 使用多個偽元素層創建星星 */
.stars-container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-image: 
    radial-gradient(1px 1px at 25% 10%, white 100%, transparent 100%),
    radial-gradient(4px 4px at 10% 20%, white 100%, transparent 100%),
    radial-gradient(1px 1px at 15% 15%, white 100%, transparent 100%),
    radial-gradient(3px 3px at 20% 25%, #d4ff00 100%, transparent 100%),
    radial-gradient(1px 1px at 35% 35%, white 100%, transparent 100%),
    radial-gradient(1px 1px at 45% 15%, white 100%, transparent 100%),
    radial-gradient(1px 1px at 55% 25%, #ff6b6b 100%, transparent 100%),
    radial-gradient(1px 1px at 65% 35%, white 100%, transparent 100%),
    radial-gradient(1px 1px at 75% 45%, white 100%, transparent 100%),
    radial-gradient(3px 3px at 65% 35%, white 100%, transparent 100%),
    radial-gradient(1px 1px at 75% 45%, white 100%, transparent 100%),
    radial-gradient(4px 4px at 85% 55%, #ffffff 100%, transparent 100%),
    radial-gradient(1px 1px at 95% 65%, white 100%, transparent 100%),
    radial-gradient(2px 2px at 40% 30%, #6e8fff 100%, transparent 100%),
    radial-gradient(2px 2px at 90% 15%, white 100%, transparent 100%),
    radial-gradient(3px 3px at 30% 40%, white 100%, transparent 100%),
    radial-gradient(1px 1px at 60% 50%, #6e8fff 100%, transparent 100%),
    radial-gradient(2px 2px at 75% 60%, white 100%, transparent 100%),
    radial-gradient(1px 1px at 35% 70%, white 100%, transparent 100%),
    radial-gradient(3px 3px at 85% 75%, #ff6b6b 100%, transparent 100%),
    radial-gradient(2px 2px at 20% 80%, white 100%, transparent 100%),
    radial-gradient(1px 1px at 45% 85%, #6e8fff 100%, transparent 100%),
    radial-gradient(5px 5px at 65% 90%, white 100%, transparent 100%);
  background-repeat: repeat;
  background-size: 200% 200%;
  opacity: 0.5;
  animation: twinkle 50s ease-in-out infinite;
}

/* 第二層星星，不同位置 */
.stars-container::after {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-image: 
    radial-gradient(1px 1px at 5% 5%, white 100%, transparent 100%),
    radial-gradient(1px 1px at 15% 25%, #6e8fff 100%, transparent 100%),
    radial-gradient(2px 2px at 50% 20%, white 100%, transparent 100%),
    radial-gradient(2px 2px at 70% 35%, #ff6b6b 100%, transparent 100%),
    radial-gradient(1px 1px at 40% 45%, white 100%, transparent 100%),
    radial-gradient(1px 1px at 55% 55%, white 100%, transparent 100%),
    radial-gradient(2px 2px at 80% 65%, #6e8fff 100%, transparent 100%),
    radial-gradient(1px 1px at 25% 75%, white 100%, transparent 100%),
    radial-gradient(1px 1px at 90% 85%, white 100%, transparent 100%),
    radial-gradient(2px 2px at 30% 90%, #ff6b6b 100%, transparent 100%),
    radial-gradient(1px 1px at 60% 95%, white 100%, transparent 100%),
    radial-gradient(1px 1px at 75% 5%, white 100%, transparent 100%);
  background-repeat: repeat;
  background-size: 200% 200%;
  opacity: 0.8;
  animation: twinkle 60s ease-in-out infinite reverse;
}

@keyframes twinkle {
  0% { opacity: 0.5; background-position: 0% 0%; }
  50% { opacity: 1; background-position: 100% 100%; }
  100% { opacity: 0.5; background-position: 0% 0%; }
}

.main-content {
  text-align: center;
  z-index: 1;
  padding: 2rem;
  position: relative;
  min-height: calc(100vh - 128px); /* 減去導航欄和頁腳的高度 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.error-code {
  font-size: 8rem;
  font-weight: bold;
  color: #6e8fff;
  text-shadow: 0 0 10px rgba(110, 143, 255, 0.7);
  margin-bottom: 1rem;
  line-height: 1;
}

.message {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.sub-message {
  font-size: 1.1rem;
  margin-bottom: 2rem;
  opacity: 0.8;
}

.astronaut {
  width: 150px;
  height: 150px;
  margin-bottom: 2rem;
  animation: float 6s ease-in-out infinite;
  position: relative;
  z-index: 2;
}

@keyframes float {
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
  100% { transform: translateY(0px) rotate(0deg); }
}

.home-button {
  background-color: #6e8fff;
  color: white;
  border: none;
  padding: 0.8rem 1.5rem;
  font-size: 1.2rem;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: bold;
  margin-top: 1rem;
  z-index: 2;
}

.home-button:hover {
  background-color: #fb5800;
  transform: scale(1.05);
  box-shadow: 0 0 15px rgba(255, 217, 170, 0.915);
}

.ufo {
  position: absolute;
  width: 100px;
  height: auto;
  animation: moveUfo 15s linear infinite;
  top: 100px;
  z-index: 1;
}

@keyframes moveUfo {
  0% { left: -150px; transform: rotate(10deg); }
  50% { left: calc(100% + 150px); transform: rotate(-10deg); }
  51% { left: calc(100% + 150px); transform: rotate(170deg); }
  100% { left: -150px; transform: rotate(190deg); }
}

.planet {
  position: absolute;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(45deg, #ff6b6b, #7873f5);
  box-shadow: 0 0 20px rgba(120, 115, 245, 0.7);
  animation: rotatePlanet 20s linear infinite;
  bottom: 50px;
  right: 50px;
  z-index: 1;
}

@keyframes rotatePlanet {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .error-code {
    font-size: 5rem;
  }
  
  .message {
    font-size: 1.5rem;
  }
  
  .astronaut {
    width: 100px;
    height: 100px;
  }
  
  .planet {
    width: 60px;
    height: 60px;
    right: 20px;
    bottom: 20px;
  }
  
  .ufo {
    width: 70px;
  }
}
</style>