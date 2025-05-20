<template>
<Navbar></Navbar>
  <div class="max-w-3xl mx-auto px-4 py-8 text-black text-base leading-relaxed">
    <h1 class="text-2xl md:text-3xl font-bold text-center mb-6">隱私權條款</h1>

    <p class="mb-6">
      歡迎您使用「尋飽」（eathub，以下簡稱「本網站」或「我們」）所提供的各項服務。為了保護您的個人資料與隱私權，我們根據相關法規制定本《隱私權條款》，請您詳閱以下內容。
    </p>

    <section class="mb-8">
      <h2 class="text-xl font-semibold mb-2">一、我們如何蒐集您的資料</h2>
      <ul class="list-disc pl-6 space-y-1">
        <li>註冊資訊：如姓名、電子郵件、使用者名稱、密碼等。</li>
        <li>使用紀錄：如您瀏覽的頁面、搜尋關鍵字、點選的餐廳與收藏行為。</li>
        <li>互動內容：如評論、留言、上傳圖片等您主動輸入的內容。</li>
        <li>設備資訊：我們僅使用 Cookie 記錄登入狀態。我們不會主動記錄或儲存您的 IP 位置、瀏覽器類型或裝置資訊。</li>
      </ul>
    </section>

    <section class="mb-8">
      <h2 class="text-xl font-semibold mb-2">二、資料使用目的</h2>
      <ul class="list-disc pl-6 space-y-1">
        <li>驗證您的身份並提供帳號相關服務</li>
        <li>優化推薦演算法，提供符合您偏好的餐廳資訊</li>
        <li>處理您提出的問題、建議或服務請求</li>
        <li>發送服務更新、行銷活動或重要通知（您可選擇取消訂閱）</li>
        <li>符合法律義務或主管機關的要求</li>
      </ul>
    </section>

    <section class="mb-8">
      <h2 class="text-xl font-semibold mb-2">三、Cookie 與登入憑證技術</h2>
      <p>
        本網站使用 Cookie 技術以記錄登入狀態與提升使用體驗。登入後的驗證憑證（token）會存放於 Cookie 中，作為辨識身份之用。您可以透過瀏覽器設定限制或停用 Cookie，但可能會導致部分功能無法正常運作。
      </p>
    </section>

    <section class="mb-8">
      <h2 class="text-xl font-semibold mb-2">四、第三方服務</h2>
      <p class="mb-2">
        本網站提供 Google 第三方登入功能。當您使用該登入方式時，Google 會提供您授權的個人資料（如姓名與電子郵件），我們僅會使用這些資訊來建立帳號與進行身份驗證。
      </p>
      <p>
        我們不會與 Google 或其他第三方共享您在網站上的使用行為，也不會用於行銷或其他目的。此外，本網站未使用 Google Analytics、Hotjar 等網站追蹤分析工具。
      </p>
    </section>

    <section class="mb-8">
      <h2 class="text-xl font-semibold mb-2">五、您的權利</h2>
      <ul class="list-disc pl-6 space-y-1">
        <li>查詢或閱覽您的個人資料</li>
        <li>請求更正或刪除錯誤資料</li>
        <li>撤回同意，停止資料使用（可能導致部分功能無法使用）</li>
      </ul>
      <p class="mt-2">
        如需行使上述權利，請透過客服信箱與我們聯繫，我們將於合理時間內處理。
      </p>
    </section>

    <section class="mb-8">
      <h2 class="text-xl font-semibold mb-2">六、資料保存與安全措施</h2>
      <p class="mb-2">
        我們致力於保護您的個人資料安全，採取包括但不限於以下措施：
      </p>
      <ul class="list-disc pl-6 space-y-1">
        <li>密碼經過加密儲存，不以明文保留</li>
        <li>僅限授權人員存取資料</li>
        <li>定期清除不再使用或過期的資料</li>
      </ul>
      <p class="mt-2">
        資料的保存期間依其使用目的而定，最長不超過法令所允許之期限。
      </p>
    </section>

    <section>
      <h2 class="text-xl font-semibold mb-2">七、條款修訂</h2>
      <p>
        我們保留隨時修改本條款的權利，任何變更將公告於本網站，並註明更新日期。若您在條款變更後繼續使用本網站，即視為您已同意新的內容。
      </p>
    </section>

    <p class="mt-6 text-sm text-black">最新更新日期：2025 年 5 月 20 日</p>
  </div>
  <Footer></Footer>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
</script>