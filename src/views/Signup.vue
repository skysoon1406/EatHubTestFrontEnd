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
          <h1 class="text-2xl font-bold text-center mb-6">
            {{ t('signup.title') }}
          </h1>

          <section>
            <input
              v-model="firstName"
              class="input input-bordered w-full"
              :placeholder="t('signup.firstNamePlaceholder')"
              required
            />
          </section>
          <section>
            <input
              v-model="lastName"
              class="input input-bordered w-full"
              :placeholder="t('signup.lastNamePlaceholder')"
              required
            />
          </section>
          <section>
            <input
              v-model="userName"
              class="input input-bordered w-full"
              :placeholder="t('signup.userNamePlaceholder')"
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
              :placeholder="t('signup.passwordPlaceholder')"
              required
            />
          </section>

          <button class="btn btn-primary w-full">
            {{ t('signup.submitButton') }}
          </button>
          <p v-if="errorMessage" class="text-red-500 text-sm text-center mt-2">
            {{ errorMessage }}
          </p>

          <div class="divider">{{ t('signup.orDivider') }}</div>
          <GoogleLoginButton />
          <div class="text-center space-x-2">
            <router-link to="/login" class="link link-hover text-primary">{{
              t('signup.loginLink')
            }}</router-link>
            <span>/</span>
            <router-link to="/" class="link link-hover text-primary">{{
              t('signup.homeLink')
            }}</router-link>
          </div>
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
import { useI18n } from 'vue-i18n';
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import GoogleLoginButton from '@/components/GoogleLoginButton.vue';
import { useAlertStore } from '@/stores/alert';

const { t } = useI18n();
const alert = useAlertStore();
const router = useRouter();
const authStore = useAuthStore();
const firstName = ref('');
const lastName = ref('');
const userName = ref('');
const email = ref('');
const password = ref('');
const errorMessage = ref('');

const handleSignup = async () => {
  errorMessage.value = '';
  try {
    await authStore.signup(
      firstName.value,
      lastName.value,
      userName.value,
      email.value,
      password.value,
    );
    alert.trigger(t('signup.success'), 'success');
    router.push('/login');
  } catch (err) {
    const errors = err.response?.data;
    if (errors && typeof errors === 'object') {
      const firstField = Object.keys(errors)[0];
      const firstError = errors[firstField?.[0]];
      errorMessage.value = firstError || t('alert.signupEmailUsed');
    } else {
      errorMessage.value = t('alert.signupFailed');
    }
  }
};
</script>
