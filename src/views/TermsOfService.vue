<template>
  <div class="min-h-screen bg-base-100 text-base-content">
    <Navbar></Navbar>

    <main class="max-w-3xl mx-auto px-4 py-10">
      <h1 class="text-2xl font-bold mb-6 text-center">服務條款</h1>

      <details open  class="mb-4 bg-base-200 p-4 rounded-lg shadow-md">
        <summary class="text-lg font-semibold cursor-pointer">📘 一、服務簡介</summary>
        <p class="mt-2 leading-relaxed text-sm">
          EatHub 為非商業性質的學習專案，目的是透過實作與展示網站功能，提供餐飲推薦平台的互動體驗。
          本網站並非正式商業平台，所有內容僅供學習展示與非正式參考之用。
        </p>
      </details>

      <details  open  class="mb-4 bg-base-200 p-4 rounded-lg shadow-md">
        <summary class="text-lg font-semibold cursor-pointer">👤 二、使用者資格</summary>
        <p class="mt-2 leading-relaxed text-sm">
          使用本網站即表示您同意本服務條款。
          本網站未限制未成年人註冊，若您為 13 歲以下之使用者，建議由家長或監護人陪同使用。
        </p>
      </details>

      <details open  class="mb-4 bg-base-200 p-4 rounded-lg shadow-md">
          <summary class="...">🔐 三、個人資料保護</summary>
          <p class="mt-2 leading-relaxed text-sm mb-2">本網站會蒐集以下個人資料：</p>
          <ul class="list-disc ml-6 text-sm space-y-1 mb-4">
            <li>電子郵件地址</li>
            <li>使用者名稱 / 姓名</li>
            <li>留言與上傳內容</li>
          </ul>
          <p class="mt-2 leading-relaxed text-sm mb-2">蒐集資料僅用於下列目的：</p>
          <ul class="list-disc ml-6 text-sm space-y-1 mb-4">
            <li>驗證使用者身份</li>
            <li>提供客製化服務（如留言、收藏、優惠券等）</li>
            <li>優化網站體驗與功能展示</li>
          </ul>
          <p class="leading-relaxed text-sm">
            您的資料不會用於商業行銷，亦不會提供給第三方，除非為實現網站功能所必要（如第三方 API 整合時之必要資料交換）。
          </p>
      </details>

      <details open  class="mb-4 bg-base-200 p-4 rounded-lg shadow-md">
        <summary class="text-lg font-semibold cursor-pointer">📝 四、使用者內容授權</summary>
        <p class="mt-2 leading-relaxed text-sm">
          使用者在本網站上傳之評論、照片與其他內容，視為授權 EatHub 團隊於展示、研究與非營利公開範圍內使用。
        </p>
      </details>

      <details open  class="mb-4 bg-base-200 p-4 rounded-lg shadow-md">
        <summary class="text-lg font-semibold cursor-pointer">🚫 五、禁止行為</summary>
        <ul class="mt-2 list-disc ml-6 space-y-1 text-sm">
          <li>發佈違法、猥褻、誹謗或不實資訊</li>
          <li>上傳未經授權的肖像或著作內容</li>
          <li>試圖破解、干擾網站運作或其他使用者帳號</li>
        </ul>
      </details>

      <details open  class="mb-4 bg-base-200 p-4 rounded-lg shadow-md">
        <summary class="text-lg font-semibold cursor-pointer">🔗 六、第三方服務說明</summary>
        <p class="mt-2 leading-relaxed text-sm">
          本網站整合 Google Place API、Cloudinary 與 OpenAI 等第三方服務。上述服務之內容與穩定性非我們所能控制，使用時請留意其各自的服務條款與隱私政策。
        </p>
      </details>

      <details open   class="mb-4 bg-base-200 p-4 rounded-lg shadow-md">
        <summary class="text-lg font-semibold cursor-pointer">⚠️ 七、免責聲明</summary>
        <p class="mt-2 leading-relaxed text-sm">
          EatHub 為教育展示用途，不保證資訊即時性與正確性。所有推薦資訊與評論僅供參考，不代表實際商家或合作立場。
        </p>
      </details>

      <details  open  class="mb-4 bg-base-200 p-4 rounded-lg shadow-md">
        <summary class="text-lg font-semibold cursor-pointer">🛠️ 八、條款更新</summary>
        <p class="mt-2 leading-relaxed text-sm">
          本網站保留修改服務條款之權利。條款更新後將於本頁公佈，請您不定期查看。
        </p>
      </details>
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
