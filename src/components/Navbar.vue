<template>
  <!-- 頂部導航欄 -->
  <div
    class="navbar bg-white shadow-sm px-4 py-3 border-b flex justify-between items-center"
  >
    <!-- 左邊 Logo 區 -->
    <div class="flex items-center">
      <a href="/">
        <img src="@/assets/images/logo.png" alt="Logo" class="w-25 h-12 mr-2" />
      </a>
    </div>

    <!-- 右邊 漢堡選單 -->
    <button class="btn btn-ghost btn-circle"></button>
    <div class="flex-none">
      <div class="dropdown dropdown-end">
        <label tabindex="0" class="btn btn-ghost btn-circle">
          <font-awesome-icon
            :icon="['fas', 'bars']"
            class="text-3xl text-red-500"
          />
        </label>
        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
        >
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
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
const auth = useAuthStore();
const { user } = storeToRefs(auth);

const handleLogout = async () => {
  await auth.logout();
};

defineProps({});
</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
