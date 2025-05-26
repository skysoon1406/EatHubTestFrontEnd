<template>
  <div>
    <Navbar></Navbar>
    <section
      class="min-h-screen flex items-center justify-center bg-base-200 p-4"
    >
      <div class="w-full max-w-md">
        <section class="bg-base-100 shadow-xl rounded-xl p-8 space-y-6">
          <h1 class="text-2xl font-bold text-center">會員登入</h1>

          <form @submit.prevent="handleLogin" class="space-y-4">
            <input
              v-model="email"
              class="input input-bordered w-full"
              placeholder="Email"
              required
            />
            <input
              class="input input-bordered w-full"
              v-model="password"
              type="password"
              placeholder="Password"
              required
            />
            <button class="btn btn-primary w-full" type="submit">登入</button>
          </form>
          <div class="divider">或</div>
          <GoogleLoginButton />

          <div class="text-center space-y-2">
            <p>
              還沒有帳號？
              <router-link to="/signup" class="link link-hover text-primary"
                >註冊</router-link
              >
            </p>
            <router-link to="/" class="link link-hover text-primary"
              >回首頁</router-link
            >
          </div>
        </section>
      </div>
    </section>
    <Footer></Footer>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import GoogleLoginButton from '@/components/GoogleLoginButton.vue';
import { useAlertStore } from '@/stores/alert';
const alert = useAlertStore();

const email = ref('');
const password = ref('');
const router = useRouter();

const handleLogin = async () => {
  const authStore = useAuthStore();
  await authStore.login(email.value, password.value);
  alert.trigger('登入成功 🎉', 'error');
  router.push('/');
};
</script>
