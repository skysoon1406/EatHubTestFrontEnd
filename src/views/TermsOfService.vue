<template>
  <div class="min-h-screen bg-base-100 text-base-content">
    <Navbar></Navbar>

    <main class="max-w-3xl mx-auto px-4 py-10">
      <h1 class="text-2xl font-bold mb-6 text-center">服務條款</h1>

      <section class="mb-6">
        <h2 class="text-lg font-semibold mb-2">一、服務簡介</h2>
        <p class="leading-relaxed">
          EatHub 為非商業性質的學習專案，目的是透過實作與展示網站功能，提供類似社群與餐飲推薦平台的互動體驗。
          本網站並非正式商業平台，所有內容僅供學習展示與非正式參考之用。
        </p>
      </section>

      <section class="mb-6">
        <h2 class="text-lg font-semibold mb-2">二、使用者資格</h2>
        <p class="leading-relaxed">
          本網站未限制未成年人註冊，若您為 13 歲以下之使用者，建議由家長或監護人陪同使用。
        </p>
      </section>

      <section class="mb-6">
        <h2 class="text-lg font-semibold mb-2">三、個人資料保護</h2>
        <p class="leading-relaxed">
          本網站會收集電子郵件、使用者名稱與評論內容等個人資料，並遵守《個人資料保護法》妥善保護。
          資料僅用於帳號驗證、功能展示與改善體驗，並不會用於商業用途或提供給第三方。
        </p>
      </section>

      <section class="mb-6">
        <h2 class="text-lg font-semibold mb-2">四、使用者內容授權</h2>
        <p class="leading-relaxed">
          使用者在本網站上傳之評論、照片與其他內容，視為授權 EatHub 團隊於展示、研究與非營利公開範圍內使用。
        </p>
      </section>

      <section class="mb-6">
        <h2 class="text-lg font-semibold mb-2">五、禁止行為</h2>
        <ul class="list-disc ml-6 space-y-1 text-sm">
          <li>發佈違法、猥褻、誹謗或不實資訊</li>
          <li>上傳未經授權的肖像或著作內容</li>
          <li>試圖破解、干擾網站運作或其他使用者帳號</li>
        </ul>
      </section>

      <section class="mb-6">
        <h2 class="text-lg font-semibold mb-2">六、第三方服務說明</h2>
        <p class="leading-relaxed">
          本網站整合 Google Place API、Cloudinary 與 OpenAI 等第三方服務。上述服務之內容與穩定性非我們所能控制，使用時請留意其各自的服務條款與隱私政策。
        </p>
      </section>

      <section class="mb-6">
        <h2 class="text-lg font-semibold mb-2">七、免責聲明</h2>
        <p class="leading-relaxed">
          EatHub 為教育展示用途，不保證資訊即時性與正確性。所有推薦資訊與評論僅供參考，不代表實際商家或合作立場。
        </p>
      </section>

      <section>
        <h2 class="text-lg font-semibold mb-2">八、條款更新</h2>
        <p class="leading-relaxed">
          本網站保留修改服務條款之權利。條款更新後將於本頁公佈，請您不定期查看。
        </p>
      </section>
    </main>

    <Footer></Footer>
  </div>

</template>

<script setup>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
</script>

<style scoped>

.fade-enter-active {
  transition: opacity 0.5s;
}
.fade-enter-from {
  opacity: 0;
}

</style>
