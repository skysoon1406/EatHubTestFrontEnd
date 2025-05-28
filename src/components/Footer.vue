<template>
  <!-- 頁尾 -->
  <footer class="bg-gray-800 text-white py-8 px-4">
    <div class="grid grid-cols-3 gap-4 mb-6">
      <div>
        <div class="flex items-center mb-3">
          <div>
            <img
              src="@/assets/images/logo_w.png"
              alt="Logo"
              class="w-25 h-12 mr-2"
            />
          </div>
        </div>
        <p class="text-xs text-gray-400 leading-relaxed">
          電話：<br />02-123456789<br />
          營業時間：<br />10:00-20:00<br />
          地址：<br />
          台北市中山區東海路1號
        </p>
      </div>

      <div>
        <h4 class="font-bold mb-3 text-sm">{{ t('footer.about') }}</h4>
        <ul class="text-xs text-gray-400 space-y-1">
          <li>服務項目</li>
          <li>
            <a href="mailto:eathubtw@gmail.com" class="hover:underline"
              >聯絡我們</a
            >
          </li>
          <li>
            <RouterLink to="/terms-of-service" class="hover:underline"
              >條款與政策</RouterLink
            >
          </li>
          <li>
            <RouterLink to="/privacy-policy" class="hover:underline"
              >隱私權條款</RouterLink
            >
          </li>
        </ul>
      </div>

      <div>
        <h4 class="font-bold mb-3 text-sm">{{ t('footer.socialMedia') }}</h4>
        <ul class="text-xs text-gray-400 space-y-1">
          <li>Facebook</li>
          <li>Instagram</li>
          <li>Twitter</li>
        </ul>
        <br />
        <h4 class="font-bold mb-3 text-sm">
          <p>{{ t('footer.language') }}</p>
        </h4>
        <ul class="text-xs text-gray-400 space-y-1">
          <li>
            <select v-model="locale">
              <option value="zh-TW">繁體中文</option>
              <option value="en">English</option>
              <option value="ja">日本語</option>
              <option value="ko">한국어</option>
            </select>
          </li>
        </ul>
      </div>
    </div>

    <div
      class="text-center text-xs text-gray-400 pt-4 border-t border-gray-700"
    >
      © 2025 尋飽 EatHub. All rights reserved.
    </div>
  </footer>
</template>

<script setup>
import { RouterLink } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { watch } from 'vue';

const { locale, t } = useI18n();

watch(locale, (newLocale) => {
  localStorage.setItem('locale', newLocale);
});
defineProps({});
</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
