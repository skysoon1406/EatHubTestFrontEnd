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

<script>
import '../assets/styles/app.css';
import { useAuthStore } from '../stores/auth';

export default {
  data() {
    return {
      firstName: '',
      lastName: '',
      userName: '',
      email: '',
      password: '',
      error: '',
      success: '',
    };
  },
  methods: {
    async handleSignup() {
      try {
        const authStore = useAuthStore();
        await authStore.signup(
          this.firstName,
          this.lastName,
          this.userName,
          this.email,
          this.password
        );
        this.success = '註冊成功！請前往登入';
        this.error = '';
        this.$router.push('/login');
      } catch (err) {
        if (err.response && err.response.data) {
          this.error = JSON.stringify(err.response.data);
        } else {
          this.error = '註冊失敗';
        }
        this.success = '';
      }
    },
  },
};
</script>
