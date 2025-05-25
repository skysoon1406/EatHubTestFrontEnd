<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">{{ couponTitle }}</h1>

    <div class="mb-4 flex justify-between items-center">
      <input
        v-model="searchKeyword"
        type="text"
        placeholder="搜尋使用者 Email"
        class="input input-bordered w-full max-w-xs"
      />
    </div>

    <div class="overflow-x-auto">
      <table class="table w-full">
        <thead>
          <tr>
            <th>流水號</th>
            <th>使用者 Email</th>
            <th>使用狀態</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="usage in filteredUsages" :key="usage.uuid">
            <td>{{ usage.uuid.slice(0, 8) }}</td>
            <td>{{ usage.user }}</td>
            <td>
              <span
                class="badge"
                :class="usage.isUsed ? 'badge-success' : 'badge-outline'"
              >
                {{ usage.isUsed ? '已使用' : '未使用' }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const uuid = route.params.uuid;

const couponTitle = ref('');
const usages = ref([]);
const searchKeyword = ref('');

onMounted(async () => {
  const res = await axios.get(`/api/v1/coupons/${uuid}/usage/`, {
    withCredentials: true,
  });
  couponTitle.value = res.data.title;
  usages.value = res.data.usages;
  usages.value = [
    { uuid: '3eae134a98', user: 'amy@example.com', isUsed: true },
    { uuid: '2bdf023f55', user: 'ben@gmail.com', isUsed: false },
    { uuid: 'a1912873ee', user: 'cindy@outlook.com', isUsed: true },
    { uuid: 'e48f10b3ff', user: 'dan@abc.com', isUsed: false },
    { uuid: '5f82fa123a', user: 'eva@test.com', isUsed: true },
    { uuid: 'fc99b8123e', user: 'frank@yahoo.com', isUsed: false },
    { uuid: '39dbbc2891', user: 'grace@site.tw', isUsed: false },
    { uuid: 'f01adf88a7', user: 'hugo@example.com', isUsed: true },
    { uuid: '1a93e812ca', user: 'iris@demo.net', isUsed: false },
    { uuid: '8aaadf9812', user: 'jacky@gmail.com', isUsed: true },
    { uuid: 'c28e91237f', user: 'kelly@domain.io', isUsed: false },
  ];
});

const filteredUsages = computed(() => {
  if (!searchKeyword.value) return usages.value;
  return usages.value.filter((usage) =>
    usage.user.toLowerCase().includes(searchKeyword.value.toLowerCase())
  );
});
</script>
