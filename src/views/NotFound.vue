<template>
  <!-- 移除固定寬度限制，改為完全響應式 -->
  <div class="container-outer">
    <div class="container-inner">
      <!-- 響應式導航欄 -->
      <div class="navbar">
        <div class="navbar-title">找不到頁面</div>
      </div>
      
      <!-- 星星背景 -->
      <div class="stars-container">
        <!-- 使用CSS生成的星星，不需要任何DOM元素 -->
      </div>
      
      <!-- 主要內容區域 - 完全響應式 -->
      <div class="main-content">
        <div class="error-code">404</div>
        <h1 class="message">哎呀！您迷失在太空了</h1>
        <p class="sub-message">您尋找的頁面似乎漂浮到了宇宙的另一端</p>
        
        <svg class="astronaut" viewBox="0 0 24 24" ref="astronaut">
          <path fill="#ffffff" d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M17,13L12,18L7,13H10V9H14V13H17Z" />
        </svg>
        
        <button class="home-button" @click="navigateToHome">返回主頁</button>
      </div>
      
      <!-- 響應式飛船 -->
      <img class="ufo" src="@/assets/images/logo.png" alt="UFO Image" />
      
      <!-- 響應式行星 -->
      <div class="planet"></div>
      
      <!-- 響應式頁腳 -->
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

// 滑鼠移動事件處理 - 在小螢幕上禁用
const handleMouseMove = (e) => {
  if (!astronaut.value || window.innerWidth <= 768) return;
  
  const x = e.clientX / window.innerWidth - 0.5;
  const y = e.clientY / window.innerHeight - 0.5;
  
  astronaut.value.style.transform = `translateY(${y * 20}px) translateX(${x * 20}px) rotate(${x * 10}deg)`;
};

onMounted(() => {
  // 添加滑鼠移動事件
  window.addEventListener('mousemove', handleMouseMove);
});

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove);
});
</script>

<style scoped>
/* ===== 基礎響應式容器設定 ===== */
.container-outer {
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  background-color: #e5e7eb;
  padding: 0;
}

.container-inner {
  width: 100%;
  max-width: 100%;
  background-color: #0a0e29;
  color: #ffffff;
  position: relative;
  overflow: hidden;
  min-height: 100vh;
}

/* ===== 響應式斷點設定 ===== */
/* 小型手機 (320px+) */
@media (min-width: 320px) {
  .container-inner {
    width: 100%;
  }
}

/* 大型手機 (480px+) */
@media (min-width: 480px) {
  .container-outer {
    padding: 0 1rem;
  }
  
  .container-inner {
    border-radius: 0;
  }
}

/* 平板直向 (768px+) */
@media (min-width: 768px) {
  .container-outer {
    padding: 2rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }
  
  .container-inner {
    max-width: 800px;
    border-radius: 20px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  }
}

/* 桌面 (1024px+) */
@media (min-width: 1024px) {
  .container-inner {
    max-width: 1000px;
  }
}

/* 大螢幕 (1440px+) */
@media (min-width: 1440px) {
  .container-inner {
    max-width: 1200px;
  }
}

/* ===== 響應式導航欄 ===== */
.navbar {
  height: clamp(48px, 8vw, 64px);
  display: flex;
  align-items: center;
  padding: 0 clamp(1rem, 4vw, 2rem);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background-color: rgba(10, 14, 41, 0.9);
  position: relative;
  z-index: 10;
}

.navbar-title {
  font-weight: bold;
  font-size: clamp(2.2rem, 4vw, 1.5rem);
  flex-grow: 1;
  text-align: center;
  color: #ffffff;
}

