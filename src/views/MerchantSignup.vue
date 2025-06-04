<template>
  <div class="">
    <Navbar></Navbar>
    <section
      class="min-h-screen flex items-center justify-center bg-base-200 p-4"
    >
      <div class="w-full max-w-md">
        <form
          @submit.prevent="handleSignup"
          class="bg-base-100 shadow-xl rounded-xl p-8 space-y-4"
        >
          <h1 class="text-2xl font-bold text-center mb-6">店家註冊</h1>


          <section>
            <input
              v-model="userName"
              class="input input-bordered w-full"
              placeholder="餐廳名稱"
              required
            />
          </section>
          <section>
            <input
              v-model="email"
              class="input input-bordered w-full"
              placeholder="Email"
              required
            />
          </section>
          <section>
            <input
              v-model="password"
              class="input input-bordered w-full"
              type="password"
              placeholder="設定密碼"
              required
            />
          </section>

          <button class="btn btn-primary w-full">註冊</button>
          <p v-if="errorMessage" class="text-red-500 text-sm text-center mt-2">
            {{ errorMessage }}
          </p>
          <div class="text-center space-x-2">
            <router-link to="/merchant/login" class="link link-hover text-primary"
              >登入</router-link
            >
            <span>/</span>
            <router-link to="/" class="link link-hover text-primary"
              >回首頁</router-link
            >
          </div>

          <p v-if="error" class="text-red-500 text-center">{{ error }}</p>
          <p v-if="success" class="text-green-500 text-center">{{ success }}</p>
        </form>
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


const router = useRouter();
const authStore = useAuthStore();
const userName = ref('');
const email = ref('');
const password = ref('');
const error = ref('');
const success = ref('');
const role = ref('merchant');
const errorMessage = ref('');

const handleSignup = async () => {
  errorMessage.value = '';
  try {
    await authStore.merchantSignup( 
      userName.value,
      email.value,
      password.value,
      role.value
    );
    success.value = '註冊成功！請前往登入';
    router.push('/merchant/login');
    
  } catch (err) {
    const errors = err.response?.data;
    if (errors && typeof errors === 'object') {
     const firstField = Object.keys(errors)[0];
      const firstError = errors[firstField?.[0]];
      errorMessage.value = firstError || '註冊失敗，該信箱已被註冊過。';
    } else {
      errorMessage.value = '註冊失敗，請稍後再試。'
    }
    success.value = '';
  }
};
</script>
