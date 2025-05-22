<template>
  <button
    @click="handleGoogleLogin"
    class="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-full py-3 text-gray-700 hover:bg-gray-100 transition"
  >
    <font-awesome-icon :icon="['fab', 'google']" />
    <span class="font-medium">使用 Google 帳號</span>
  </button>
</template>

<script setup>
import { useRouter } from 'vue-router';
import axios from '@/axios';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const authStore = useAuthStore();

function loadGoogleSdk() {
  return new Promise((resolve) => {
    if (document.getElementById('google-oauth-script')) return resolve();

    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.id = 'google-oauth-script';
    script.onload = resolve;
    document.head.appendChild(script);
  });
}

const handleGoogleLogin = async () => {
  await loadGoogleSdk();

  window.google.accounts.oauth2.initTokenClient({
    client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
    scope: 'profile email',
    callback: async (res) => {
      const access_token = res.access_token;
      if (!access_token) return alert('無法取得 Google access_token');

      try {
        const loginRes = await axios.post('auth/google-login/', { access_token });
        const meRes = await axios.get('auth/me');
        authStore.user = {
          uuid: meRes.data.user_uuid,
          userName: loginRes.data.user.userName,
          email: loginRes.data.user.email,
        };

        alert('Google 登入成功');
        window.location.href = '/';
      } catch (err) {
        alert('登入失敗，請稍後再試');
      }
    },
  }).requestAccessToken();
};
</script>