<template>
  <div>
    <Navbar></Navbar>
    <h1>Login</h1>
    <form @submit.prevent="handleLogin">
      <input v-model="email" placeholder="Email" />
      <input
        class="input"
        v-model="password"
        type="password"
        placeholder="Password"
      />
      <button class="btn btn-primary" type="submit">Login</button>
    </form>
    <p>還沒有帳號？<router-link to="/signup">註冊</router-link></p>
    <router-link to="/">回首頁</router-link>
    <Footer></Footer>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';

const email = ref('');
const password = ref('');
const router = useRouter();

const handleLogin = async () => {
  const authStore = useAuthStore();
  await authStore.login(email.value, password.value);
  router.push('/');
};
</script>