/* ===== 響應式星星背景 ===== */
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
    radial-gradient(1px 1px at 85% 80%, white 100%, transparent 100%),
    radial-gradient(2px 2px at 80% 80%, white 100%, transparent 100%),
    radial-gradient(1px 1px at 75% 75%, white 100%, transparent 100%),
    radial-gradient(2px 2px at 80% 80%, #d4ff00 100%, transparent 100%),
    radial-gradient(1px 1px at 35% 35%, white 100%, transparent 100%),
    radial-gradient(1px 1px at 45% 15%, white 100%, transparent 100%),
    radial-gradient(1px 1px at 55% 25%, #ff6b6b 100%, transparent 100%),
    radial-gradient(1px 1px at 65% 35%, white 100%, transparent 100%),
    radial-gradient(1px 1px at 75% 45%, white 100%, transparent 100%),
    radial-gradient(2px 2px at 65% 35%, white 100%, transparent 100%),
    radial-gradient(1px 1px at 75% 45%, white 100%, transparent 100%),
    radial-gradient(3px 3px at 85% 55%, #ffffff 100%, transparent 100%),
    radial-gradient(1px 1px at 95% 65%, white 100%, transparent 100%),
    radial-gradient(1px 1px at 40% 30%, #6e8fff 100%, transparent 100%),
    radial-gradient(1px 1px at 90% 15%, white 100%, transparent 100%),
    radial-gradient(2px 2px at 30% 40%, white 100%, transparent 100%),
    radial-gradient(3px 3px at 65% 90%, white 100%, transparent 100%);
  background-repeat: repeat;
  background-size: clamp(150%, 200%, 300%) clamp(150%, 200%, 300%);
  opacity: 0.6;
  animation: twinkle 50s ease-in-out infinite;
}

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
    radial-gradient(1px 1px at 50% 20%, white 100%, transparent 100%),
    radial-gradient(1px 1px at 70% 35%, #ff6b6b 100%, transparent 100%),
    radial-gradient(1px 1px at 40% 45%, white 100%, transparent 100%),
    radial-gradient(1px 1px at 55% 55%, white 100%, transparent 100%),
    radial-gradient(1px 1px at 80% 65%, #6e8fff 100%, transparent 100%),
    radial-gradient(1px 1px at 25% 75%, white 100%, transparent 100%),
    radial-gradient(1px 1px at 90% 85%, white 100%, transparent 100%),
    radial-gradient(1px 1px at 30% 90%, #ff6b6b 100%, transparent 100%),
    radial-gradient(1px 1px at 60% 95%, white 100%, transparent 100%),
    radial-gradient(1px 1px at 75% 5%, white 100%, transparent 100%);
  background-repeat: repeat;
  background-size: clamp(150%, 200%, 300%) clamp(150%, 200%, 300%);
  opacity: 0.8;
  animation: twinkle 60s ease-in-out infinite reverse;
}

@keyframes twinkle {
  0% { opacity: 0.6; background-position: 0% 0%; }
  50% { opacity: 1; background-position: 100% 100%; }
  100% { opacity: 0.6; background-position: 0% 0%; }
}

/* ===== 響應式主要內容 ===== */
.main-content {
  text-align: center;
  z-index: 1;
  padding: clamp(1rem, 5vw, 3rem);
  position: relative;
  min-height: calc(100vh - clamp(96px, 16vw, 128px));
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: clamp(1rem, 3vw, 2rem);
}

.error-code {
  font-size: clamp(12rem, 15vw, 10rem);
  font-weight: bold;
  color: #6e8fff;
  text-shadow: 0 0 clamp(5px, 2vw, 15px) rgba(110, 143, 255, 0.7);
  margin: 100px 0 20px;
  line-height: 1;
}

.message {
  font-size: clamp(2.8rem, 5vw, 3.6rem);
  margin: 0;
  font-weight: bold;
}

.sub-message {
  font-size: clamp(1.4rem, 3.5vw, 2rem);
  margin: 0;
  opacity: 0.8;
  max-width: 90%;
  line-height: 1.5;
}

/* ===== 響應式太空人動畫 ===== */
.astronaut {
  width: clamp(80px, 20vw, 180px);
  height: clamp(80px, 20vw, 180px);
  animation: float 6s ease-in-out infinite;
  position: relative;
  z-index: 2;
  transition: transform 0.3s ease;
}

@keyframes float {
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-15px) rotate(3deg); }
  100% { transform: translateY(0px) rotate(0deg); }
}

/* ===== 響應式按鈕 ===== */
.home-button {
  background-color: #6e8fff;
  color: white;
  border: none;
  padding: clamp(0.6rem, 2vw, 1rem) clamp(1.2rem, 4vw, 2rem);
  font-size: clamp(0.9rem, 3vw, 1.3rem);
  border-radius: clamp(20px, 5vw, 40px);
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: bold;
  z-index: 2;
  touch-action: manipulation; /* 改善觸控體驗 */
}

.home-button:hover {
  background-color: #fb5800;
  transform: scale(1.05);
  box-shadow: 0 0 clamp(30px, 10vw, 60px) rgba(255, 255, 255, 0.5);
}

.home-button:active {
  transform: scale(0.98);
}

/* ===== 響應式UFO動畫 ===== */
.ufo {
  position: absolute;
  width: clamp(250px, 12vw, 300px);
  height: clamp(150px, 12vw, 100px);
  
  animation: moveUfo 17s linear infinite;
  top: clamp(60px, 15vh, 80px);
  z-index: 1;
}

@keyframes moveUfo {
  0% { 
    left: -20%; 
    transform: rotate(10deg) scale(2); 
  }
  50% { 
    left: 120%; 
    transform: rotate(-30deg) scale(0.3); 
  }
  51% { 
    left: 120%; 
    transform: rotate(-30deg) scale(0.3); 
  }
  100% { 
    left: -20%; 
    transform: rotate(10deg) scale(2); 
  }
}
@media screen and (min-width: 900px) {
  .ufo {
    left: 50%; /* 定位在畫面中央 */
    top:13%; /* 垂直置中 */
    transform: translateX(-50%); /* 水平置中 */
    animation: floatUfo 4s ease-in-out infinite;
    width: 100px;
    height: auto;
    
  }

  @keyframes floatUfo {
    0% {
      transform: translateX(-50%) translateY(0) scale(3);
    }
    50% {
      transform: translateX(-50%) translateY(-20px) scale(3);
    }
    100% {
      transform: translateX(-50%) translateY(0) scale(3);
    }
  }
}

/* ===== 響應式行星 ===== */
.planet {
  position: absolute;
  width: clamp(40px, 10vw, 100px);
  height: clamp(40px, 10vw, 100px);
  border-radius: 50%;
  background: linear-gradient(45deg, #ff6b6b, #7873f5);
  box-shadow: 0 0 clamp(10px, 3vw, 25px) rgba(120, 115, 245, 0.7);
  animation: rotatePlanet 20s linear infinite;
  bottom: clamp(20px, 8vw, 80px);
  right: clamp(20px, 5vw, 60px);
  z-index: 1;
}

@keyframes rotatePlanet {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* ===== 響應式頁腳 ===== */
.footer {
  padding: clamp(0.8rem, 3vw, 1.5rem);
  background-color: rgba(10, 14, 41, 0.9);
  text-align: center;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.7);
  font-size: clamp(0.7rem, 2.5vw, 0.9rem);
  position: relative;
  z-index: 10;
  line-height: 1.4;
}

/* ===== 特殊響應式處理 ===== */
/* 極小螢幕優化 */
@media (max-width: 320px) {
  .main-content {
    padding: 1rem 0.5rem;
  }
  
  .sub-message {
    font-size: 1.2rem;
  }
}

/* 平板橫向優化 */
@media (min-width: 768px) and (max-width: 1023px) and (orientation: landscape) {
  .main-content {
    min-height: calc(100vh - 100px);
    justify-content: space-around;
  }
  
  .error-code {
    font-size: clamp(8rem, 12vw, 8rem);
  }
}

/* 大螢幕優化 */
@media (min-width: 1440px) {
  .error-code {
    font-size: 9rem;
    top: 25px ;
  }
  
  .astronaut {
    width: 200px;
    height: 200px;
  }
  
  .ufo {
    width: 140px;
  }
  
  .planet {
    width: 120px;
    height: 120px;
  }
}

/* ===== 觸控設備優化 ===== */
@media (hover: none) and (pointer: coarse) {
  .home-button:hover {
    background-color: #6e8fff;
    transform: none;
    box-shadow: none;
  }
  
  .home-button:active {
    background-color: #fb5800;
    transform: scale(0.95);
  }
}

/* ===== 減少動畫偏好設置 ===== */
@media (prefers-reduced-motion: reduce) {
  .astronaut,
  .ufo,
  .planet,
  .stars-container::before,
  .stars-container::after {
    animation: none;
  }
  
  .home-button {
    transition: background-color 0.2s ease;
  }
}

/* ===== 高對比度模式支援 ===== */
@media (prefers-contrast: high) {
  .error-code {
    color: #ffffff;
    text-shadow: 2px 2px 4px #000000;
    
  }
  
  .home-button {
    border: 2px solid #ffffff;
  }
}
</style>