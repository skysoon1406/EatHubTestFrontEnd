<template>
  <div>
    <h1>Home</h1>
    <nav>
      <ul v-if="user">
        <li>目前登入者：{{ user.userName }}</li>
        <li><button class="btn" @click="handleLogout">登出</button></li>
      </ul>

      <ul v-else>
        <li>
          <a class="btn" href="/signup">
            <font-awesome-icon :icon="['fas', 'user-plus']" />
            註冊
          </a>
        </li>
        <li>
          <a class="btn" href="/login">
            <font-awesome-icon :icon="['fas', 'right-to-bracket']" />
            登入
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import { useAuthStore } from '../stores/auth';
import { storeToRefs } from 'pinia';

const auth = useAuthStore();
const { user } = storeToRefs(auth);

const handleLogout = async () => {
  await auth.logout();
};
</script>
