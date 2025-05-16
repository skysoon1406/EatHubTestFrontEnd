<template>
  <div>
    <h1>Signup</h1>
    <form @submit.prevent="handleSignup">
      <section>
        <input v-model="firstName" placeholder="Firstname" />
      </section>
      <section>
        <input v-model="lastName" placeholder="Lastname" />
      </section>
      <section>
        <input v-model="userName" placeholder="Username" />
      </section>
      <section>
        <input v-model="email" placeholder="Email" />
      </section>
      <section>
        <input v-model="password" type="password" placeholder="Password" />
      </section>
      <button class="btn btn-primary" type="submit">Signup</button>
      <hr />
      <router-link to="/login">登入</router-link> <span>/</span>
      <router-link to="/">回首頁</router-link>
    </form>
    <p v-if="error">{{ error }}</p>
    <p v-if="success">{{ success }}</p>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();
const authStore = useAuthStore();
const firstName = ref('');
const lastName = ref('');
const userName = ref('');
const email = ref('');
const password = ref('');
const error = ref('');
const success = ref('');

const handleSignup = async () => {
  try {
    await authStore.signup(
      firstName.value,
      lastName.value,
      userName.value,
      email.value,
      password.value
    );
    success.value = '註冊成功！請前往登入';
    router.push('/login');
  } catch (err) {
    if (err.response && err.response.data) {
      error.value = JSON.stringify(err.response.data);
      error.value = '';
      router.push('/login');
    } else {
      error.value = '註冊失敗';
    }
    success.value = '';
  }
};
</script>
